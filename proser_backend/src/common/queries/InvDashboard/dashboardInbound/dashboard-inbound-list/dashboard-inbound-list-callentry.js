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
export async function dashboardInboundListCallEntry(dashboardSelection) {
  let result = null;
  let resume_error = false;
  let userSelection = dashboardSelection.userSelection;
  let modalView = dashboardSelection.modalView;

  let query = `

  -- dashboardInboundListCallEntryFunction --------------------
  -- FIELDS
  SELECT
  
    DATE_FORMAT(callentry_datetime_entry_queue, "%Y-%m-%d") as entry_queue_date
    ,TIME(callentry_datetime_entry_queue) as entry_queue_time
    ,callentry_callerid as callerid
    ,callentry_duration_sec_wait as wait_sec
    ,callentry_status as call_status
    ,SEC_TO_TIME(callentry_duration_sec) AS duration_time
    ,inv_agent_name as agent_name
    ,CONCAT(inv_queue_number, "-", inv_queue_name) as queue 
  
   -- ---------------------------------------------------------------
   -- TABLES & JOINS
   FROM
   
   MainCallEntry
   
   LEFT OUTER JOIN InvAgent
   ON callentry_agent_id = inv_agent_id
  
    
   LEFT OUTER JOIN InvQueue
   ON callentry_queue_id = inv_queue_id
   
   
   -- -----------------------------
   WHERE 1
   
   AND
   ${sqlModalView(modalView)}
   
   -- TIME AND DATE
   ${dateAndTimeSqlQuery(userSelection, "callentry_datetime_entry_queue")}
      
   -- AGENT
   ${arrayToSqlQuery(userSelection.agent, "callentry_agent_id")}
   
   -- SUPERVISOR
  ${arrayToJsonSqlQuery(
    userSelection.supervisor,
    "callentry_people_json",
    "supervisor"
  )}

  -- SCHEDULE
  ${arrayToJsonSqlQuery(
    userSelection.client,
    "callentry_time_json",
    "schedule"
  )}

  -- ROLE
  ${arrayToJsonSqlQuery(userSelection.client, "callentry_people_json", "role")}

  -- CLIENT
  ${arrayToJsonSqlQuery(
    userSelection.client,
    "callentry_operation_json",
    "client"
  )}

  -- QUEUE
  ${arrayToSqlQuery(userSelection.queue, "callentry_queue_id")}

  -- SERVICE
  ${arrayToJsonSqlQuery(
    userSelection.service,
    "callentry_operation_json",
    "service"
  )}
   
   -- CAMPAIGN
   ${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}
   
   -- BREAK
   ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
   
   -- ASIGNACION
   ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}

   ORDER BY callentry_datetime_entry_queue DESC
     
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

  if (modalView === "recibida") {
    return `
    (callentry_status = 'abandonada' OR callentry_status = 'terminada')
    `;
  } else if (modalView === "atendida") {
    return `
    callentry_status = 'terminada'
    `;
  } else if (modalView === "abandonada") {
    return `
    callentry_status = 'abandonada'
    `;
  } else if (modalView === "corta") {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME}
    `;
  } else if (modalView === "antes tiempo ideal") {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}
    `;
  } else if (modalView === "despues tiempo ideal") {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_duration_sec_wait > ${process.env.CDR_SERVICE_IDEAL_TIME}
    `;
  } else if (modalView === "colgada por agente") {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_hung_agent = 1
    `;
  }

  return result;
}
