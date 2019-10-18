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

export async function callsOutboundDailyReport(userSelection){
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
    
    '' as day_name
    ,'' as week_day
    ,'' AS start_date
    ,'' AS start_time
    ,'' AS end_time
    ,SUM(outboundMade) as outboundMade
    ,SUM(outboundFail) as outboundFail
    ,SUM(outboundAnswered) as outboundAnswered
    ,SUM(outboundEffective) as outboundEffective
    ,SUM(outboundHungout) as outboundHungout
    ,SUM(outboundAnswered)/SUM(outboundMade) as outboundContactLevel
    ,SUM(outboundEffective)/SUM(outboundMade) as outboundEffectiveLevel
    ,SUM(operation_seconds) as operation_seconds
    ,SEC_TO_TIME(SUM(operation_seconds)) as operation_time
    ,SUM(operation_seconds)/SUM(outboundMade) as outboundTMO
    
    `;
}

/******************************************************* */
// DETAIL FIELDS
function detailFields() {
  return `
  now() as now

        ,DAYNAME(cdr_date) as day_name
        ,WEEKDAY(cdr_date) + ${process.env.MONDAY_CONFIG} as week_day
        ,DATE_FORMAT(cdr_calldate, "%Y-%m-%d") AS start_date
        ,MIN(DATE_FORMAT(cdr_calldate, '%H:%i:%s')) AS start_time
        ,MAX(DATE_FORMAT(cdr_calldate, '%H:%i:%s')) AS end_time
        ,SUM(cdr_call_made) AS outboundMade
        ,SUM(cdr_call_fail) AS outboundFail
        ,SUM(cdr_call_answered) AS outboundAnswered
        ,SUM(cdr_call_efective) AS outboundEffective
        ,SUM(cdr_call_hungout) AS outboundHungout
        ,SUM(cdr_call_answered)/SUM(cdr_call_made) AS outboundContactLevel
        ,SUM(cdr_call_efective)/SUM(cdr_call_made) AS outboundEffectiveLevel
        ,SUM(cdr_duration_sec) AS operation_seconds
        ,SEC_TO_TIME(SUM(cdr_duration_sec)) AS operation_time
        ,SUM(cdr_duration_sec)/SUM(cdr_call_made) as outboundTMO

  `;
}

/********************************************************* */
// MAIN QUERY
function query(userSelection) {
  return `

SELECT

  ${detailFields()}

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
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND cdr_call_made = 1
  AND cdr_call_type = 'outbound'

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

  

      GROUP BY
      cdr_date
`;
}
