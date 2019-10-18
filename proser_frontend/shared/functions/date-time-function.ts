import * as moment from "moment";

export function textDateToObjectDate(inputDate) {
  /*
   *  convert text date 'YYY-MM-DD' to format:  {year: 2018, month: 10, day: 3}
   *  It receives an input, checks for valid format
   *  On error return the same input
   */

  let result = inputDate;
  // check for valid date in format 'YYYY-MM-DD'
  if (
    typeof inputDate === "string" &&
    inputDate.match(
      /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/
    )
  ) {
    result = {
      year: parseInt(moment(inputDate).format("YYYY")),
      month: parseInt(moment(inputDate).format("MM")),
      day: parseInt(moment(inputDate).format("DD"))
    };
  }
  return result;
}

/********************************************************************* */

export function objectDateToTextDate(inputDate) {
  // convert object in format  {year: 2018, month: 10, day: 3} to text date 'YYYY-MM-DD'

  let date;
  let result;
  if (typeof inputDate === "string") {
    try {
      date = JSON.parse(inputDate);
      inputDate = date;
    } catch (error) {
      console.error("error ", error);
      result = inputDate;
    }
  }

  if (typeof inputDate === "object") {
    try {
      result = `${inputDate.year}-${pad(inputDate.month, 2)}-${pad(
        inputDate.day,
        2
      )}`;
    } catch (error) {
      console.error("ERROR", error);
      result = inputDate;
    }
  }
  return result;
}

export function valueFromObject(inputField, defaultValue) {
  /*
   * Return value from object
   */

  let result = defaultValue;

  if (inputField) {
    result = inputField.value;
  }

  return result;
}

function pad(num, size) {
  let s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

export function dateObjectToWeekDay(date) {
  let num = new Date(date).getDay() + 1;

  let result = "xxx";

  if (result) {
    if (num === 1) {
      return "lunes";
    }
    if (num === 2) {
      return "martes";
    }
    if (num === 3) {
      return "miércoles";
    }
    if (num === 4) {
      return "jueves";
    }
    if (num === 5) {
      return "viernes";
    }
    if (num === 6) {
      return "sábado";
    }
    if (num === 7) {
      return "domingo";
    }
  }

  return num;
}

export function minutesToHHMMSS(minutes) {
  let result = minutes;
  let hh: any;
  let mm: any;
  let ss: any;

  if (minutes) {
    let seconds = minutes * 60;
    // multiply by 1000 because Date() requires miliseconds
    let date = new Date(seconds * 1000);
    hh = date.getUTCHours();
    mm = date.getUTCMinutes();
    ss = date.getSeconds();
    // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
    // if (hh > 12) {hh = hh % 12;}
    // These lines ensure you have two-digits
    let hh_string: any = hh;
    let mm_string: any = mm;
    let ss_string: any = ss;

    if (hh < 10) {
      hh_string = "0" + hh;
    }
    if (mm < 10) {
      mm_string = "0" + mm;
    }
    if (ss < 10) {
      ss_string = "0" + ss;
    }
    // This formats your string to HH:MM:SS
    let t = hh_string + ":" + mm_string + ":" + ss_string;

    result = t;
  }
  return result;
}

export function textTimeToObjectTime(inputTime) {
  /*
   *  convert text date 'YYY-MM-DD' to format:  {year: 2018, month: 10, day: 3}
   *  It receives an input, checks for valid format
   *  On error return the same input
   */

  let result = inputTime;
  // check for valid date in format 'YYYY-MM-DD'
  if (
    typeof inputTime === "string" &&
    inputTime.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
  ) {
    result = {
      hour: parseInt(moment(inputTime).format("HH")),
      minute: parseInt(moment(inputTime).format("mm")),
      second: parseInt(moment(inputTime).format("ss")),
      value: inputTime
    };
  }
  return result;
}

export function objectTimeToTextTime(inputTime) {
  // convert object in format  {hour: 2018, minute: 10, second: 3} to text time 'HH-MM-SS'

  let time;
  let result;
  if (typeof inputTime === "string") {
    try {
      time = JSON.parse(inputTime);
      inputTime = time;
    } catch (error) {
      console.error("error ", error);
      result = inputTime;
    }
  }

  if (typeof inputTime === "object") {
    try {
      result = `${pad(inputTime.hour, 2)}:${pad(inputTime.minute, 2)}:${pad(
        inputTime.second,
        2
      )}`;
    } catch (error) {
      // ("ERROR object");
      result = inputTime;
    }
  }
  return result;
}
