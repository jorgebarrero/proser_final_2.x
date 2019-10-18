// DASHBOARD INBOUND CALL ENTRY
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
export async function dashboardOutboundListCdrFunction(DashboardSelection) {
  let result = null;
  let resume_error = false;
  let userSelection = DashboardSelection.userSelection;
  let modalView = DashboardSelection.modalView;

  let query = `

  -- dashboardOutboundListCdrFunction --------------------
  -- FIELDS
  SELECT
  
    DATE_FORMAT(cdr_calldate, "%Y-%m-%d") as call_date
    ,TIME(cdr_calldate) as call_time
    ,inv_agent_name as agent_name
    ,cdr_dst as destiny_number
    ,cdr_duration_sec as duration_sec
    ,SEC_TO_TIME(cdr_duration_sec) AS duration_time
    ,cdr_billsec_sec as billsec_sec
    ,SEC_TO_TIME(cdr_billsec_sec) AS billsec_time
    ,IF(cdr_call_fail = 1, 'Fallida',
      IF(cdr_call_answered = 1, 'Contestada', 
        IF(cdr_call_efective = 1, 'Efectiva', null))) as call_status
  
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
   
   
   -- -----------------------------
   WHERE 1
   
   AND 
   cdr_call_type = 'outbound'

   AND
   ${sqlModalView(modalView)}
   
   -- TIME AND DATE
    ${dateAndTimeSqlQuery(userSelection, "cdr_calldate")}

    -- AGENT
    ${arrayToSqlQuery(userSelection.agent, "cdr_agent_id")}

    -- SUPERVISOR
    ${arrayToJsonSqlQuery(userSelection.supervisor, "cdr_people_json", "supervisor")}

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

    ORDER BY cdr_calldate DESC
     
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

  
  if (modalView === 'saliente-realizada') {
    return `
    cdr_call_made = 1
    `;
  } else if (modalView === 'saliente-fallida') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_fail = 1
    `;
  } else if (modalView === 'saliente-contestada') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_answered = 1
    `;
  } else if (modalView === 'saliente-efectiva') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_efective = 1
    `;
  } else if (modalView === 'saliente-colgada') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_hungout = 1
    `;
  } else if (modalView === null) {
    return `1`;
  }

  return result;
}