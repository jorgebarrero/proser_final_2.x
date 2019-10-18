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

const destinyTable = "RealCurrentAgents";
const destinyDateField = "rca_break_datetime_init";
const destinyNumberField = "rca_logged_id";

const originTable = "call_center.audit";
const originDateField = "datetime_init";
const originNumberField = "id";

let first_pass = true;
// let incoming_date = process.argv[3];

// Read actual records
async function deleteOtherDates(start_date, destinyTable, destinyDateField) {
  let today = moment().format("YYYY-MM-DD");

  return new Promise((resolve, reject) => {
    let today = moment().format("YYYY-MM-DD");
    let querySQL = `
    DELETE FROM RealCurrentAgents WHERE rca_date <> '${start_date}'
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
      MIN(audit_id) as rca_audit_login_id
      ,MAX(audit_id) as rca_audit_logout_id
      ,audit_agent_id as rca_agent_id

      ,DATE_FORMAT(audit_datetime_init,'%Y-%m-%d %H:%i:%s') as rca_agent_datetime_login

      ,DATE_FORMAT(audit_datetime_init,'%Y-%m-%d') as rca_date
      ,inv_agent_name AS rca_agent_name

    FROM
    MainAudit

    LEFT OUTER JOIN InvAgent
    ON audit_agent_id = inv_agent_id


    WHERE
    audit_datetime_init >= '${start_date}' AND audit_datetime_init < '${next_date}'
    AND
    audit_break_id is null


    GROUP BY audit_agent_id

    `;
    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/******************* Runing actual program -- exec*/
async function extractRealAgents(start_date) {
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

        return y;
      });

    let written;
    let msg = "extractRealAgents end";
    let validation = extendedResult[0] ? true : false;

    validation === true
      ? (written = await writeDestiny(extendedResult, destinyTable).catch(err =>
        console.log("extractRealAgents caught it - writeDestiny", err)
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
  extractRealAgents
};
