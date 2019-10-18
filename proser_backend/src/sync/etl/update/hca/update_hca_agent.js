import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";

import { writeDestiny } from "../update_functions";

import moment from "moment";

import * as customFunctions from "./update_hca_agent_functions";
import * as numberFunctions from "../../../../functions/number";

let weekday = moment().isoWeekday();
let today = moment().format("YYYY-MM-DD");

let current_date = today;

const destinyTable = "HcaAgent";
const destinyDateField = "";
const destinyStatusField = "hca_agent_status";

const originTable = "InvAgent";
const originDateField = "";
const originStatusField = "inv_agent_status";

let first_pass = true;
let incoming_date = process.argv[2];

// Read actual cdr records
function readOrigin(start_date) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    
    inv_agent_id
    ,inv_agent_name
    ,inv_agent_extension
    ,inv_agent_status

    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json


    ,inv_calendarday_date
    ,inv_calendarday_name
    ,inv_calendarday_type
    ,inv_calendarday_status

    ,inv_scheduleday_start_time
    ,inv_scheduleday_end_time
    ,inv_scheduleday_legal_break
    ,inv_scheduleday_laborday
    ,inv_scheduleday_duration



    FROM InvAgent

      LEFT OUTER JOIN InvCalendarDay
       ON '${start_date}' = inv_calendarday_date

       LEFT OUTER JOIN InvScheduleDay
       ON JSON_UNQUOTE(JSON_EXTRACT(inv_agent_time_json, '$schedule[0].id')) = inv_schedule_id
       AND ${weekday} = inv_scheduleday_weekday

    WHERE inv_agent_status = 'A'

    `;

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

async function updateHcaAgent(start_date) {
  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let val = true;

  let preResult = await readOrigin(start_date).catch(err =>
    console.log("updateHcaAgent error - readOrigin", err)
  );
  let result = preResult ? preResult : [""];

  if (result) {
    let extendedResult = result
      .map(function(x) {
        let today = moment(new Date()).format(`YYYY-MM-DD`);

        x.hca_agent_serial_id = today + "-" + x.inv_agent_id;
        x.hca_agent_origin = "InvAgent";
        x.hca_agent_date = today;
        x.hca_agent_id = x.inv_agent_id;
        x.hca_agent_name = x.inv_agent_name;
        x.hca_agent_extension = x.inv_agent_extension;
        x.hca_agent_status = x.inv_agent_status;
        x.hca_agent_laborday =
          x.inv_calendarday_name !== null || x.inv_scheduleday_laborday !== 1
            ? "0"
            : 1;

        x.__JSON__ = 1;

        x.hca_agent_people_json = x.inv_agent_people_json;
        x.hca_agent_operation_json = x.inv_agent_operation_json;
        x.hca_agent_time_json = x.inv_agent_time_json;

        return x;
      })
      .map(y => {
        // TYPE

        delete y.inv_agent_id;
        delete y.inv_agent_name;
        delete y.inv_agent_extension;
        delete y.inv_agent_status;

        delete y.inv_agent_people_json;
        delete y.inv_agent_operation_json;
        delete y.inv_agent_time_json;

        delete y.inv_calendarday_date;
        delete y.inv_calendarday_name;
        delete y.inv_calendarday_type;
        delete y.inv_calendarday_status;

        delete y.inv_scheduleday_start_time;
        delete y.inv_scheduleday_end_time;
        delete y.inv_scheduleday_legal_break;
        delete y.inv_scheduleday_laborday;
        delete y.inv_scheduleday_duration;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err => console.log("updateHcaAgent caught it - writeDestiny", err)
        );
        return "updateHcaAgent end";
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

  return "updateHcaAgent end";
}

/************************************************************************ */

module.exports = {
  updateHcaAgent
};

// let x = {
//   inv_schedule_id: 1,
//   inv_scheduleday_duration: null,
//   inv_scheduleday_end_time: "17:00:00",
//   inv_scheduleday_id: "7",
//   inv_scheduleday_laborday: "0",
//   inv_scheduleday_legal_break: "01:00:00",
//   inv_scheduleday_name: "domingo",
//   inv_scheduleday_start_time: "08:00:00",
//   inv_scheduleday_weekday: "7"
// };
