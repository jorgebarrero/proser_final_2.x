import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import {
  writeDestiny,
  previousDate,
  minDate,
  startDate
} from "../../transform_functions";

import * as realagentFunctions from "./transform_realagents_functions";

import moment from "moment";

const destinyTable = "RealCurrentAgents";
const destinyDateField = "rca_date";
const destinyNumberField = "rca_audit_login_id";

const originTable = "RealCurrentAgents";
const originDateField = "rca_date";
const originStatusField = "";

let first_pass = true;
let incoming_date = process.argv[2];

// Read actual records rcc_callentry_datetime_init
async function updateRealCurrentBreaks(start_date, table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    rca_audit_login_id
    ,rca_date
    ,rca_agent_id

    ,rcb_break_agent_id
    ,rcb_break_productivity
    ,rcc_callentry_agent_id
    ,audit_id
    ,audit_datetime_end


    ,audit_id AS rca_audit_logout_id
    ,audit_agent_id AS rca_agent_id

    ,DATE_FORMAT(audit_datetime_end,'%Y-%m-%d %H:%i:%s') as rca_agent_datetime_logout

    ,TIMEDIFF( NOW(), audit_datetime_init) AS rca_agent_duration
    ,TIMESTAMPDIFF(second, audit_datetime_init, now()) AS rca_agent_duration_sec

    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json


    FROM
    RealCurrentAgents

    LEFT OUTER JOIN InvAgent
    ON rca_agent_id = inv_agent_id

    LEFT OUTER JOIN MainAudit
    ON rca_audit_logout_id = audit_id


    LEFT OUTER JOIN RealCurrentBreaks
    ON rca_agent_id = rcb_break_agent_id

    LEFT OUTER JOIN RealCurrentCalls
    ON rca_agent_id = rcc_callentry_agent_id


    `;

    // console.log("querySQL", querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/******************* Runing actual program -- exec*/
async function transformRealAgents(start_date) {
  let result = null;
  let extendedResult = null;
  let msg = "transformRealAgents end";

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

  if (result) {
    try {
      extendedResult = result
        .map(x => {
          x.audit_datetime_end
            ? (x.rca_agent_status = "Deslogeado")
            : (x.rca_agent_status = "Logueado");

          x.rca_group_name = "Disponible";

          x.rcc_callentry_agent_id === x.rca_agent_id
            ? (x.rca_group_name = "Ocupado")
            : "";

          x.rcb_break_agent_id === x.rca_agent_id &&
          x.rcb_break_productivity === 1
            ? (x.rca_group_name = "Asignado")
            : "";

          x.rcb_break_agent_id === x.rca_agent_id &&
          x.rcb_break_productivity !== 1
            ? (x.rca_group_name = "Auxiliar")
            : "";

          x.rca_hca_agent_serial_id = `${moment(x.rca_date).format(
            "YYYY-MM-DD"
          )}-${x.rca_agent_id}`;

          x.rca_people_json = x.inv_agent_people_json;
          x.rca_operation_json = x.inv_agent_operation_json;
          x.rca_time_json = x.inv_agent_time_json;

          return x;
        })
        .map(y => {
          delete y.rca_date;
          delete y.inv_agent_people_json;
          delete y.inv_agent_operation_json;
          delete y.inv_agent_time_json;

          delete y.rcb_break_agent_id;
          delete y.rcb_break_productivity;
          delete y.rcc_callentry_agent_id;

          delete y.audit_id;
          delete y.audit_datetime_end;

          return y;
        });

      let written;

      let validation = extendedResult[0] ? true : false;

      validation === true
        ? (written = await writeDestiny(extendedResult, destinyTable).catch(
          err =>
            console.log("transformRealAgents caught it - writeDestiny", err)
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
  transformRealAgents
};
