import * as moment from "moment";

export function dateToDatePicker(date?) {
  // convierte de objeto un texto en formato  {year: 2018, month: 10, day: 3}
  const newDate = moment(date);
  const dateObject = {
    // tslint:disable-next-line:radix
    year: parseInt(moment(date).format("YYYY")),
    // tslint:disable-next-line:radix
    month: parseInt(moment(date).format("MM")),
    // tslint:disable-next-line:radix
    day: parseInt(moment(date).format("DD"))
  };
  return dateObject;
}

export function formatDate(date) {
  // convierte de fecha ( Date ) a texto en formato aaaa-mm-dd
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
}

export function datePickerFormatDate(date) {
  // convierte de objeto {year: 2018, month: 10, day: 3} a texto en formato aaaa-mm-dd
  // console.warn(date);


  function pad(num: number, size: number): string {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  return `${date.year}-${pad(date.month, 2)}-${pad(date.day, 2)}`;
}

export function dateToText(date) {
  let result = "";
  const now = date;

  if (now) {
    const today = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      day: now.getDate()
    };
    result = `${today.year}-${today.month}-${today.day}`;
  }
  return result;
}

export function datePickerToDate(date) {


  let resultado = new Date();

  function pad(num, size) {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  if (date) {
    resultado = new Date(
      `${date.year}-${pad(date.month, 2)}-${pad(date.day, 2)}`
    );
  }

  return resultado;
}

export function datePickerToText(date) {
  // convierte de objeto {year: 2018, month: 10, day: 3} a texto en formato aaaa-mm-dd
  // (date);

  //  let mydate = {year: 2018, month: 10, day: 3}

  function pad(num, size) {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  return `${date.year}-${pad(date.month, 2)}-${pad(date.day, 2)}`;
}

export function numToWeekDayEs(num) {
  const result = "";

  if (isNaN(num) && num > 0 && num <= 7) {
    if (num === 1) {
      this.result = {
        id: 1,
        long_es: "lunes",
        short_es: "lun"
      };
    }
    if (num === 2) {
      this.result = {
        id: 2,
        long_es: "martes",
        short_es: "mar"
      };
    }
    if (num === 3) {
      this.result = {
        id: 3,
        long_es: "miércoles",
        short_es: "mie"
      };
    }
    if (num === 4) {
      this.result = {
        id: 4,
        long_es: "jueves",
        short_es: "jue"
      };
    }
    if (num === 5) {
      this.result = {
        id: 5,
        long_es: "viernes",
        short_es: "vie"
      };
    }
    if (num === 6) {
      this.result = {
        id: 6,
        long_es: "sábado",
        short_es: "sab"
      };
    }
    if (num === 7) {
      this.result = {
        id: 7,
        long_es: "domingo",
        short_es: "dom"
      };
    }
  }

  return result;
}

export function numToShortWeekDay(value) {
  let result = "";

  if (value === 1) {
    result = "lun";
  }
  if (value === 2) {
    result = "mar";
  }
  if (value === 3) {
    result = "mie";
  }
  if (value === 4) {
    result = "jue";
  }
  if (value === 5) {
    result = "vie";
  }
  if (value === 6) {
    result = "sab";
  }
  if (value === 7) {
    result = "dom";
  }

  return result;
}
