
$(document).ready(function(){

var date = moment("2018-01-01");
console.log(date);
 // date.add(1, 'days');
// var newDate = date.format('D MMMM');
// console.log(date.add(1, 'days'));;
 // console.log(date.format('D MMMM'));
  var numeroGiorni = 31;
  for (var i = 1; i < numeroGiorni; i++) {

   var newDate = date.format('D MMMM')
   console.log(newDate);
    var source = $("#month-template").html();
    var template = Handlebars.compile(source);

    var context = {newDate};
    console.log(context);
    var html = template(context);

    $('.calendar').append(html);
    date.add(1, 'days');
    $.ajax(
        {
          url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
          method: "GET",
          success: function (data, stato) {
            console.log(data);
          },
          error: function (richiesta, stato, errori) {
          alert("E' avvenuto un errore. " + errori);
          }

        });

  }

});
