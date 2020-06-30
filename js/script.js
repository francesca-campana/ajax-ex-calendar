$(document).ready(function(){
  // Setto primo giorno dell'anno di interesse
  var startDate = moment("2018-01-01");

  printMonth(startDate);
  printHolidays(startDate);

  $(document).on('click', '#next', function(){
    // Prendere il mese corrente
    var currentMonth = $('#current-month').attr('data-current-month');
    console.log(currentMonth);
    var momentCurrentMonth = moment(currentMonth);
    var nextMonth = momentCurrentMonth.add(1, 'months');
    // Stampo solo se è l'anno 2018
    if (nextMonth.year() === 2018) {
      printMonth(nextMonth);
      printHolidays(nextMonth);
    }else {
      alert('Puoi navigare solo nell\'anno 2018');
    }


  });

  $(document).on('click', '#prev', function(){
    // Prendere il mese corrente
    var currentMonth = $('#current-month').attr('data-current-month');
    console.log(currentMonth);
    var momentCurrentMonth = moment(currentMonth);
    var prevMonth = momentCurrentMonth.subtract(1, 'months');
    // Stampo solo se è l'anno 2018
    if (prevMonth.year() === 2018) {
      printMonth(prevMonth);
      printHolidays(prevMonth);
    }else {
      alert('Puoi navigare solo nell\'anno 2018');
    }
  });


  // Funzione per stampare i giorni del mese corrente
  // ---> argomento: l'oggetto moment startDate
  //  ---> return : non ritorna nulla
  function printMonth(startDate){
     $('#month').html('');
    //Stampo il titolo del mese corrente
    $('#current-month').text(startDate.format('MMMM YYYY'));
    $('#current-month').attr('data-current-month', startDate.format('YYYY MM DD'));
    // Calcolo quanti giorni ha il mese corrente
    var daysInMonth = startDate.daysInMonth();

    // Stampo i giorni del mese corrente
    // Uso un template con Handelbars per scrivere la lista dei giorni
    var source = $("#calendar-template").html();
    var template = Handlebars.compile(source);



    // Ciclo in base al numero dei giorni del mese corrente per stampare
    for (var i = 0; i < daysInMonth; i++) {
      var newDay = moment(startDate).add(i,'days');
      var day = newDay.format('D');
      var month = newDay.format('MMMM');

      // creo un attributo per salvare la data ed usarla per controllare se è festività
      var totalDate = newDay.format('YYYY-MM-DD');
      var dateToStamp = {
        day: day,
        month: month,
        date: totalDate
      };
      var html = template(dateToStamp);
      $('.month').append(html);
    };
  }
  // Funzione per stampare le holidays del mese corrente
  // ---> argomento: l'oggetto moment startDate
  //  ---> return : non ritorna nulla
  function printHolidays(startDate){
    // Chiamata Ajax per inserire le festività del mese corrente
      $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0',
        method: 'GET',
        data: {
          year: startDate.year(),
          month:startDate.month(),
        },
        success: function(data) {

          // Vedere le festività del mese corrente
          var holidays = data.response;
          for (var i = 0; i < holidays.length; i++) {
            var dateHolidays = holidays[i].date;
            var nameHolidays = holidays[i].name;
            console.log(nameHolidays);

            // Chi ha l'attributo data-date uguale alla festività
            // prende la classe per evidenziare la festività
            var dayCurrentAttr = $(".day-calendar[data-date='" + dateHolidays + "']");
            var squareCurrentAttr = $(".square[data-date='" + dateHolidays + "']");
            dayCurrentAttr.append(' - ' + nameHolidays);
            dayCurrentAttr.addClass('holidays');
            squareCurrentAttr.addClass('red');

          };
        },
        error: function() {
          alert('errore info holidays');
        }
      });
    // Fine chiamata ajax
  }
});
