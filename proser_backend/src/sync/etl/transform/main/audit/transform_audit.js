import * as pool from "../../../../../connectors/pool";
import {
  removeRowDataPacket,
  removeRowDataPacketArray
} from "../../../../helpers/mysql-helper";
import {
  writeDestiny,
  readOriginByDate,
  readOriginByStatus,
  previousDate,
  minDate,
  startDate
} from "../../transform_functions";

import * as auditFunctions from "./transform_audit_funtions";

import moment from "moment";

const destinyTable = "MainAudit";
const destinyDateField = "audit_datetime_init";
const destinyStatusField = "audit_status";

const originTable = "MainAudit";
const originDateField = "datetime_init";
const originStatusField = "";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function transformMainAudit(start_date) {
  console.log(`/*************/ Transform ${destinyTable} /*************/ `);

  if (start_date) {
    console.log("start_date", start_date);

    let preResult = await auditFunctions
      .readOriginAudit(start_date, destinyTable, destinyDateField)
      .catch(err =>
        console.log(`${destinyTable} caught it - readOriginAudit`, err)
      );

    let result = removeRowDataPacket(preResult);

    // console.log("preResult", preResult[0], "result", result[0]);

    // console.log("result", result[0], typeof result);

    if (result) {
      let extendedResult = result
        .map(x => {
          // x.audit_duration = "00:00:00";
          x.audit_duration_sec = moment.duration(x.audit_duration).asSeconds();
          x.audit_status = x.audit_duration ? `I` : `A`;

          // x.audit_date = moment(x.audit_datetime_init).format("YYYY-MM-DD");

          x.audit_datetime_end = x.audit_datetime_end
            ? moment(x.audit_datetime_end).format("YYYY-MM-DD HH:mm:ss")
            : null;

          x.audit_datetime_init = x.audit_datetime_init
            ? moment(x.audit_datetime_init).format("YYYY-MM-DD HH:mm:ss")
            : null;

          x.audit_operation_json = x.Accounts;
          x.__TIME__ = 1;

          x.audit_hca_agent_serial_id = `${moment(x.audit_date).format(
            "YYYY-MM-DD"
          )}-${x.audit_agent_id}`;

          x.audit_people_json = x.inv_agent_people_json;
          x.audit_operation_json = x.inv_agent_operation_json;
          x.audit_time_json = x.inv_agent_time_json;

          return x;
        })
        .map(y => {
          delete y.audit_date;
          delete y.audit_agent_id;
          delete y.inv_agent_people_json;
          delete y.inv_agent_operation_json;
          delete y.inv_agent_time_json;

          delete y.Accounts;
          delete y.audit_date;
          delete y.inv_agent_operation_json;

          return y;
        });

      let validation = extendedResult[0] ? true : false;

      if (validation) {
        try {
          let written = await writeDestiny(extendedResult, destinyTable).catch(
            err =>
              console.log("transformMainAudit caught it - writeDestiny", err)
          );
          return "transformMainAudit end";
        } catch (e) {
          console.log("e", e);
          return e;
        }
      } else {
        console.log(`********************************************`);
        console.log(`El resultado está vacio en ${originTable}`);
      }
    } else {
      console.log(`********************************************`);
      console.log(`No hay registros nuevos por actualizar en ${destinyTable}`);
    }

    return "transformMainAudit end";
  }
}
/************************************************************************ */

// transformMainAudit("2019-08-06");

module.exports = {
  transformMainAudit
};
