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

export async function mainAuditReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "audit_datetime_init")}

,audit_id
,audit_agent_id

,audit_break_id
,audit_datetime_init
,audit_datetime_end
,audit_duration
,audit_duration_sec
,audit_status
,audit_date
,audit_operation_json


,JSON_VALUE(JSON_EXTRACT(inv_agent_people_json, "$[*].name"), "$[*]") AS supervisor
,JSON_VALUE(JSON_EXTRACT(inv_agent_time_json, "$[*].name"), "$[*]") AS schedule
,JSON_VALUE(JSON_EXTRACT(inv_agent_people_json, "$[*].name"), "$[*]") AS role

,JSON_VALUE(JSON_EXTRACT(audit_operation_json, "$.client[*].name"), "$[*]") AS client
,JSON_VALUE(JSON_EXTRACT(audit_operation_json, "$.queue[*].name"), "$[*]") AS queue
,JSON_VALUE(JSON_EXTRACT(audit_operation_json, "$.service[*].name"), "$[*]") AS service
,JSON_VALUE(JSON_EXTRACT(audit_operation_json, "$.campaign[*].name"), "$[*]") AS campaign

,inv_agent_name
,IF(audit_break_id IS NULL, 'LOGIN/LOGOUT', inv_break_name) AS inv_break_name

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainAudit
LEFT OUTER JOIN InvAgent
ON audit_agent_id = inv_agent_id

LEFT OUTER JOIN InvBreak
ON audit_break_id = inv_break_id


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}

-- AGENT
${arrayToSqlQuery(userSelection.agent, "audit_agent_id")}

-- SUPERVISOR
${arrayToJsonSqlQuery(userSelection.supervisor, "audit_people_json", "supervisor")}

-- SCHEDULE
${arrayToJsonSqlQuery(userSelection.client, "audit_time_json", "schedule")}

-- ROLE
${arrayToJsonSqlQuery(userSelection.client, "audit_people_json", "role")}


-- CLIENT
${arrayToJsonSqlQuery(userSelection.client, "audit_operation_json", "client")}

-- QUEUE
${arrayToJsonSqlQuery(userSelection.queue, "audit_operation_json", "queue")}

-- SERVICE
${arrayToJsonSqlQuery(userSelection.service, "audit_operation_json", "service")}

-- CAMPAIGN
${arrayToJsonSqlQuery(userSelection.campaign, "audit_operation_json", "campaign")}

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
