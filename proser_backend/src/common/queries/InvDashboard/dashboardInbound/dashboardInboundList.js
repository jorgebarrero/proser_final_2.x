// DASHBOARD INBOUND REPORT
/**********************************
 * Tip vscode:
 * ctrl+k & ctrl+0 to view collapsed - ctrl+k & ctrl+j to expand
 */

// IMPORTS
import * as pool from "../../../../connectors/pool";
import {
  objectDateToTextDate,
  valueFromObject
} from "../../../functions/dateFunctions";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../../functions/sqlFunctions";


/******************************************************************** */
// MAIN FUNCTION
export async function dashboardInboundList(userSelection) {
  let result = {};
  let resume_error = false;

  let dashboardInboundListReceived = await dashboardInboundListReceivedFunction(userSelection);
  let dashboardInboundListAttended = await dashboardInboundListAttendedFunction(userSelection);
  let dashboardInboundListAbandoned = await dashboardInboundListAbandonedFunction(userSelection);  
  let dashboardInboundListShort = await dashboardInboundListShortFunction(userSelection);
  let dashboardInboundListBeforeTime = await dashboardInboundListBeforeTimeFunction(userSelection);
  let dashboardInboundListHungAgent = await dashboardInboundListHungAgentFunction(userSelection);
  let dashboardInboundListActive = await dashboardInboundListActiveFunction(userSelection);
  let dashboardInboundListOnQueue = await dashboardInboundListOnQueueFunction(userSelection);
  let dashboardInboundListQueueResume = await dashboardInboundListQueueResumeFunction(userSelection);

  let dashboardInboundListAgentsPlanned = await dashboardInboundListAgentsPlannedFunction(userSelection);
  let dashboardInboundListAgentsConnected = await dashboardInboundListAgentsConnectedFunction(userSelection);
  let dashboardInboundListAgentsEffective = await dashboardInboundListAgentsEffectiveFunction(userSelection);
  let dashboardInboundListAgentsBusy = await dashboardInboundListAgentsBusyFunction(userSelection);
  let dashboardInboundListAgentsAvailable = await dashboardInboundListAgentsAvailableFunction(userSelection);
  let dashboardInboundListAgentsAssigned = await dashboardInboundListAgentsAssignedFunction(userSelection);
  let dashboardInboundListAgentsAuxiliar = await dashboardInboundListAgentsAuxiliarFunction(userSelection);
  let dashboardInboundListAgentsAuxiliarHistoric = await dashboardInboundListAgentsAuxiliarHistoricFunction(userSelection);
  let dashboardInboundListAgentsAssignationHistoric = await dashboardInboundListAgentsAssignationHistoricFunction(userSelection);
  

  result = {
    dashboardInboundListReceived,
    dashboardInboundListAttended,
    dashboardInboundListAbandoned,
    dashboardInboundListShort,
    dashboardInboundListBeforeTime,
    dashboardInboundListHungAgent,
    dashboardInboundListActive,
    dashboardInboundListOnQueue,
    dashboardInboundListQueueResume,
    dashboardInboundListAgentsPlanned,
    dashboardInboundListAgentsConnected,
    dashboardInboundListAgentsEffective,
    dashboardInboundListAgentsBusy,
    dashboardInboundListAgentsAvailable,
    dashboardInboundListAgentsAssigned,
    dashboardInboundListAgentsAuxiliar,
    dashboardInboundListAgentsAuxiliarHistoric,
    dashboardInboundListAgentsAssignationHistoric
  };

  return result;
}

