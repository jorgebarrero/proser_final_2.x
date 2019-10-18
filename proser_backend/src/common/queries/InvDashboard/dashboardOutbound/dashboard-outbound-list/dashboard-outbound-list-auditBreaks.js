// DASHBOARD INBOUND CALL ENTRY LIST
/**********************************
 * Tip vscode:
 * ctrl+k & ctrl+0 to view collapsed - ctrl+k & ctrl+j to expand
 */

// IMPORTS
import * as pool from "../../../../../connectors/pool";
import {
  objectDateToTextDate,
  valueFromObject
} from "../../../../functions/dateFunctions";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../../../functions/sqlFunctions";

/**************************************** */
// Call Entry List
export async function dashboardOutboundListAuditBreaks(DashboardSelection) {
  let result = null;
  let resume_error = false;
  let userSelection = DashboardSelection.userSelection;
  let modalView = DashboardSelection.modalView;

  let query = `

  -- dashboardOutboundListAuditFunction --------------------
  -- FIELDS
  SELECT
  
  now() as now

  ,COUNT(audit_break_id) as value
  ,inv_agent_name as agent_name
  ,inv_break_name as name
  ,inv_break_id as id
  ,SEC_TO_TIME(IF(audit_datetime_end is not null, SUM(audit_duration_sec), TIMESTAMPDIFF(second,audit_datetime_init, now()))) AS duration

-- ---------------------------------------------------------------
-- TABLES & JOINS

    FROM

    MainAudit
    LEFT OUTER JOIN InvAgent
    ON audit_agent_id = inv_agent_id

    LEFT OUTER JOIN InvBreak
    ON audit_break_id = inv_break_id
   
   
   -- -----------------------------
   WHERE 1
   
   AND
   ${sqlModalView(modalView)}
   
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

    GROUP BY audit_id
    ORDER BY inv_agent_name
     
   -- END ---------------------------------------------------------------

  `;

  console.log(query);
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}

export function sqlModalView(modalView) {
  /*
   * Inserts interval fields in the select statment when interval applies
   */
  let result = null;

  if (modalView === 'auxiliar-historico') {
    return `
    inv_break_productivity = 0
    AND
    audit_break_id is not null
    `;
  } else if (modalView === 'asignado-historico') {
    return `
    inv_break_productivity = 1
    AND
    audit_break_id is not null
    `;
  }

  return result;
}