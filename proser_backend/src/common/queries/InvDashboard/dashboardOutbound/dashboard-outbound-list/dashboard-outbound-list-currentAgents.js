// DASHBOARD INBOUND CURRENT CALLS
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
export async function dashboardOutboundListCurrentAgentsFunction(DashboardSelection) {
  let result = null;
  let resume_error = false;
  let userSelection = DashboardSelection.userSelection;
  let modalView = DashboardSelection.modalView;

  let query = `

  -- dashboardInboundListCurrentAgents --------------------
  -- FIELDS
  SELECT
  
  now() as now
      
  ,rca_agent_name as agent_name
  ,rca_group_name as group_name
  ,rca_subgroup_name as subgroup_name
  ,JSON_UNQUOTE(JSON_EXTRACT(rca_people_json, "$.supervisor[0].name") ) as supervisor_name
  ,JSON_UNQUOTE(JSON_EXTRACT(rca_time_json, "$.schedule[0].name") ) as schedule_name
  
    -- ---------------------------------------------------------------
    -- TABLES & JOINS
    
    FROM
    
    RealCurrentAgents
    LEFT OUTER JOIN InvAgent
    ON rca_agent_id = inv_agent_id
    
    LEFT OUTER JOIN MainAudit
    ON rca_audit_login_id = audit_id
   
   
   -- -----------------------------
   WHERE 1
   
   AND
   ${sqlModalView(modalView)}
   
   -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(
    userSelection.supervisor,
    "rca_people_json",
    "supervisor"
  )}

  -- SCHEDULE
  ${arrayToJsonSqlQuery(userSelection.client, "rca_time_json", "schedule")}

  -- ROLE
  ${arrayToJsonSqlQuery(userSelection.client, "rca_people_json", "role")}

  -- CLIENT
  ${arrayToJsonSqlQuery(userSelection.client, "rca_operation_json", "client")}

  -- QUEUE
  ${arrayToJsonSqlQuery(userSelection.queue, "rca_operation_json", "queue")}

  -- SERVICE
  ${arrayToJsonSqlQuery(userSelection.service, "rca_operation_json", "service")}

  -- CAMPAIGN
  ${arrayToJsonSqlQuery(
    userSelection.campaign,
    "rca_operation_json",
    "campaign"
  )}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}

  GROUP BY rca_agent_name
     
   -- END ---------------------------------------------------------------

  `;

  // console.log(query);
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

  if (modalView === "efectivo") {
    return `
    rca_agent_status = 'Logueado' AND
    (rca_group_name = 'Disponible' or rca_group_name = 'Ocupado')
    `;
  } else if (modalView === "ocupado") {
    return `
    rca_agent_status = 'Logueado' AND
    (rca_group_name = 'Ocupado')
    `;
  } else if (modalView === "disponible") {
    return `
    rca_agent_status = 'Logueado' AND
    (rca_group_name = 'Disponible')
    `;
  } else if (modalView === "auxiliar") {
    return `
    rca_agent_status = 'Logueado' AND
    rca_group_name = 'Auxiliar'
    `;
  } else if (modalView === "logueado") {
    return `
    rca_agent_status = 'Logueado'
    `;
  } else if (modalView === "conectado") {
    return `
    rca_agent_status = 'Logueado'
    `;
  }

  return result;
}