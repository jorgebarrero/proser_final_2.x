import moment from "moment";

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
      console.log("ERROR string");
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
      console.log("ERROR object");
      result = inputDate;
    }
  }
  return result;
}

export function valueFromObject(inputField, defaultValue) {
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
