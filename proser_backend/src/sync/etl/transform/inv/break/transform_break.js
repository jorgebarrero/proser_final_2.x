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

import * as breakFunctions from "./transform_break_funtions";
import moment from "moment";

const destinyTable = "InvBreak";
const destinyDateField = "";
const destinyStatusField = "inv_break_status";

const originTable = "InvBreak";
const originDateField = "";
const originStatusField = "inv_break_status";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function transformInvBreak(start_date) {
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
          x.inv_break_chk = 1;
          x.inv_break_shortname = breakFunctions.inv_break_shortname(
            x.inv_break_name,
            x.inv_break_shortname
          );

          x.inv_break_codename = breakFunctions.inv_break_codename(
            x.inv_break_name
          );

          return x;
        })
        .map(y => {
          delete y.inv_break_class;

          return y;
        });

      let validation = extendedResult[0] ? true : false;

      if (validation) {
        try {
          let written = await writeDestiny(extendedResult, destinyTable).catch(
            err =>
              console.log("transformInvBreak caught it - writeDestiny", err)
          );
          return "transformInvBreak end";
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
  return "transformInvBreak end";
}

/***************************************************************************** */

module.exports = {
  transformInvBreak
};
