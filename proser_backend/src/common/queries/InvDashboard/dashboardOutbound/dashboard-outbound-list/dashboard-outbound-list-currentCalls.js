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
export async function dashboardOutboundListCurrentCallsFunction(DashboardSelection) {
  let result = null;
  let resume_error = false;
  let userSelection = DashboardSelection.userSelection;
  let modalView = DashboardSelection.modalView;

  let query = `

  -- dashboardOutboundListCallEntryFunction --------------------
  -- FIELDS
  SELECT
  
    DATE_FORMAT(rcc_callentry_datetime_entry_queue, "%Y-%m-%d") as entry_queue_date
    ,TIME(rcc_callentry_datetime_entry_queue) as entry_queue_time
    ,rcc_callentry_callerid as callerid
    ,rcc_callentry_duration_wait_sec as wait_sec
    ,rcc_callentry_status as call_status
    ,SEC_TO_TIME(rcc_callentry_duration_sec) AS duration_time
    ,inv_agent_name as agent_name
    ,JSON_UNQUOTE(JSON_EXTRACT(rcc_operation_json, "$[0].name") ) as queue
  
    -- ---------------------------------------------------------------
    -- TABLES & JOINS
    
    FROM
    
    RealCurrentCalls
    
    LEFT OUTER JOIN InvAgent
    ON rcc_callentry_agent_id = inv_agent_id
    
    LEFT OUTER JOIN InvQueue
    ON rcc_callentry_queue_id = inv_queue_id
   
   
   -- -----------------------------
   WHERE 1
   
   AND
   ${sqlModalView(modalView)}
   
   -- TIME AND DATE
   ${dateAndTimeSqlQuery(userSelection, "rcc_callentry_datetime_entry_queue")}

    -- AGENT
    ${arrayToSqlQuery(userSelection.agent, "inv_agent_id")}

    -- SUPERVISOR
    ${arrayToJsonSqlQuery(userSelection.supervisor, "inv_agent_people_json", "supervisor")}

    -- SCHEDULE
    ${arrayToJsonSqlQuery(userSelection.client, "inv_agent_time_json", "schedule")}

    -- ROLE
    ${arrayToJsonSqlQuery(userSelection.client, "inv_agent_people_json", "role")}

    -- CLIENT
    ${arrayToJsonSqlQuery(userSelection.client, "inv_agent_operation_json", "client")}

    -- QUEUE
    ${arrayToSqlQuery(userSelection.queue, "rcc_callentry_queue_id")}

    -- SERVICE
    ${arrayToJsonSqlQuery(userSelection.service, "inv_agent_operation_json", "service")}

    -- CAMPAIGN
    ${arrayToSqlQuery(userSelection.campaign, "rcc_callentry_campaign_id")}

    -- BREAK
    -- ASIGNACION

   ORDER BY rcc_callentry_datetime_entry_queue DESC
     
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

  
  if (modalView === "activa") {
    return `
    rcc_callentry_status = 'activa'
    `;
  } else if (modalView === "en-cola") {
    return `
    rcc_callentry_status = 'en-cola'
    `;
  }

  return result;
}