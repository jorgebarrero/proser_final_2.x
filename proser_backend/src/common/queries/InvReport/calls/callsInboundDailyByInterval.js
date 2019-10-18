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

export async function callsInboundDailyByIntervalReport(userSelection) {
  // DEFINE VARIABLES
  let result = {
    detail: [],
    total: []
  };

  /* DETAIL ********************************* */
  let queryDetail = query(userSelection);

  try {
    result.detail = await pool.destiny.query(queryDetail);
  } catch (error) {
    result.detail = { errorDetail: error };
  }

  /* TOTAL ********************************* */
  let queryTotal = `
    SELECT
      now() AS now
    ,'' as day_name
    ,'' as week_day

    ,'' AS start_date
    ,'' AS start_time
    ,'' AS end_time

    ,${process.env.CDR_SERVICE_IDEAL_TIME} AS idealResponseTime

    ,SUM(inboundReceived) AS inboundReceived

    ,SUM(inboundAbandoned) AS inboundAbandoned

    ,SUM(inboundAttended) AS inboundAttended

    ,SUM(inboundShort) AS inboundShort

    ,SUM(inboundBeforeTime) AS inboundBeforeTime

    ,SUM(inboundAfterTime) AS inboundAfterTime

    ,SUM(inboundHungAgent) AS inboundHungAgent

    ,SUM(inboundBeforeTime)/SUM(inboundReceived) AS inboundServiceLevel

    ,SUM(inboundAttended)/SUM(inboundReceived) AS inboundAttentionLevel

    ,SUM(inboundAbandoned)/SUM(inboundReceived) AS inboundAbandonLevel

    ,SUM(operation_seconds) AS operation_seconds

    ,SEC_TO_TIME(SUM(operation_seconds)) AS operation_time

    ,SUM(wait_seconds) AS wait_seconds

    ,SEC_TO_TIME(SUM(wait_seconds)) AS wait_time

    ,SUM(operation_seconds)/SUM(inboundAttended) AS inboundTmo

    ,SUM(wait_time_recieve)/SUM(inboundAttended) AS inboundAsa

    FROM
        (
          
          ${query(userSelection)}  ) AS daily
    
    `;

  try {
    result.total = await pool.destiny.query(queryTotal);
  } catch (error) {
    result.total = { errorTotal: error };
  }

  return result;
}

// MAIN QUERY
function query(userSelection) {
  return `

-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

now() AS now
,${sqlIntervalSqlQuery(userSelection, "callentry_datetime_entry_queue")}

  ,DAYNAME(callentry_date) as day_name
  ,WEEKDAY(callentry_date) + ${process.env.MONDAY_CONFIG} as week_day

  ,DATE_FORMAT(callentry_date, "%Y-%m-%d") AS start_date
  
  ,MIN(DATE_FORMAT(callentry_datetime_init, '%H:%i:%s')) AS start_time
  
  ,MAX(DATE_FORMAT(callentry_datetime_end, '%H:%i:%s')) AS end_time
  
  ,${process.env.CDR_SERVICE_IDEAL_TIME} AS idealResponseTime
  ,${process.env.CDR_SHORTCALL_TIME} AS shortTimeDef
  
  ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS inboundReceived
  
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end) AS inboundAbandoned
  
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS inboundAttended
  
  ,SUM(case when callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME} then 1 else 0 end) AS inboundShort
  
  ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end) AS inboundBeforeTime

  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) - SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end) AS inboundAfterTime
  
  ,SUM(callentry_hung_agent) AS inboundHungAgent
  
  ,SUM(case when (callentry_status = 'terminada' AND callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}) then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS inboundServiceLevel
  
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS inboundAttentionLevel
  
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS inboundAbandonLevel
  
  ,SUM(callentry_duration_sec) AS operation_seconds
  
  ,SEC_TO_TIME(SUM(callentry_duration_sec)) AS operation_time
  
  ,SUM(callentry_duration_sec_wait) AS wait_seconds
  
  ,SEC_TO_TIME(SUM(callentry_duration_sec_wait)) AS wait_time
  
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS inboundTmo
  
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS inboundAsa

   ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end) as wait_time_recieve

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
 inv_queue_type = 'inbound'
 
 -- TIME AND DATE
 ${dateAndTimeSqlQuery(userSelection, "callentry_datetime_entry_queue")}
 AND callentry_date is not null
 
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
}