/**************************************** */
// Calls Recieved List
async function dashboardInboundListReceivedFunction(userSelection) {
  let result = null;
  let resume_error = false;
  

  let query = `

  -- dashboardInboundListReceivedFunction --------------------
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
   (callentry_status = 'abandonada' OR callentry_status = 'terminada')
   
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

   ORDER BY entry_queue_date, entry_queue_time DESC
     
   -- END ---------------------------------------------------------------

  `;

  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


/**************************************** */
// Calls Attended List
async function dashboardInboundListAttendedFunction(userSelection) {
  let result = null;
  let resume_error = false;
    
  
  let query = `
  
    -- dashboardInboundListAttendedFunction --------------------
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
     callentry_status = 'terminada'
     
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
  
     ORDER BY entry_queue_date, entry_queue_time DESC
       
     -- END ---------------------------------------------------------------
  
    `;
  
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


/**************************************** */
// Calls Abandoned List
async function dashboardInboundListAbandonedFunction(userSelection) {
  let result = null;
  let resume_error = false;
      
    
  let query = `
    
      -- dashboardInboundListAbandonedFunction --------------------
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
    
       ORDER BY entry_queue_date, entry_queue_time DESC
         
       -- END ---------------------------------------------------------------
    
      `;
    
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


/**************************************** */
// Calls Short List
async function dashboardInboundListShortFunction(userSelection) {
  let result = null;
  let resume_error = false;
      
    
  let query = `
    
      -- dashboardInboundListShortFunction --------------------
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
       (callentry_status = 'terminada')
       AND
       callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME}
       
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
    
       ORDER BY entry_queue_date, entry_queue_time DESC
         
       -- END ---------------------------------------------------------------
    
      `;
    
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


/**************************************** */
// Calls Before TimeL List
async function dashboardInboundListBeforeTimeFunction(userSelection) {
  let result = null;
  let resume_error = false;
        
      
  let query = `
      
        -- dashboardInboundListBeforeTimeFunction --------------------
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
         (callentry_status = 'terminada')
         AND
         callentry_duration_sec <= ${process.env.CDR_SERVICE_IDEAL_TIME}
         
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
      
         ORDER BY entry_queue_date, entry_queue_time DESC
           
         -- END ---------------------------------------------------------------
      
        `;
      
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


/**************************************** */
// Calls Before TimeL List
async function dashboardInboundListHungAgentFunction(userSelection) {
  let result = null;
  let resume_error = false;
          
        
  let query = `
        
          -- dashboardInboundListHungAgentFunction --------------------
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
           callentry_hung_agent = 1
                      
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
        
           ORDER BY entry_queue_date, entry_queue_time DESC
             
           -- END ---------------------------------------------------------------
        
          `;
        
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


/**************************************** */
// Calls Active List
async function dashboardInboundListActiveFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
-- dashboardInboundListActiveFunction --------------
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


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

AND
   rcc_callentry_status = 'activa'

-- TIME AND DATE

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

ORDER BY entry_queue_date, entry_queue_time DESC

-- END -------------------------------------------------------
`;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Calls On-Queue List
async function dashboardInboundListOnQueueFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
-- dashboardInboundListOnQueueFunction --------------
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


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

AND
   rcc_callentry_status = 'en-cola'

-- TIME AND DATE

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

ORDER BY entry_queue_date, entry_queue_time DESC

-- END -------------------------------------------------------
`;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Calls Queue Resume List
async function dashboardInboundListQueueResumeFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let start_date = objectDateToTextDate(userSelection.start_date);
  

  let query = `

  -- dashboardInboundListQueueResumeFunction --------------------
  -- FIELDS
  SELECT
  
    callentry_queue_id AS queue_id
    ,inv_queue_number as queue_number
    ,inv_queue_name as queue_name
    ,'${start_date}' AS start_date_requested
    ,CURRENT_TIMESTAMP AS now
    ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
    AS inboundReceivedTotal

    ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)
      AS inboundAbandonedTotal

    ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)
      AS inboundAttendedTotal
    

    ,SUM(case when callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME} then 1 else 0 end)
      AS inboundShortTotal

    ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end)
      AS inboundBeforeTimeTotal

    ,SUM(case when callentry_hung_agent = 1 then 1 else 0 end)
      AS inboundHungAgentTotal

    ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end)/ SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' ) then 1 else 0 end) AS inboundServiceLevelTotal


    ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
    SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
    AS inboundAttentionLevelTotal
    
    ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
    SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
    AS inboundAbandonLevelTotal
    
    ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
    SUM(case when callentry_status = 'terminada' then 1 else 0 end)
    AS inboundAsaTotal
    
    ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
    SUM(case when callentry_status = 'terminada' then 1 else 0 end)
    AS inboundTmoTotal
  
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

   GROUP BY callentry_queue_id
     
   -- END ---------------------------------------------------------------

  `;

  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}


async function dashboardInboundListAgentsPlannedFunction(userSelection) {
  let result = [
    {
      now: "",
      agentsPlannedTotal: null
    }
  ];
  let resume_error = false;
  let query = `
  -- agentsPlannedTotalFunction ----------
-- FIELDS
SELECT

  'CONSTRUCCION' as agentsPlannedList

    FROM
        HcaAgent
       
        -- ---------------------------------------------------------------
        -- CONDITIONS
        WHERE 1
        
        -- TIME AND DATE
        ${dateAndTimeSqlQuery(userSelection, "hca_agent_date")}
        
        -- AGENT
        ${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}
        
        -- SUPERVISOR
        ${arrayToJsonSqlQuery(
    userSelection.supervisor,
    "hca_agent_people_json"
  )}
        
        -- SCHEDULE
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_schedule_json")}
        
        -- ROLE
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_role_json")}
        
        -- CLIENT
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_client_json")}
        
        -- QUEUE
        ${arrayToJsonSqlQuery(userSelection.queue, "hca_agent_queue_json")}
        
        -- SERVICE
        ${arrayToJsonSqlQuery(userSelection.service, "hca_agent_service_json")}
        
        -- CAMPAIGN
        ${arrayToSqlQuery(userSelection.campaign, "hca_agent_campaign_json")}
        
        -- BREAK
        -- ASIGNACION

        GROUP BY hca_agent_date
        -- END ----------------------------------------------------------
        `;


  try {
    let temp = await pool.destiny.query(query);
    return temp.length < 1 ? result : temp;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Agents Connected
async function dashboardInboundListAgentsConnectedFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
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
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rca_agent_status = 'Logueado'
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rca_people_json", "supervisor")}

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
  ${arrayToJsonSqlQuery(userSelection.campaign, "rca_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
  
  GROUP BY rca_agent_name
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Agents Effective
async function dashboardInboundListAgentsEffectiveFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,rca_agent_name as agent_name
  ,rca_group_name as group_name
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
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rca_agent_status = 'Logueado'
  AND
  (rca_group_name = 'Disponible' or rca_group_name = 'Ocupado')
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rca_people_json", "supervisor")}

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
  ${arrayToJsonSqlQuery(userSelection.campaign, "rca_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
  
  GROUP BY rca_agent_name
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Agents Busy
async function dashboardInboundListAgentsBusyFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,rca_agent_name as agent_name
  ,rca_group_name as group_name
  ,rca_agent_duration as duration
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
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rca_agent_status = 'Logueado'
  AND
  rca_group_name = 'Ocupado'
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rca_people_json", "supervisor")}

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
  ${arrayToJsonSqlQuery(userSelection.campaign, "rca_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
  
  GROUP BY rca_agent_name
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Agents Available
async function dashboardInboundListAgentsAvailableFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,rca_agent_name as agent_name
  ,rca_group_name as group_name
  ,rca_agent_duration as duration
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
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rca_agent_status = 'Logueado'
  AND
  rca_group_name = 'Disponible'
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rca_people_json", "supervisor")}

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
  ${arrayToJsonSqlQuery(userSelection.campaign, "rca_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
  
  GROUP BY rca_agent_name
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Agents Assigned
async function dashboardInboundListAgentsAssignedFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,rcb_break_agent_id as agent_id
  ,inv_agent_name as agent_name
  ,rcb_break_name as group_name
  ,rcb_break_duration as duration
  ,JSON_UNQUOTE(JSON_EXTRACT(rcb_people_json, "$.supervisor[0].name") ) as supervisor_name
  ,JSON_UNQUOTE(JSON_EXTRACT(rcb_time_json, "$.schedule[0].name") ) as schedule_name
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  RealCurrentBreaks
  LEFT OUTER JOIN InvAgent
  ON rcb_break_agent_id = inv_agent_id
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rcb_break_productivity = 1
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rcb_break_datetime_init")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rca_people_json", "supervisor")}

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
  ${arrayToJsonSqlQuery(userSelection.campaign, "rca_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
  
  GROUP BY inv_agent_name
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}



/**************************************** */
// Agents Auxiliar
async function dashboardInboundListAgentsAuxiliarFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,rcb_break_agent_id as agent_id
  ,inv_agent_name as agent_name
  ,rcb_break_name as group_name
  ,rcb_break_duration as duration
  ,JSON_UNQUOTE(JSON_EXTRACT(rcb_people_json, "$.supervisor[0].name") ) as supervisor_name
  ,JSON_UNQUOTE(JSON_EXTRACT(rcb_time_json, "$.schedule[0].name") ) as schedule_name
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  RealCurrentBreaks
  LEFT OUTER JOIN InvAgent
  ON rcb_break_agent_id = inv_agent_id
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rcb_break_productivity = 0
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rcb_break_datetime_init")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rcb_break_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rcb_people_json", "supervisor")}

  -- SCHEDULE
  ${arrayToJsonSqlQuery(userSelection.client, "rcb_time_json", "schedule")}

  -- ROLE
  ${arrayToJsonSqlQuery(userSelection.client, "rcb_people_json", "role")}

  -- CLIENT
  ${arrayToJsonSqlQuery(userSelection.client, "rcb_operation_json", "client")}

  -- QUEUE
  ${arrayToJsonSqlQuery(userSelection.queue, "rcb_operation_json", "queue")}

  -- SERVICE
  ${arrayToJsonSqlQuery(userSelection.service, "rcb_operation_json", "service")}

  -- CAMPAIGN
  ${arrayToJsonSqlQuery(userSelection.campaign, "rcb_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "rcb_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "rcb_break_id")}
  
  GROUP BY inv_agent_name
  
  -- END -----------------------------------------------------------
  `;
  
  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}


/**************************************** */
// Agents Auxiliar Historic
async function dashboardInboundListAgentsAuxiliarHistoricFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT

  -- TIME & NINTERVAL
now() as now

      ,inv_agent_name as agent_name
      ,inv_break_name as name
      ,inv_break_id as id
      ,COUNT(DISTINCT audit_agent_id) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

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

AND
inv_break_productivity = 0
AND
audit_break_id is not null

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

GROUP BY audit_agent_id
-- ---------------------------------------------------------------
-- END
`;


  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}



/**************************************** */
// Agents Assignation Historic
async function dashboardInboundListAgentsAssignationHistoricFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT

  -- TIME & NINTERVAL
now() as now

      ,inv_agent_name as agent_name
      ,inv_break_name as name
      ,inv_break_id as id
      ,COUNT(DISTINCT audit_agent_id) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

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

AND
inv_break_productivity = 1
AND
audit_break_id is not null

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

GROUP BY audit_agent_id
-- ---------------------------------------------------------------
-- END
`;


  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}