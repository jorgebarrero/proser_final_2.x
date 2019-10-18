import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import {
  writeDestiny,
  readOriginByDate,
  readOriginByStatus,
  previousDate,
  minDate,
  startDate
} from "../extract_functions";
import moment from "moment";

const destinyTable = "InvAgent";
const destinyDateField = "";
const destinyStatusField = "inv_agent_status";

const originTable = "call_center.agent";
const originDateField = "";
const originStatusField = "estatus";

let first_pass = true;
let incoming_date = process.argv[2];

async function extractInvAgent(start_date) {
  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let val = true;

  let result = await readOriginByStatus(
    start_date,
    originTable,
    originStatusField
  ).catch(err =>
    console.log(`${destinyTable} caught it - readOriginByStatus`, err)
  );

  if (Array.isArray(result)) {
    let extendedResult = result
      .map(x => {
        x.inv_agent_id = x.id;
        x.inv_agent_type = x.type;
        x.inv_agent_extension = x.number;
        x.inv_agent_name = x.name;
        x.inv_agent_status = x.estatus;

        return x;
      })
      .map(y => {
        delete y.id;
        delete y.type;
        delete y.number;
        delete y.name;
        delete y.password;
        delete y.estatus;
        delete y.eccp_password;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err => console.log("extractInvAgent caught it - writeDestiny", err)
        );
        return "extractInvAgent end";
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

  return "extractInvAgent end";
}

/************************************************************************ */

module.exports = {
  extractInvAgent
};
