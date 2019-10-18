import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from "moment";

async function readHca(start_date, table) {
  let result = null;
  let querySQL = `
  
    SELECT
    *
    FROM
    HcaAgent
    WHERE
    hca_agent_date =  '${start_date}'

  `;

  try {
    result = await pool.destiny.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
async function readOriginCdr(start_date, table, datefield) {
  let result = null;
  let next_date = nextDate(start_date);

  let querySQL = `
    SELECT
    

    cdr_id
    ,cdr_calldate
    ,cdr_clid
    ,cdr_src
    ,cdr_dst
    ,cdr_dcontext
    ,cdr_channel
    ,cdr_dstchannel
    ,cdr_lastapp
    ,cdr_lastdata
    ,cdr_duration_sec
    ,cdr_billsec_sec
    ,cdr_disposition
    ,cdr_amaflags
    ,cdr_accountcode
    ,cdr_uniqueid
    ,cdr_userfield
    ,cdr_recordingfile
    ,cdr_cnum
    ,cdr_cnam
    ,cdr_outbound_cnum
    ,cdr_outbound_cnam
    ,cdr_dst_cnam
    ,cdr_did

    ,callentry_id
    ,callentry_agent_id
    ,callentry_queue_id
    ,callentry_type

    ,inv_agent_id

    ,inv_agent_id
    ,inv_queue_number

    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json

    ,inv_queue_operation_json
    ,inv_queue_system_json
    
    FROM
    MainCdr AS cdr
    
    LEFT OUTER JOIN MainCallEntry as call_entry
    ON cdr_uniqueid = callentry_uniqueid

    LEFT OUTER JOIN InvAgent
    ON cdr_agent_id = inv_agent_id

    LEFT OUTER JOIN InvQueue
    ON cdr_queue_id = inv_queue_id


    WHERE cdr_calldate >= '${start_date}' AND cdr_calldate < '${next_date}'

    `;


  try {
    result = await pool.destiny.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

// Read actual records
function readOriginCdrHca(start_date, table, datefield) {
  let next_date = nextDate(start_date);

  let querySQL = `
  SELECT
  id AS id
  ,D.hca_agent_id as cdr_hca_agent_id
  ,Q.hca_queue_id as cdr_hca_queue_id
  
  FROM
  MainCdr AS cdr

  LEFT OUTER JOIN HcaAgent AS D
  ON D.hca_agent_date =
     ( SELECT Di.hca_agent_date
       FROM HcaAgent AS Di
       WHERE Di.hca_agent_date <= '${start_date}' AND Di.hca_agent_extension = cdr_type_extension
       ORDER BY Di.hca_agent_date DESC
       LIMIT 1
     )

     LEFT OUTER JOIN HcaQueue AS Q
     ON Q.hca_queue_date =
        ( SELECT Qi.hca_queue_date
          FROM HcaQueue AS Qi
          WHERE Qi.hca_queue_date <= '${start_date}' AND Qi.hca_queue_id = cdr_queue_id
          ORDER BY Qi.hca_queue_date DESC
          LIMIT 1
        )
  

    WHERE cdr.calldate >= '${start_date}' AND cdr.calldate < '${next_date}'

    `;

  // console.log("readOriginCdr IN DATA", start_date, next_date, table, datefield);

  // console.log("query", querySQL);

  return new Promise((resolve, reject) => {
    // console.log('querySQL', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Calculate previous date
function nextDate(initial_date) {
  let formated_date = moment().format("YYYY-MM-DD");
  let startdate = moment(initial_date);
  let previous_date = startdate.add(1, "days");
  formated_date = startdate.format("YYYY-MM-DD");
  return formated_date;
}

function inv_queue_shortname(short_name, original_name) {
  let result = null;

  if (short_name) {
    result = short_name;
  } else {
    result = original_name;
  }
  return result;
}

module.exports = {
  inv_queue_shortname,
  nextDate,
  readOriginCdr,
  readOriginCdrHca,
  readHca
};
