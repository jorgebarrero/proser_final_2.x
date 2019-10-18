import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import {
  writeDestiny,
  readOriginByDate,
  readOriginByStatus,
  previousDate,
  minDate,
  startDate
} from "../../transform_functions";

import * as agentFunctions from "./transform_agent_funtions";
import moment from "moment";

const destinyTable = "InvAgent";
const destinyDateField = "";
const destinyStatusField = "inv_agent_status";

const originTable = "InvAgent";
const originDateField = "";
const originStatusField = "inv_agent_status";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function transformInvAgent(start_date) {
  console.log(`/*************/ Transform ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let val = true;

  if (val) {
    let result = await readOriginByStatus(
      start_date,
      originTable,
      originStatusField
    ).catch(err =>
      console.log(`${destinyTable} caught it - readOriginByStatus`, err)
    );

    if (result) {
      let extendedResult = result
        .map(x => {
          x.inv_agent_shortname = agentFunctions.inv_agent_shortname(
            x.inv_agent_shortname,
            x.inv_agent_name
          );

          x.inv_agent_chk = 1;

          x.inv_agent_people_json = agentFunctions.inv_agent_people_json(
            x.inv_agent_people_json,
            x.inv_agent_id,
            x.inv_agent_name,
            x.inv_agent_extension
          );

          return x;
        })
        .map(y => {
          return y;
        });

      let validation = extendedResult[0] ? true : false;

      if (validation) {
        try {
          let written = await writeDestiny(extendedResult, destinyTable).catch(
            err =>
              console.log("transformInvAgent caught it - writeDestiny", err)
          );
          return "transformInvAgent end";
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
  }
  return "transformInvAgent end";
}

/***************************************************************************** */

module.exports = {
  transformInvAgent
};
