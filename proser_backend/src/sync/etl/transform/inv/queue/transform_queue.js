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

import * as queueFunctions from "./transform_queue_funtions";
import moment from "moment";

const destinyTable = "InvQueue";
const destinyDateField = "";
const destinyStatusField = "inv_queue_status";

const originTable = "InvQueue";
const originDateField = "";
const originStatusField = "inv_queue_status";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function transformInvQueue(start_date) {
  console.log(`/*************/ Transform ${destinyTable} /*************/ `);

  // start_date = process.argv[2];

  // if (!start_date) {
  //   start_date = moment(new Date()).format("YYYY-MM-DD");
  // } else {
  //   start_date = process.argv[2];
  // }

  console.log("start_date", start_date);

  let val = true;

  if (val) {
    let result = await queueFunctions
      .readOriginQueue(start_date, originTable, originStatusField)
      .catch(err =>
        console.log(`${destinyTable} caught it - readOriginQueue`, err)
      );

    if (result) {
      let extendedResult = result
        .map(x => {
          x.inv_queue_operation_json = queueFunctions.inv_queue_operation_json(
            x.inv_queue_operation_json,
            x.inv_queue_id,
            x.inv_queue_name,
            x.inv_queue_number
          );
          x.inv_queue_chk = 3;
          x.inv_queue_shortname = queueFunctions.inv_queue_shortname(
            x.inv_queue_shortname,
            x.inv_queue_name
          );

          x.inv_queue_name = `${x.inv_queue_number} - ${x.inv_queue_name}`;

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
              console.log("transformInvQueue caught it - writeDestiny", err)
          );
          return "transformInvQueue end";
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
  return "transformInvQueue end";
}

/***************************************************************************** */

module.exports = {
  transformInvQueue
};
