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

const destinyTable = "RealCurrentCalls";
const destinyDateField = "rca_break_datetime_init";
const destinyNumberField = "rca_logged_id";

const originTable = "call_center.call_entry";
const originDateField = "datetime_init";
const originNumberField = "id";

let first_pass = true;
// let incoming_date = process.argv[3];

// Read actual records
async function deleteOtherDates(start_date, destinyTable, destinyDateField) {
  let today = moment().format("YYYY-MM-DD");

  return new Promise((resolve, reject) => {
    let querySQL = `
    DELETE FROM RealCurrentCalls WHERE rcc_date <> '${start_date}';
    DELETE FROM RealCurrentCalls WHERE rcc_callentry_datetime_end is not null;

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

    callentry_id AS rcc_callentry_id

    ,callentry_agent_id AS rcc_callentry_agent_id
    ,callentry_queue_id AS rcc_callentry_queue_id
    ,callentry_contact_id AS rcc_callentry_contact_id
    ,callentry_callerid AS rcc_callentry_callerid

    ,DATE_FORMAT(callentry_datetime_init,'%Y-%m-%d %H:%i:%s') as rcc_callentry_datetime_init
    ,DATE_FORMAT(callentry_datetime_end,'%Y-%m-%d %H:%i:%s') as rcc_callentry_datetime_end

    ,callentry_duration_sec AS rcc_callentry_duration_sec
    ,callentry_status AS rcc_callentry_status
    ,callentry_transfer AS rcc_callentry_transfer

    ,DATE_FORMAT(callentry_datetime_entry_queue,'%Y-%m-%d %H:%i:%s') as rcc_callentry_datetime_entry_queue

    ,callentry_duration_sec_wait AS rcc_callentry_duration_wait_sec
    ,callentry_uniqueid AS rcc_callentry_uniqueid
    ,callentry_campaign_id AS rcc_callentry_campaign_id
    ,callentry_trunk AS rcc_callentry_trunk

    ,DATE_FORMAT(callentry_date,'%Y-%m-%d %H:%i:%s') as rcc_date


    FROM
    MainCallEntry

    WHERE
    callentry_date = '${start_date}'
    AND
    (callentry_status = 'activa' OR callentry_status = 'en-cola')
    AND
    callentry_datetime_end is null

    `;
    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/******************* Runing actual program -- exec*/
async function extractRealCalls(start_date) {
  let result = null;

  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let preresult = await readOrigin(
    start_date,
    originTable,
    originDateField
  ).catch(err => console.log(`${destinyTable} caught it - readOrigin`, err));

  let ereased = await deleteOtherDates(
    start_date,
    originTable,
    originDateField
  ).catch(err =>
    console.log(`${destinyTable} caught it - deleteOtherDates`, err)
  );

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
        delete y.rca_logged_id;
        delete y.rcc_date;

        return y;
      });

    let written;
    let msg = "extractRealCalls end";
    let validation = extendedResult[0] ? true : false;

    validation === true
      ? (written = await writeDestiny(extendedResult, destinyTable).catch(err =>
        console.log("extractRealCalls caught it - writeDestiny", err)
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
  extractRealCalls
};
