import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from "moment";

// Read actual records
function readOriginCall(start_date, table, datefield) {
  let next_date = nextDate(start_date);

  console.log(
    "readOriginCall IN DATA",
    start_date,
    next_date,
    table,
    datefield
  );

  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    callentry_id
    ,callentry_agent_id
    ,callentry_queue_id
    ,callentry_contact_id
    ,callentry_callerid
    ,callentry_datetime_init
    ,callentry_datetime_end
    ,callentry_duration_sec
    ,callentry_status
    ,callentry_transfer
    ,callentry_datetime_entry_queue
    ,callentry_duration_sec_wait
    ,callentry_uniqueid
    ,callentry_campaign_id
    ,callentry_trunk
    ,callentry_date
    ,callentry_queue_time_expired
    ,callentry_type
    ,callentry_auto_campaign
    ,callentry_who_hung
    ,callentry_hung_agent
    ,callentry_hung_caller
    
    ,queuelog_event
    
    ,inv_queue_number as callentry_queue_number
    ,inv_queue_type as callentry_type

    ,callentry_date
    ,callentry_agent_id
    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json

    ,inv_queue_operation_json
    ,inv_queue_system_json

    FROM MainCallEntry


    LEFT OUTER JOIN InvAgent
    ON callentry_agent_id = inv_agent_id

    LEFT OUTER JOIN InvQueue
    ON callentry_queue_id = inv_queue_id

    LEFT OUTER JOIN MainQueueLog
    ON callentry_uniqueid = queuelog_uniqueid
    AND (queuelog_event = 'COMPLETECALLER'   OR queuelog_event = 'COMPLETEAGENT' )


    WHERE
    callentry_datetime_entry_queue >= '${start_date}' AND callentry_datetime_entry_queue < '${next_date}'
    `;

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

module.exports = {
  nextDate,
  readOriginCall
};
