import * as pool from "../../../../connectors/pool";


import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../../functions/sqlFunctions";

/******************************************************************** */

export async function callsWaitTimeReport(userSelection) {
  // DEFINE VARIABLES
  let result = {
    total: [],
    detail: []
  };

  /* DETAIL ********************************* */
  let queryDetail = `
    ${query(userSelection)}
  `;

  try {
    result.detail = await pool.destiny.query(queryDetail);
  } catch (error) {
    result.detail = { errorDetail: error };
  }

  /* TOTAL ********************************* */
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

// TOTAL FIELDS
function totalFields() {
  return `
  now() AS now
  ,'' as day_name
  ,'' as week_day

  ,'' AS start_date
  ,'' AS start_time
  ,'' AS end_time
  
  ,SUM(beforeIdealTime) AS beforeIdealTime

  ,SUM(inboundAttended) AS inboundAttended

  ,SUM(afterFive) AS afterFive

  ,SUM(afterTen) AS afterTen

  ,SUM(afterFifteen) AS afterFifteen

  ,SUM(afterTwenty) AS afterTwenty

  ,SUM(afterTwentyfive) AS afterTwentyfive

  ,SUM(afterThirty) AS afterThirty

  ,SUM(afterSixty) AS afterSixty

  ,SUM(afterTwoMinutes) AS afterTwoMinutes

  ,SUM(afterThreeMinutes) AS afterThreeMinutes

  ,SUM(afterFourMinutes) AS afterFourMinutes

  ,SUM(afterMoreFourMinutes) AS afterMoreFourMinutes 

  `;
}

/******************************************************* */
// DETAIL FIELDS
function detailFields(userSelection) {
  return `
  now() AS now
  ,${sqlIntervalSqlQuery(userSelection, "callentry_datetime_entry_queue")}
  ,DAYNAME(callentry_date) as day_name
  ,WEEKDAY(callentry_date) + ${process.env.MONDAY_CONFIG} as week_day

  ,DATE_FORMAT(callentry_date, "%Y-%m-%d") AS start_date
  
,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}) then 1 else 0 end) as beforeIdealTime
,SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS inboundAttended
,SUM(case when (callentry_duration_sec_wait > 0 AND callentry_duration_sec_wait <= 5) then 1 else 0 end) as afterFive
,SUM(case when (callentry_duration_sec_wait > 6 AND callentry_duration_sec_wait <= 10) then 1 else 0 end) as afterTen
,SUM(case when (callentry_duration_sec_wait > 11 AND callentry_duration_sec_wait <= 15) then 1 else 0 end) as afterFifteen
,SUM(case when (callentry_duration_sec_wait > 16 AND callentry_duration_sec_wait <= 20) then 1 else 0 end) as afterTwenty
,SUM(case when (callentry_duration_sec_wait > 21 AND callentry_duration_sec_wait <= 25) then 1 else 0 end) as afterTwentyfive
,SUM(case when (callentry_duration_sec_wait > 26 AND callentry_duration_sec_wait <= 30) then 1 else 0 end) as afterThirty
,SUM(case when (callentry_duration_sec_wait > 31 AND callentry_duration_sec_wait <= 60) then 1 else 0 end) as afterSixty
,SUM(case when (callentry_duration_sec_wait > 61 AND callentry_duration_sec_wait <= 120) then 1 else 0 end) as afterTwoMinutes
,SUM(case when (callentry_duration_sec_wait > 121 AND callentry_duration_sec_wait <= 180) then 1 else 0 end) as afterThreeMinutes
,SUM(case when (callentry_duration_sec_wait > 181 AND callentry_duration_sec_wait <= 240) then 1 else 0 end) as afterFourMinutes
,SUM(case when (callentry_duration_sec_wait > 241) then 1 else 0 end) as afterMoreFourMinutes

  `;
}

/********************************************************* */
// MAIN QUERY
function query(userSelection) {
  return `

SELECT

  ${detailFields(userSelection)}

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
AND
inv_queue_type = 'Inbound'

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
