
$(document).ready(function(){

  var dateBase = moment("2018-01-01");
  console.log(dateBase);
  var daysInMonth = dateBase.daysInMonth();
  console.log(daysInMonth)


  for (var i = 0; i < daysInMonth; i++) {
    if (dateBase._isValid) {
      var newDate = dateBase.format('D MMMM');

      console.log(newDate);
       var source = $("#days-template").html();
       var template = Handlebars.compile(source);

       var context = {newDate};
       console.log(context);
       var html = template(context);

       $('.month').append(html);

       dateBase.add(1, 'days');

    }

    $.ajax({
      url: 'https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0' ,
      method: 'GET',

      success: function(data) {
        var holidays = data.response;
        console.log(holidays);
        var holiDays = holidays[0];
        console.log(holidays[0]);

        for (var i = 0; i < holidays.length; i++) {
          var singolHoliday = holidays[i];
          console.log(singolHoliday.date);
          var listItem = $('.day[data-date="' + singolHoliday.date + '"]');
          console.log();
          if(listItem === newDate) {
            listItem.addClass('holidays');
          }
        }
      },
      error: function() {
        console.log('Errore chiamata festività');
      }
    });



  }


});
