import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import {
  writeDestiny,
  readOriginByDate,
  readOriginByDateIdList,
  readDestinyMissingId,
  previousDate,
  minDate,
  startDate
} from "../update_functions";
import moment from "moment";

const destinyTable = "MainAudit";
const destinyDateField = "audit_datetime_init";
const destinyNumberField = "audit_id";
const destinyEmptyField = "audit_datetime_end";

const originTable = "call_center.audit";
const originDateField = "datetime_init";
const originNumberField = "id";

let first_pass = true;
// let incoming_date = process.argv[3];

/******************* Runing actual program -- exec*/
async function updateMainAudit(start_date) {
  let result = null;
  let temp_date;
  let min_date;
  let maxValueTemp;
  let idListTemp;
  let idList;

  console.log(`/*************/ Updating ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  temp_date = await minDate(originTable, originDateField).catch(err =>
    console.log("updateMainAudit caught it - minDate", err)
  );
  min_date = removeRowDataPacket(temp_date)[0].min_date;

  console.log("min_date", min_date);
  console.log("start_date", start_date);

  maxValueTemp = await readDestinyMissingId(
    start_date,
    destinyTable,
    destinyDateField,
    destinyEmptyField,
    destinyNumberField
  ).catch(err =>
    console.log(`${destinyTable} caught it - readTableMaxIdByDate`, err)
  );

  idListTemp = maxValueTemp ? removeRowDataPacket(maxValueTemp) : "";

  if (Array.isArray(idListTemp)) {
    idList = idListTemp.map(x => {
      return x.id;
    });
  }
  // console.log('maxValue id list', start_date, idList);

  if (idList) {
    result = await readOriginByDateIdList(
      start_date,
      originTable,
      originDateField,
      originNumberField,
      idList
    ).catch(err =>
      console.log(`${destinyTable} caught it - readOriginByDate`, err)
    );
  }

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
          err => console.log("updateMainAudit caught it - writeDestiny", err)
        );
        return "updateMainAudit end";
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

  return "updateMainAudit end";
}

/************************************************************************ */

module.exports = {
  updateMainAudit
};
