import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import {
  writeDestiny,
  readOriginByExactDate,
  readOriginByStatus,
  previousDate,
  minDate,
  startDate
} from "../../transform_functions";

import * as agentFunctions from "./transform_hca_agent_funtions";
import moment from "moment";

const destinyTable = "HcaAgent";
const destinyDateField = "hca_agent_date";
const destinyStatusField = "hca_agent_status";

const originTable = "HcbAgent";
const originDateField = "hca_agent_date";
const originStatusField = "hca_agent_status";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function transformHcaAgent(start_date) {
  console.log(`/*************/ Transform ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let val = true;

  if (val) {
    let result = await readOriginByExactDate(
      start_date,
      originTable,
      originDateField
    ).catch(err =>
      console.log(`${destinyTable} caught it - readOriginByStatus`, err)
    );

    if (result) {
      let extendedResult = result
        .map(x => {
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
              console.log("transformHcaAgent caught it - writeDestiny", err)
          );
          return "transformHcaAgent end";
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
  return "transformHcaAgent end";
}

/***************************************************************************** */

module.exports = {
  transformHcaAgent
};
