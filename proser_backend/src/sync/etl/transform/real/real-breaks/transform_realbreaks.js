import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import {
  writeDestiny,
  previousDate,
  minDate,
  startDate
} from "../../transform_functions";

import * as realbreaksFunctions from "./transform_realbreaks_functions";

import moment from "moment";

const destinyTable = "RealCurrentBreaks";
const destinyDateField = "rcb_date";
const destinyNumberField = "rcb_break_audit_id";

const originTable = "RealCurrentBreaks";
const originDateField = "rcb_date";
const originStatusField = "";

let first_pass = true;
let incoming_date = process.argv[2];

// Read actual records rcc_callentry_datetime_init
async function updateRealCurrentBreaks(start_date, table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    audit_id AS rcb_break_audit_id
    ,audit_agent_id AS rcb_break_agent_id

    ,DATE_FORMAT(audit_datetime_end,'%Y-%m-%d %H:%i:%s') as rcb_break_datetime_end

    ,TIMEDIFF( NOW(), audit_datetime_init) AS rcb_break_duration
    ,TIMESTAMPDIFF(second, audit_datetime_init, now()) AS rcb_break_duration_sec

    ,rcb_date
    ,rcb_break_agent_id
    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json

    FROM
    RealCurrentBreaks

    LEFT OUTER JOIN InvAgent
    ON rcb_break_agent_id = inv_agent_id


    LEFT OUTER JOIN MainAudit
    ON rcb_break_audit_id = audit_id

    `;

    // console.log("querySQL", querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/******************* Runing actual program -- exec*/
async function transformRealBreaks(start_date) {
  let result = null;
  let extendedResult = null;
  let msg = "transformRealBreaks end";

  console.log(`/*************/ Transform ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let preresult = await updateRealCurrentBreaks(
    start_date,
    destinyTable,
    destinyDateField
  ).catch(err =>
    console.log(`${destinyTable} caught it - updateRealCurrentBreaks`, err)
  );

  // console.log("preresult", preresult);

  result = removeRowDataPacket(preresult);

  // console.log("result", result, typeof result);


  if (result) {
    try {
      extendedResult = result
        .map(x => {
          x.rcb_hca_agent_serial_id = `${moment(x.rcb_date).format(
            "YYYY-MM-DD"
          )}-${x.rcb_break_agent_id}`;

          x.rcb_people_json = x.inv_agent_people_json;
          x.rcb_operation_json = x.inv_agent_operation_json;
          x.rcb_time_json = x.inv_agent_time_json;

          return x;
        })
        .map(y => {
          delete y.rcb_date;
          delete y.rcb_break_agent_id;
          delete y.inv_agent_people_json;
          delete y.inv_agent_operation_json;
          delete y.inv_agent_time_json;
          return y;
        });

      let written;

      let validation = extendedResult[0] ? true : false;

      validation === true
        ? (written = await writeDestiny(extendedResult, destinyTable).catch(
          err =>
            console.log("transformRealBreaks caught it - writeDestiny", err)
        ))
        : (msg = `No hay registros nuevos por actualizar en ${destinyTable}`);

      return msg;
    } catch (e) {
      console.log("e", e);
      return e;
    }
  } else {
    return msg;
  }
}

/************************************************************************ */

module.exports = {
  transformRealBreaks
};
