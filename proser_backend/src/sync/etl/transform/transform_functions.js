import * as pool from "../../../connectors/pool";
import { removeRowDataPacket } from "../../helpers/mysql-helper.js";
import moment from "moment";

// write procesed records
function writeDestiny(data, current_table) {
  if (data[0] !== undefined) {
    return new Promise((resolve, reject) => {
      let myfields = Object.keys(data[0]);

      let myRecords = data.map(x => {
        return Object.values(x);
      });

      let updateFieldsArray = myfields.map((x, index) => {
        return `${x} = VALUE(${x})`;
      });

      let updateFields = updateFieldsArray;

      let querySQL = `INSERT INTO ${current_table} (${myfields}) values ?
    ON DUPLICATE KEY UPDATE ${updateFields}
    `;
      // Record in database
      resolve(pool.destiny.query(querySQL, [myRecords]));
      reject(`Error`);
    });
  } else {
    return [];
  }
}

// Read actual records
function readOriginByDate(start_date, table, datefield) {
  let next_date = nextDate(start_date);
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    *
    FROM
    ${table}
    WHERE
    ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
    `;

    // console.log('querySQL', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
function readOriginByExactDate(start_date, table, datefield) {
  console.log("***** ------- *******", start_date, table, datefield);

  let next_date = nextDate(start_date);
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    *
    FROM
    ${table}
    WHERE
    ${datefield} = '${start_date}'
    `;

    // console.log('querySQL', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
function readOriginByStatus(start_date, table, statusField) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    *
    FROM
    ${table}
    WHERE
    ${statusField} = 'A'
    `;

    // console.log('querySQL', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
function readOriginAllRecords(table) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    *
    FROM
    ${table}

    `;

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
function readOriginBySelection(start_date, table, datefield, selection) {
  let next_date = nextDate(start_date);

  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    *
    FROM
    ${table}
    WHERE
    ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
    AND
    ${selection}
    `;
    // console.log('query', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Calculate previous date
function previousDate(initial_date) {
  let formated_date = moment().format("YYYY-MM-DD");
  let startdate = moment(initial_date);
  let previous_date = startdate.subtract(1, "days");
  formated_date = startdate.format("YYYY-MM-DD");
  return formated_date;
}

// Calculate previous date
function nextDate(initial_date) {
  let formated_date = moment().format("YYYY-MM-DD");
  let startdate = moment(initial_date);
  let previous_date = startdate.add(1, "days");
  formated_date = startdate.format("YYYY-MM-DD");
  return formated_date;
}

// Calculate lowest date in ORIGIN table
function minDate(table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
      SELECT
      DATE_FORMAT(MIN(${datefield}), '%Y-%m-%d') as min_date
      FROM
      ${table}
      `;
    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Calculate Destiny minimum date in REPORTS tables
function startDate(table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
      SELECT
      DATE_FORMAT(MIN(${datefield}), '%Y-%m-%d') as min_date
      FROM
      ${table}
      `;
    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

module.exports = {
  writeDestiny,
  readOriginByDate,
  readOriginByStatus,
  readOriginAllRecords,
  readOriginBySelection,
  previousDate,
  nextDate,
  minDate,
  startDate,
  readOriginByExactDate
};
