function vypis(udaje){
    //$("#weather").html(Mustache.render($("#tmplPoc").html(),objectField));
    $("#weather").html(Mustache.render(tmplPoc,udaje));
    console.log(udaje);
}

$.getJSON( "http://api.openweathermap.org/data/2.5/weather",
    {q:"Secovce",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
    vypis);


var tmplPoc = "Teplota: {{main.temp}} °C<br> Tlak: {{main.pressure}} <br> Vlhkost: {{main.humidity}}%<br> Oblaènos: {{clouds.all}}%";
//teplota zajtra
$.getJSON( "http://api.openweathermap.org/data/2.5/forecast",
    {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
    vypisZajtra);

var zajtra = "Teplota: {{list.0.main.temp}}°C<br> Tlak: {{list.0.main.pressure}} <br> Vlhkost: {{list.0.main.humidity}}%<br> Oblaènos: {{list.0.clouds.all}} ";
function vypisZajtra(udaje){

    $("#weather_tommorow").html(Mustache.render(zajtra,udaje));
}

//teplota pozajtra

$.getJSON( "http://api.openweathermap.org/data/2.5/forecast",
    {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
    vypisPozajtra);

var pozajtra = "Teplota: {{list.1.main.temp}}°C<br> Tlak: {{list.1.main.pressure}} <br> Vlhkost: {{list.1.main.humidity}}%<br> Oblaènos: {{list.1.clouds.all}} ";
function vypisPozajtra(udaje){

    $("#weather_2").html(Mustache.render(pozajtra,udaje));
}

//teplota 3 dni
$.getJSON( "http://api.openweathermap.org/data/2.5/forecast",
    {q:"Bratislava",units:'metric',APPID:"8641355d0bdfa52a49f4e9a42560adf0"},
    vypis3dni);

var tridni = "Teplota: {{list.2.main.temp}}°C<br> Tlak: {{list.2.main.pressure}} <br> Vlhkost: {{list.2.main.humidity}}%<br> Oblaènos: {{list.2.clouds.all}} ";
function vypis3dni(udaje){

    $("#weather_3").html(Mustache.render(tridni,udaje));
}