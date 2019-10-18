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

export async function realCurrentAgentsReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "rca_agent_datetime_login")}

,rca_audit_login_id, rca_audit_logout_id, rca_date, __AGENT__, rca_agent_id, rca_agent_name, rca_agent_datetime_login, rca_agent_datetime_logout, rca_agent_duration, rca_agent_duration_sec, rca_agent_status, __GROUP__, rca_group_id, rca_group_name, rca_subgroup_id, rca_subgroup_name, audit_operation_json,  inv_agent_name ,JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as agent_supervisor_name

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

RealCurrentAgents
LEFT OUTER JOIN InvAgent
ON rca_agent_id = inv_agent_id

LEFT OUTER JOIN HcaAgent
ON rca_agent_id = hca_agent_id
AND rca_date = hca_agent_date

LEFT OUTER JOIN MainAudit
ON rca_audit_login_id = audit_id

-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}

-- AGENT
${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}

-- SUPERVISOR
${arrayToJsonSqlQuery(userSelection.supervisor, "hca_agent_people_json")}

-- SCHEDULE
${arrayToJsonSqlQuery(userSelection.client, "hca_agent_schedule_json")}

-- ROLE
${arrayToJsonSqlQuery(userSelection.client, "hca_agent_role_json")}

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

-- PLANNED CLIENT


-- PLANNED QUEUE


-- PLANNED SERVICE


-- PLANNED CAMPAIGN


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
