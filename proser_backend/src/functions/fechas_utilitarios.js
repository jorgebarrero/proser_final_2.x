/*
*
* Funcionalidades auxiliares para manejo de fechas
* Estas funciones son invocadas dede archivos externos
*
*/

//* Dependencies
const moment = require('moment');

//* Cambiar formato de fecha standard a fecha Unix
function unixDate (standardDate){
  return parseInt((new Date(standardDate).getTime() / 1000).toFixed(0));
}

//* Cambiar de fecha Unix a fecha standard
function standardDate(unixDate){
  let timestamp = moment.unix(unixDate);
  return timestamp.format('YYYY-MM-DD HH:mm:ss');
}


/// UTILITARIAS ///

function unix_timestamp_to_string( calldate ){

  // =B4
  // B4=calldate

  let resultado = '';

  if (calldate){
    var a = new Date( calldate * 1000);
    var months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    var month = months[a.getMonth()];
    var year = a.getFullYear();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;

  }

  return resultado;
}


function string_to_date( calldate ){

  // =B4
  // B4=calldate

  var data = data.replace('/','-');
  var momentDate = moment( data ).add(1, 'year');

  return data;

}

Date.createFromMysql = function(mysql_string)
{
  let t, resultado = null;

  if( typeof mysql_string === 'string' )
  {
    t = mysql_string.split(/[- :]/);

    //cuando t[3], t[4] and t[5] faltan el valor por defecto es zero
    resultado = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
  }

  return resultado;
};

function mysqlTimeStampToDate(timestamp) {

  // esta funcion parsea el tiempo mysql y retorna un objeto de fecha Javascript
  // el formato de3 entrada debe ser: 2007-06-05 15:26:02

  var regex=/^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9]) (?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
  var parts=timestamp.replace(regex,'$1 $2 $3 $4 $5 $6').split(' ');
  return new Date(parts[0],parts[1]-1,parts[2],parts[3],parts[4],parts[5]);
}

function textoEnSegundos(str){

  if (str * 0 == 0 ){
    return 0;
  }

  var p = str.split(':'),
    s = 0, m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}


function hora_a_minutos (hms) {

  let resultado = '';

  if (hms.length === 5 ) {
    hms = hms + ':00:';
  }

  if (hms.length <= 8) {
    let a = hms.split(':');
    let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 ;

    resultado = seconds;
  }


  return resultado;

}


function hora_a_segundos (hms) {



  let resultado = '';

  if( hms === null){
    resultado = null;
  } else {
    if (hms.length <= 8) {
      let a = hms.split(':');
      let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

      resultado = seconds;
    }
  }
  // console.log(hms, resultado);
  return resultado;
}



function hmsToSecondsOnly(str) {
  var p = str.split(':'),
    s = 0, m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }

  return s;
}



function date_text(calldate) {

  let resultado = '';

  calldate = moment(calldate).format('YYYY-MM-DD');

  resultado = calldate;

  return resultado;
}

function time_text(calldate) {

  let resultado = '';

  calldate = moment(calldate).format('hh:mm:ss');

  resultado = calldate;

  return resultado;
}

function week_day_number(date) {
  let resultado = '';

  let fecha = new Date(date);


  if (date) {
    resultado = fecha.getDay();

  }
  if (resultado === 0) {
    resultado = 7;
  }

  return resultado;
}

function week_day_name(date) {
  let resultado = '';
  let temp = '';

  let fecha = new Date(date);

  if (date) {
    temp = fecha.getDay();
  }

  if (temp === 0 || temp === 7) {
    resultado = 'domingo';
  }

  if (temp === 1) {
    resultado = 'lunes';
  }

  if (temp === 2) {
    resultado = 'martes';
  }

  if (temp === 3) {
    resultado = 'miércoles';
  }

  if (temp === 4) {
    resultado = 'jueves';
  }

  if (temp === 5) {
    resultado = 'viernes';
  }

  if (temp === 6) {
    resultado = 'sábado';
  }

  return resultado;
}


function nextDay( fecha_inicio ) {
  let inicio = new Date(fecha_inicio);
  let inicio_mas_uno = addDays(fecha_inicio, 1);
  let month = pad(inicio_mas_uno.getUTCMonth() + 1, 2); //months from 1-12
  let day = pad(inicio_mas_uno.getUTCDate(), 2);
  let year = inicio_mas_uno.getUTCFullYear();

  return year + '-' + month + '-' + day + ' ' + '00:00:00';
}

function pad(number, length) {
  var str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);


  return result;
}


function secondsToTime(secs)
{
  secs = Math.round(secs);
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    'h': hours,
    'm': minutes,
    's': seconds
  };
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}`;
}


// Exportar para uso
module.exports ={
  unixDate,
  standardDate,
  unix_timestamp_to_string,
  textoEnSegundos,
  mysqlTimeStampToDate,
  string_to_date,

  hora_a_minutos,
  hora_a_segundos,
  date_text,
  time_text,
  week_day_number,
  week_day_name,

  nextDay,
  addDays,
  pad,
  secondsToTime,
  hmsToSecondsOnly,
};
