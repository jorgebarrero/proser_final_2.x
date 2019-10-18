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

export async function callsAutomaticDailyReport(userSelection) {

  let result = {
    detail: [],
    total: []
  };

  let queryDetail = `
    ${query(userSelection)}
  `;


  try {
    result.detail = await pool.destiny.query(queryDetail);
  } catch (error) {
    result.detail = { errorDetail: error };
  }

  let queryTotal = `
    SELECT
      ${totalFields()}
    FROM
      (${query(userSelection)}) AS daily
    `;

  try {
    result.total = await pool.destiny.query(queryTotal);
  } catch (error) {
    result.total = { errorTotal: error };
  }

  return result;
}

function totalFields() {
  return `
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

  ,AVG(inboundServiceLevel) AS inboundServiceLevel

  ,AVG(inboundAttentionLevel) AS inboundAttentionLevel

  ,AVG(inboundAbandonLevel) AS inboundAbandonLevel

  ,SUM(operation_seconds) AS operation_seconds

  ,SEC_TO_TIME(SUM(operation_seconds)) AS operation_time

  ,SUM(wait_seconds) AS wait_seconds

  ,SEC_TO_TIME(SUM(wait_seconds)) AS wait_time

  ,AVG(inboundTmo) AS inboundTmo

  ,AVG(inboundAsa) AS inboundAsa`;
}

/*************************************************************** */

function detailFields() {
  return `
  now() AS now
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
  `;
}

/*************************************************************** */

function query(userSelection) {
  return `

SELECT

  ${detailFields()}

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
inv_queue_type = 'automatic'

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

GROUP BY
  callentry_date


-- ---------------------------------------------------------------
-- END
`;
}
