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

import * as cdrFunctions from "./transform_cdr_funtions";

import * as datesFunctions from "./cdr_dates_functions";
import * as typeFunctions from "./cdr_type_functions";
import * as callFunctions from "./cdr_call_functions";
import * as minMaxFunctions from "./min_max.js";
import * as queryCdrFunctions from "./cdr_query_functions";

import moment from "moment";

const destinyTable = "MainCdr";
const destinyDateField = "";
const destinyStatusField = "calldate";

const originTable = "MainCdr";
const originDateField = "";
const originStatusField = "calldate";

let first_pass = true;
let incoming_date = process.argv[2];

async function readHca(start_date, table) {
  let result = null;
  let querySQL = `
  
    SELECT

    cdr_id, cdr_calldate, cdr_clid, cdr_src, cdr_dst, cdr_dcontext, cdr_channel, cdr_dstchannel, cdr_lastapp, cdr_lastdata, cdr_duration_sec, cdr_billsec_sec, cdr_disposition, cdr_amaflags, cdr_accountcode, cdr_uniqueid, cdr_userfield, cdr_recordingfile, cdr_cnum, cdr_cnam, cdr_outbound_cnum, cdr_outbound_cnam, cdr_dst_cnam, cdr_did, __CALLCENTER__, cdr_callcenter_name, cdr_call_type, cdr_call_class, cdr_agent_extension, cdr_queue_number, cdr_agent_id, cdr_queue_id, __DATE__, cdr_date, __HCA__, cdr_hca_agent_serial_id, cdr_hca_queue_serial_id, __MADE__, cdr_call_made, cdr_call_fail, cdr_call_answered, cdr_call_efective, cdr_call_hungout, cdr_people_json, cdr_agent_operation_json, cdr_agent_time_json,

    inv_agent_extension, inv_agent_name, inv_agent_id,
    inv_queue_number

    FROM
    MainCdr

    LEFT OUTER JOIN InvAgent
    ON cdr_agent_extension = inv_agent_extension
    
    LEFT OUTER JOIN InvQueue
    ON cdr_queue_id = inv_queue_id

    WHERE
    DATE(cdr_calldate) =  '${start_date}'

  `;

  try {
    result = await pool.destiny.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

/******************* Runing actual program -- exec*/
async function transformMainCdrHca(start_date) {
  console.log(`/*************/ Transform transformMainCdrHca /*************/ `);

  if (start_date) {
    console.log("start_date", start_date);

    let result = await readHca(start_date).catch(err =>
      console.log(`${destinyTable} caught it - readHca`)
    );

    // console.log("result", result[0]);

    if (Array.isArray(result)) {
      let extendedResult = result
        .map(x => {
          x.cdr_queue_number = x.inv_queue_number;
          x.cdr_agent_id =
            x.cdr_call_type === "outbound" ? x.inv_agent_id : x.cdr_agent_id;

          return x;
        })
        .map(y => {
          delete y.cdr_date;

          delete y.inv_queue_number;
          delete y.inv_agent_id;
          delete y.inv_agent_name;
          delete y.inv_agent_extension;

          return y;
        });

      // console.log("extendedResult[0] ", extendedResult[0]);

      let validation = extendedResult[0] ? true : false;

      if (validation) {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err =>
            console.log("transformMainCdrHca caught it - writeDestiny", err)
        );
      } else {
        console.log(`********************************************`);
        console.log(`El resultado está vacio`);
      }
    } else {
      console.log(`********************************************`);
      console.log(`No hay registros nuevos por actualizar`);
    }

    return "transformMainCdrHca end";
  }
}

module.exports = {
  transformMainCdrHca
};
