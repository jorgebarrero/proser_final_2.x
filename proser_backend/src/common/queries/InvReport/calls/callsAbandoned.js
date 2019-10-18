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

export async function callsAbandonedReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "callentry_datetime_entry_queue")}

  ,callentry_callerid as callerid
  ,callentry_date
  ,DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s') as time_entry_queue
  ,callentry_duration_sec_wait as duration_wait_secs
  ,SEC_TO_TIME(callentry_duration_sec_wait) as duration_wait_time
  ,DATE_FORMAT(callentry_datetime_end, '%H:%i:%s') as time_end
  ,callentry_uniqueid as uniqueid
  ,inv_queue_name as queue_name
  ,inv_queue_number as queue_number

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainCallEntry
LEFT OUTER JOIN InvAgent
ON callentry_agent_id = inv_agent_id

LEFT OUTER JOIN InvQueue
ON callentry_queue_id = inv_queue_id

LEFT OUTER JOIN MainAudit
ON callentry_agent_id = audit_agent_id
AND callentry_date = audit_date

-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

AND
callentry_status = 'abandonada'

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "callentry_datetime_entry_queue")}

-- AGENT
${arrayToSqlQuery(userSelection.agent, "callentry_agent_id")}

-- SUPERVISOR
${arrayToJsonSqlQuery(userSelection.supervisor, "callentry_people_json", "supervisor")}

-- SCHEDULE
${arrayToJsonSqlQuery(userSelection.client, "callentry_time_json", "schedule")}

-- ROLE
${arrayToJsonSqlQuery(userSelection.client, "callentry_people_json", "role")}

-- CLIENT
${arrayToJsonSqlQuery(userSelection.client, "callentry_operation_json", "client")}

-- QUEUE
${arrayToSqlQuery(userSelection.queue, "callentry_queue_id")}

-- SERVICE
${arrayToJsonSqlQuery(userSelection.service, "callentry_operation_json", "service")}

-- CAMPAIGN
${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}

-- BREAK
${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}

-- ASIGNACION
${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}


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
