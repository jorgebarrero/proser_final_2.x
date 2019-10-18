import * as pool from "../../../connectors/pool";
import { removeRowDataPacket } from "../../helpers/mysql-helper.js";
import moment from "moment";

// write procesed records
async function writeDestiny(data, current_table) {
  let result = null;
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
async function readOriginByDate(start_date, table, datefield) {
  let result = null;
  let next_date = nextDate(start_date);

  let querySQL = `
  SELECT
  *
  FROM
  ${table}
  WHERE
  ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
  `;

  // return new Promise((resolve, reject) => {
  //   resolve(pool.origin.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readDestinyMissingId(
  start_date,
  table,
  datefield,
  emptyField,
  idField
) {
  let result = null;
  let next_date = nextDate(start_date);

  let querySQL = `
  SELECT
  ${idField} AS id
  FROM
  ${table}
  WHERE
  ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
  AND
  ${emptyField} IS NULL
  `;

  // return new Promise((resolve, reject) => {
  //   // console.log("readDestinyMissingId querySQL", querySQL);
  //   resolve(pool.destiny.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginByDateIdList(
  start_date,
  table,
  datefield,
  idField,
  idList
) {
  let result = null;
  let next_date = nextDate(start_date);

  idList === undefined || idList === null || idList[0] === undefined
    ? (idList = 1)
    : idList;

  let querySQL = `
    SELECT
    *
    FROM
    ${table}
    WHERE
    ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
    AND
    ${idField} IN (${idList})
    `;

  // return new Promise((resolve, reject) => {

  //   // console.log('readOriginByDateIdList querySQL', querySQL);

  //   resolve(pool.origin.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginByDateMaxNum(
  start_date,
  table,
  datefield,
  numberField,
  numberValue,
  selection
) {
  let result = null;
  let next_date = nextDate(start_date);

  numberValue === undefined || numberValue === null
    ? (numberValue = 0)
    : numberValue;

  selection === undefined || selection === null ? (selection = 1) : selection;

  let querySQL = `
  SELECT
  *
  FROM
  ${table}
  WHERE
  ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
  AND
  ${numberField} > ${numberValue}
  AND
  ${selection}
  `;

  // return new Promise((resolve, reject) => {
  //   // console.log('querySQL', querySQL);
  //   resolve(pool.origin.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginByDateMaxNumAllRecords(
  start_date,
  table,
  datefield,
  numberField,
  numberValue,
  selection
) {
  let result = null;
  let next_date = nextDate(start_date);

  numberValue === undefined || numberValue === null
    ? (numberValue = 0)
    : numberValue;

  selection === undefined || selection === null ? (selection = 1) : selection;

  let querySQL = `
  SELECT
  *
  FROM
  ${table}
  WHERE
  ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
  AND
  ${selection}

  // return new Promise( ( resolve, reject ) => {
  //   `;
  //   // console.log('querySQL', querySQL);
  //   resolve( pool.origin.query( querySQL ) );
  //   reject( `Error` );
  // } );

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readTableMaxIdByDate(start_date, table, datefield, numfield) {
  let result = null;
  let next_date = nextDate(start_date);

  let querySQL = `
  SELECT
  max(${numfield}) as maxId
  FROM
  ${table}
  WHERE
  ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
  `;

  // return new Promise((resolve, reject) => {
  //   // console.log('querySQL', querySQL);
  //   resolve(pool.destiny.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.destiny.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginByStatus(start_date, table, statusField) {
  let result = null;

  let querySQL = `
  SELECT
  *
  FROM
  ${table}
  WHERE
  ${statusField} = 'A'
  `;

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginAllRecords(table) {
  let result = null;

  let querySQL = `
  SELECT
  *
  FROM
  ${table}
  `;

  // return new Promise((resolve, reject) => {

  //   resolve(pool.origin.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginBySelection(start_date, table, datefield, selection) {
  let result = null;
  let next_date = nextDate(start_date);

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

  // return new Promise((resolve, reject) => {
  //   // console.log('query', querySQL);

  //   resolve(pool.origin.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
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
async function minDate(table, datefield) {
  let result = null;

  let querySQL = `
    SELECT
    DATE_FORMAT(MIN(${datefield}), '%Y-%m-%d') as min_date
    FROM
    ${table}
    `;

  // return new Promise((resolve, reject) => {
  //   resolve(pool.origin.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.origin.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Calculate Destiny minimum date in REPORTS tables
async function startDate(table, datefield) {
  let result = null;

  let querySQL = `
    SELECT
    DATE_FORMAT(MIN(${datefield}), '%Y-%m-%d') as min_date
    FROM
    ${table}
    `;

  // return new Promise((resolve, reject) => {
  //   resolve(pool.destiny.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.destiny.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

module.exports = {
  writeDestiny,
  readOriginByDate,
  readOriginByDateMaxNum,
  readOriginByDateMaxNumAllRecords,
  readTableMaxIdByDate,
  readOriginByStatus,
  readOriginAllRecords,
  readOriginBySelection,
  readOriginByDateIdList,
  readDestinyMissingId,
  previousDate,
  nextDate,
  minDate,
  startDate
};
