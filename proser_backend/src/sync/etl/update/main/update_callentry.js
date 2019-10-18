import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import {
  writeDestiny,
  readOriginByDate,
  readDestinyMissingId,
  readOriginByDateIdList,
  previousDate,
  minDate,
  startDate
} from "../update_functions";
import moment from "moment";

const destinyTable = "MainCallEntry";
const destinyDateField = "callentry_datetime_entry_queue";
const destinyNumberField = "callentry_id";
const destinyEmptyField = "callentry_datetime_end";

const originTable = "call_center.call_entry";
const originDateField = "datetime_entry_queue";
const originNumberField = "id";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Runing actual program -- exec*/
async function updateMainCalEntry(start_date) {
  let result = null;
  let temp_date;
  let min_date;
  let maxValueTemp;
  let idListTemp;
  let idList;

  console.log(`/*************/ Updating ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  temp_date = await minDate(originTable, originDateField).catch(err =>
    console.log("updateMainCalEntry caught it - minDate", err)
  );
  min_date = removeRowDataPacket(temp_date)[0].min_date;

  console.log("min_date", min_date);
  console.log("start_date", start_date);

  console.log(
    "Query data",
    start_date,
    destinyTable,
    destinyDateField,
    destinyEmptyField,
    destinyNumberField
  );

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
        x.callentry_id = x.id;
        x.callentry_agent_id = x.id_agent;
        x.callentry_queue_id = x.id_queue_call_entry;
        x.callentry_contact_id = x.id_contact;
        x.callentry_callerid = x.callerid;
        x.callentry_datetime_init = x.datetime_init;
        x.callentry_datetime_end = x.datetime_end;
        x.callentry_duration_sec = x.duration;
        x.callentry_status = x.status;
        x.callentry_transfer = x.transfer;
        x.callentry_datetime_entry_queue = x.datetime_entry_queue;
        x.callentry_duration_sec_wait = x.duration_wait;
        x.callentry_uniqueid = x.uniqueid;
        x.callentry_campaign_id = x.id_campaign;
        x.callentry_trunk = x.trunk;

        return x;
      })
      .map(y => {
        delete y.id;
        delete y.id_agent;
        delete y.id_queue_call_entry;
        delete y.id_contact;
        delete y.callerid;
        delete y.datetime_init;
        delete y.datetime_end;
        delete y.duration;
        delete y.status;
        delete y.transfer;
        delete y.datetime_entry_queue;
        delete y.duration_wait;
        delete y.uniqueid;
        delete y.id_campaign;
        delete y.trunk;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err => console.log("updateMainCalEntry caught it - writeDestiny", err)
        );
        return "updateMainCalEntry end";
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

  return "updateMainCalEntry end";
}

/************************************************************************ */

module.exports = {
  updateMainCalEntry
};
