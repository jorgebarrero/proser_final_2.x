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

const destinyTable = "InvBreak";
const destinyDateField = "";
const destinyStatusField = "inv_break_status";

const originTable = "call_center.break";
const originDateField = "";
const originStatusField = "status";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function extractInvBreak(start_date) {
  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  // start_date = process.argv[2];
  
  // if (!start_date) {
  //   start_date = moment(new Date()).format("YYYY-MM-DD");
  // } else {
  //   start_date = process.argv[2];
  // }

  console.log("start_date", start_date);


  let result = await readOriginByStatus(
    start_date,
    originTable,
    originStatusField
  ).catch(err => console.log(`${destinyTable} caught it - readOriginByDate`, err));

  if (result) {
    let extendedResult = result
      .map(x => {
        x.inv_break_id = x.id;
        x.inv_break_name = x.name;
        x.inv_break_description = x.description;
        x.inv_break_status = x.status;
        x.inv_break_type = x.tipo;

        return x;
      })
      .map(y => {
        delete y.id;
        delete y.name;
        delete y.description;
        delete y.status;
        delete y.tipo;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err => console.log("extractInvBreak caught it - writeDestiny", err)
        );
        return "extractInvBreak end";
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
  

  return "extractInvBreak end";
}

/************************************************************************ */

module.exports = {
  extractInvBreak
};
