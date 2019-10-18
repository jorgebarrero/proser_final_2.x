import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import {
  writeDestiny,
  previousDate,
  minDate,
  startDate
} from "../../transform_functions";

import * as realcallsFunctions from "./transform_realcalls_functions";

import moment from "moment";

const destinyTable = "RealCurrentCalls";
const destinyDateField = "rcc_date";
const destinyNumberField = "rcc_callentry_id";

const originTable = "RealCurrentCalls";
const originDateField = "rcc_date";
const originStatusField = "rcc_callentry_status";

let first_pass = true;
let incoming_date = process.argv[2];

// Read actual records rcc_callentry_datetime_init
async function updateRealCurrentCalls(start_date, table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    callentry_id AS rcc_callentry_id
    ,callentry_agent_id AS rcc_callentry_agent_id

    ,DATE_FORMAT(callentry_datetime_end,'%Y-%m-%d %H:%i:%s') as rcc_callentry_datetime_end

    ,TIMEDIFF( NOW(), rcc_callentry_datetime_init) AS rcc_callentry_duration
    ,TIMESTAMPDIFF(second, rcc_callentry_datetime_init, now()) AS rcc_callentry_duration_sec


    ,rcc_date
    ,rcc_callentry_agent_id
    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json

    FROM
    RealCurrentCalls

    LEFT OUTER JOIN InvAgent
    ON rcc_callentry_agent_id = inv_agent_id

    LEFT OUTER JOIN MainCallEntry
    ON callentry_id = rcc_callentry_id

    WHERE
    callentry_id IS NOT NULL

    `;

    // console.log("querySQL", querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/******************* Runing actual program -- exec*/
async function transformRealCalls(start_date) {
  let result = null;
  let extendedResult = null;
  let msg = "transformRealCalls end";

  console.log(`/*************/ Transform ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let preresult = await updateRealCurrentCalls(
    start_date,
    destinyTable,
    destinyDateField
  ).catch(err =>
    console.log(`${destinyTable} caught it - updateRealCurrentCalls`, err)
  );

  // console.log("preresult", preresult);

  result = removeRowDataPacket(preresult);

  // console.log("result", result, typeof result);


  if (result) {
    try {
      extendedResult = result
        .map(x => {
          x.rcc_hca_agent_serial_id = `${moment(x.rcc_date).format(
            "YYYY-MM-DD"
          )}-${x.rcc_callentry_agent_id}`;

          x.rcc_people_json = x.inv_agent_people_json;
          x.rcc_operation_json = x.inv_agent_operation_json;
          x.rcc_time_json = x.inv_agent_time_json;

          return x;
        })
        .map(y => {
          delete y.rcc_date;
          delete y.rcc_callentry_agent_id;
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
            console.log("transformRealCalls caught it - writeDestiny", err)
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
  transformRealCalls
};
