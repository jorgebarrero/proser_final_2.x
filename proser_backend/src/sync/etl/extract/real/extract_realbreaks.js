import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import {
  writeDestiny,
  previousDate,
  nextDate,
  minDate,
  startDate
} from "../extract_functions";
import moment from "moment";
import { start } from "repl";

const destinyTable = "RealCurrentBreaks";
const destinyDateField = "rcb_break_datetime_init";
const destinyNumberField = "rcb_break_audit_id";

const originTable = "call_center.audit";
const originDateField = "datetime_init";
const originNumberField = "id";

let first_pass = true;
// let incoming_date = process.argv[3];

// Read actual records
async function deleteOtherDates(start_date, destinyTable, destinyDateField) {
  let today = moment().format("YYYY-MM-DD");

  return new Promise((resolve, reject) => {
    let querySQL = `
    DELETE FROM RealCurrentBreaks WHERE rcb_date <> '${start_date}';
    DELETE FROM RealCurrentBreaks WHERE rcb_break_datetime_end IS NOT NULL;
    `;
    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
async function readOrigin(start_date, table, datefield) {
  let next_date = nextDate(start_date);
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT

      MIN(audit_id) as rcb_break_audit_id
      ,audit_agent_id as rcb_break_agent_id
      ,audit_break_id as rcb_break_id

      ,DATE_FORMAT(audit_datetime_init,'%Y-%m-%d %H:%i:%s') as rcb_break_datetime_init
      ,DATE_FORMAT(audit_datetime_end,'%Y-%m-%d %H:%i:%s') as rcb_break_datetime_end

      ,DATE_FORMAT(audit_datetime_init,'%Y-%m-%d') as rcb_date
      ,inv_break_name AS rcb_break_name
      ,inv_break_productivity AS rcb_break_productivity

    FROM
    MainAudit

    LEFT OUTER JOIN InvBreak
    ON audit_break_id = inv_break_id

    WHERE

    audit_datetime_end is null

    AND

    audit_datetime_init >= '${start_date}' AND audit_datetime_init < '${next_date}'

    AND
    audit_break_id is not null

    GROUP BY audit_agent_id

    `;

    // AND
    // audit_datetime_end is null
    // GROUP BY audit_agent_id

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/******************* Runing actual program -- exec*/
async function extractRealBreaks(start_date) {
  let result = null;

  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let preresult = await readOrigin(
    start_date,
    originTable,
    originDateField
  ).catch(err => console.log(`${destinyTable} caught it - readOrigin`, err));

  let ereased = 1; //await deleteOtherDates(
  //   start_date,
  //   originTable,
  //   originDateField
  // ).catch(err =>
  //   console.log(`${destinyTable} caught it - deleteOtherDates`, err)
  // );

  result = removeRowDataPacket(preresult);

  try {
    let extendedResult = result
      .map(x => {
        // x.rca_logged_id = x.id;
        // x.rca_logged_agent_id = x.id_agent;
        // x.rca_break_id = x.id_break;
        // x.rca_break_datetime_init = x.datetime_init;
        // x.rca_break_datetime_end = x.datetime_end;
        // x.rca_break_duration = x.duration;

        return x;
      })
      .map(y => {
        delete y.id;

        delete y.id_agent;
        delete y.id_break;
        delete y.datetime_init;
        delete y.datetime_end;
        delete y.duration;
        delete y.ext_parked;
        delete y.rcb_date;

        return y;
      });

    let written;
    let msg = "extractRealBreaks end";
    let validation = extendedResult[0] ? true : false;

    validation === true
      ? (written = await writeDestiny(extendedResult, destinyTable).catch(err =>
        console.log("extractRealBreaks caught it - writeDestiny", err)
      ))
      : (msg = `No hay registros nuevos por actualizar en ${destinyTable}`);

    return msg;
  } catch (e) {
    console.log("e", e);
    return e;
  }
}

/************************************************************************ */

module.exports = {
  extractRealBreaks
};
