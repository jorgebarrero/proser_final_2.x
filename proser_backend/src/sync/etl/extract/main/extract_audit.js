import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import {
  writeDestiny,
  readOriginByDate,
  readTableMaxIdByDate,
  readOriginByDateMaxNum,
  previousDate,
  minDate,
  startDate
} from "../extract_functions";
import moment from "moment";

const destinyTable = "MainAudit";
const destinyDateField = "audit_datetime_init";
const destinyNumberField = "audit_id";

const originTable = "call_center.audit";
const originDateField = "datetime_init";
const originNumberField = "id";

let first_pass = true;
// let incoming_date = process.argv[3];

/******************* Runing actual program -- exec*/
async function extractMainAudit(start_date) {
  let result = null;

  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let temp_date = await minDate(originTable, originDateField).catch(err =>
    console.log("extractMainAudit caught it - minDate", err)
  );
  let min_date = removeRowDataPacket(temp_date)[0].min_date;

  console.log("min_date", min_date);
  console.log("start_date", start_date);

  let maxValueTemp = await readTableMaxIdByDate(
    start_date,
    destinyTable,
    destinyDateField,
    destinyNumberField
  ).catch(err =>
    console.log(`${destinyTable} caught it - readTableMaxIdByDate`, err)
  );

  let maxValue = maxValueTemp ? removeRowDataPacket(maxValueTemp)[0].maxId : "";

  console.log("maxValue on date", start_date, maxValue);

  // result = await readOriginByDateMaxNum(
  //   start_date,
  //   originTable,
  //   originDateField,
  //   originNumberField,
  //   maxValue
  // ).catch(err =>
  //   console.log(`${destinyTable} caught it - readOriginByDate`, err)
  // );

  result = await readOriginByDate(
    start_date,
    originTable,
    originDateField,
    originNumberField,
    maxValue
  ).catch(err =>
    console.log(`${destinyTable} caught it - readOriginByDate`, err)
  );

  if (result) {
    let extendedResult = result
      .map(x => {
        x.audit_id = x.id;
        x.audit_agent_id = x.id_agent;
        x.audit_break_id = x.id_break;
        x.audit_datetime_init = x.datetime_init;
        x.audit_datetime_end = x.datetime_end;
        x.audit_duration = x.duration;
        x.audit_ext_parked = x.ext_parked;

        return x;
      })
      .map(y => {
        delete y.id;

        delete y.id_agent;
        delete y.id_break;
        delete y.datetime_init;
        delete y.datetime_end;
        delete y.duration;
        delete y.ext_parked;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err => console.log("extractMainAudit caught it - writeDestiny", err)
        );
        return "extractMainAudit end";
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

  return "extractMainAudit end";
}

/************************************************************************ */

module.exports = {
  extractMainAudit
};
