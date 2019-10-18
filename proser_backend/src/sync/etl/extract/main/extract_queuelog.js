import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import {
  writeDestiny,
  readOriginByDate,
  readOriginBySelection,
  readTableMaxIdByDate,
  readOriginByDateMaxNum,
  previousDate,
  minDate,
  startDate
} from "../extract_functions";
import moment from "moment";

const destinyTable = "MainQueueLog";
const destinyDateField = "queuelog_created";
const destinyNumberField = "queuelog_id";

const originTable = "asterisk.queuelog";
const originDateField = "created";
const originNumberField = "id";

let first_pass = true;
let incoming_date = process.argv[2];

/******************* Running actual program -- exec*/
async function extractMainQueueLog(start_date) {
  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let temp_date = await minDate(originTable, originDateField).catch(err =>
    console.log("extractMainQueueLog caught it - minDate", err)
  );

  let min_date =
    typeof temp_date != "undefined"
      ? removeRowDataPacket(temp_date)[0].min_date
      : "";

  console.log("min_date", min_date);
  console.log("start_date", start_date);

  let selection = `(event = 'COMPLETEAGENT' OR event = 'COMPLETECALLER') `;

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

  let result = await readOriginByDateMaxNum(
    start_date,
    originTable,
    originDateField,
    originNumberField,
    maxValue,
    selection
  ).catch(err =>
    console.log(`${destinyTable} caught it - readOriginByDate`, err)
  );

  if (result) {
    let extendedResult = result
      .map(x => {
        x.queuelog_id = x.id;
        x.queuelog_time = x.time;
        x.queuelog_uniqueid = x.callid;
        x.queuelog_queuename = x.queuename;
        x.queuelog_agent = x.agent;
        x.queuelog_event = x.event;
        x.queuelog_data = x.data;
        x.queuelog_data1 = x.data1;
        x.queuelog_data2 = x.data2;
        x.queuelog_data3 = x.data3;
        x.queuelog_data4 = x.data4;
        x.queuelog_data5 = x.data5;
        x.queuelog_created = x.created;

        return x;
      })
      .map(y => {
        delete y.id;

        delete y.time;
        delete y.callid;
        delete y.queuename;
        delete y.agent;
        delete y.event;
        delete y.data;
        delete y.data1;
        delete y.data2;
        delete y.data3;
        delete y.data4;
        delete y.data5;
        delete y.created;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err =>
            console.log("extractMainQueueLog caught it - writeDestiny", err)
        );
        return "extractMainQueueLog end";
      } catch (e) {
        console.log("e", e);
        return e;
      }
    } else {
      console.log(`********************************************`);
      console.log(`El resultado está vacío en ${originTable}`);
    }
  } else {
    console.log(`********************************************`);
    console.log(`No hay registros nuevos por actualizar en ${destinyTable}`);
  }

  return "extractMainQueueLog end";
}

/************************************************************************ */

module.exports = {
  extractMainQueueLog
};
