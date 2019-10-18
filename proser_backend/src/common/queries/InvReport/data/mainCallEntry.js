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

export async function mainCallEntryReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "callentry_datetime_init")}

,callentry_id
,callentry_agent_id

,inv_agent_name
,inv_queue_number

,JSON_UNQUOTE(JSON_EXTRACT(callentry_people_json, "$.supervisor[0].name") ) as agent_supervisor_name

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
,callentry_queue_number
,__QUEUELOG__
,callentry_who_hung
,callentry_hung_agent
,callentry_hung_caller

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainCallEntry
LEFT OUTER JOIN InvAgent
ON callentry_agent_id = inv_agent_id

LEFT OUTER JOIN InvQueue
ON callentry_queue_id = inv_queue_id


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "callentry_datetime_init")}

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
