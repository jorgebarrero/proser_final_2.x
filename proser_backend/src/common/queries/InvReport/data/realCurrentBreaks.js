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

export async function realCurrentBreaksReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "rcb_break_datetime_init")}

,rcb_break_audit_id, rcb_break_agent_id, rcb_break_id, rcb_break_datetime_init, rcb_break_datetime_end, rcb_break_duration, rcb_break_duration_sec, rcb_break_name, rcb_break_productivity, rcb_date, audit_operation_json, inv_agent_name ,JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as agent_supervisor_name

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

RealCurrentBreaks
LEFT OUTER JOIN InvAgent
ON rcb_break_agent_id = inv_agent_id

LEFT OUTER JOIN InvBreak
ON rcb_break_id = inv_break_id

LEFT OUTER JOIN HcaAgent
ON rcb_break_agent_id = hca_agent_id
AND rcb_date = hca_agent_date

LEFT OUTER JOIN MainAudit
ON rcb_break_audit_id = audit_id


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "rcb_break_datetime_init")}

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
