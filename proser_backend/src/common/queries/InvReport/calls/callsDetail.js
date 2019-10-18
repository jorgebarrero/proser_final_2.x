import * as pool from "../../../../connectors/pool";

// import userSelectionFilters from "../../InvMenu/userSelection/userSelectionFilters";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../../functions/sqlFunctions";

/******************************************************************** */

export async function callsDetailReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "cdr_calldate")}

,cdr_id as cdr_id
,cdr_uniqueid as cdr_uniqueid
,cdr_agent_id as agent_id
,inv_agent_name as agent_name
,JSON_UNQUOTE(JSON_EXTRACT(cdr_people_json, "$[0].agent[0].extension")) as agent_extension
,IF(cdr_dcontext = 'from-internal-xfer', 'xfer', '') as agent_transfer
,JSON_UNQUOTE(JSON_EXTRACT(inv_agent_people_json, "$[0].name") ) as agent_supervisor_name
,DATE_FORMAT(cdr_date, '%Y-%m-%d') as start_date
,DATE_FORMAT(cdr_calldate, '%H:%i:%s') as start_time
,cdr_call_class as call_class
,cdr_src as call_source
,cdr_dst as call_destiny
,SEC_TO_TIME(cdr_duration_sec) as duration
,cdr_disposition as call_status
,cdr_call_type as call_type
,cdr_recordingfile as record
,DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s') as queue_time
,DATE_FORMAT(callentry_datetime_init, '%H:%i:%s') as connection_time
,DATE_FORMAT(callentry_datetime_end, '%H:%i:%s') as end_time
,IF(callentry_hung_agent = 1, DATE_FORMAT(callentry_datetime_end, '%H:%i:%s'), null) as time_hung_agent
,IF(callentry_hung_caller = 1, DATE_FORMAT(callentry_datetime_end, '%H:%i:%s'), null) as time_hung_caller
,IF(callentry_status = 'abandonada', DATE_FORMAT(callentry_datetime_end, '%H:%i:%s'), null) as time_abandoned

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainCdr
LEFT OUTER JOIN InvAgent
ON cdr_agent_id = inv_agent_id

LEFT OUTER JOIN InvQueue
ON cdr_queue_id = inv_queue_id

LEFT OUTER JOIN MainCallEntry
ON cdr_uniqueid = callentry_uniqueid


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "cdr_calldate")}

-- AGENT
${arrayToSqlQuery(userSelection.agent, "cdr_agent_id")}

-- SUPERVISOR
${arrayToJsonSqlQuery(
    userSelection.supervisor,
    "cdr_people_json",
    "supervisor"
  )}

-- SCHEDULE
${arrayToJsonSqlQuery(userSelection.client, "cdr_time_json", "schedule")}

-- ROLE
${arrayToJsonSqlQuery(userSelection.client, "cdr_people_json", "role")}

-- CLIENT
${arrayToJsonSqlQuery(userSelection.client, "cdr_operation_json", "client")}

-- QUEUE
${arrayToSqlQuery(userSelection.queue, "cdr_queue_id")}

-- SERVICE
${arrayToJsonSqlQuery(userSelection.service, "cdr_operation_json", "service")}

-- CAMPAIGN
${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}


${sqlIntervalGroupSqlQuery(userSelection)}

-- ---------------------------------------------------------------
-- END
`;

  try {
    let resultPre = await pool.destiny.query(query);
    result = resultPre;
  } catch (error) {
    result = { error: error };
  }

  return result;
}
