import moment from "moment";

//cdr_dates_aaaa_mm - month
function cdr_dates_aaaa_mm(date) {
  let  result = ``;

  if (date) {
    let temp = moment(date).format(`YYYY-MM`); 
    result = temp;
  }

  return result;
}

//cdr_dates_aaaa_mm_dd - day of the month
function cdr_dates_aaaa_mm_dd(date) {
  let  result = ``;

  if (date) {
    let temp = moment(date).format(`YYYY-MM-DD`); 
    result = temp;
  }

  return result;
}

// cdr_dates_week - week number of the year
function cdr_dates_week(date) {
  let  result = ``;

  if (date) {
    let temp = moment(date).isoWeek();
    result = temp;
  }

  return result;
}

// cdr_dates_week_day - week number monday = 1
function cdr_dates_week_day(date) {
  let  result = ``;

  if (date) {
    let temp = moment(date).isoWeekday();
    result = temp;
  }

  return result;
}

//cdr_dates_aaaa = year
function cdr_dates_aaaa(date) {
  let  result = ``;

  if (date) {
    let year = moment(date).format(`YYYY`); 
    result = year;
  }

  return result;
}

// cdr_dates_week_day_name - name of the week in spanish
function cdr_dates_week_day_name(date) {
  let  result = ``;

  if (date) {
    let dayNames = [`lunes`, `martes`, `miércoles`, `jueves`, `viernes`, `sábado`, `domingo`];
    let temp = moment(date).isoWeekday() -1 ;
    let aux = dayNames[temp];
    result = aux;
  }

  return result;
}

// cdr_dates_month - number of the month Jan = 1
function cdr_dates_month(date) {
  let  result = ``;

  if (date) {
    let year = moment(date).format(`M`); 
    result = year;
  }

  return result;
}

// cdr_dates_month_name - name of the month in spanish
function cdr_dates_month_name(date) {
  let  result = ``;

  if (date) {
    let monthNames = [`enero`, `febrero`, `marzo`, `abril`, `mayo`, `junio`, `julio`, `agosto`, `septiembre`, `octubre`, `noviembre`, `diciembre`];
    let temp = moment(date).format(`M`) -1 ;
    let aux = monthNames[temp];
    result = aux;
  }

  return result;
}



/********************************************************** */

// cdr_dates_time - time
function cdr_dates_time(date) {
  let  result = ``;

  if (date) {
    let temp = moment(date).format(`HH:mm:ss`); 
    result = temp;
  }

  return result;
}

// cdr_dates_minutes - minutes odf the day
function cdr_dates_minutes(date) {
  let  result = 0;

  if (date) {
    // Your moment
    let mmt = moment(date);

    // Your moment at midnight
    let mmtMidnight = mmt.clone().startOf(`day`);

    // Difference in minutes
    let diffMinutes = mmt.diff(mmtMidnight, `minutes`);

    result = diffMinutes;
  }

  return result;
}

// cdr_dates_seconds - seconds of the day
function cdr_dates_seconds(date) {
  let  result = 0;

  if (date) {
    // Your moment
    let mmt = moment(date);

    // Your moment at midnight
    let mmtMidnight = mmt.clone().startOf(`day`);

    // Difference in minutes
    let diffMinutes = mmt.diff(mmtMidnight, `seconds`);

    result = diffMinutes;
  }

  return result;
}


/********************************************************** */

// correctedDate -Corecction to date
function correctedDate(date) {
  let result = moment(date);
  return result;
}

module.exports = {
  //date
  cdr_dates_aaaa,
  cdr_dates_aaaa_mm,
  cdr_dates_aaaa_mm_dd,
  cdr_dates_week,
  cdr_dates_week_day,
  cdr_dates_week_day_name,
  cdr_dates_month,
  cdr_dates_month_name,
  // time
  cdr_dates_time,
  cdr_dates_minutes,
  cdr_dates_seconds,
};
