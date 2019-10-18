import * as pool from "../../../../connectors/pool";

// import userSelectionFilters from "../../InvMenu/userSelection/userSelectionFilters";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery,
  arrayToSqlQueryOr
} from "../../../functions/sqlFunctions";

/******************************************************************** */

export async function agentsConnectionReport(userSelection) {
  let result = {
    total: [],
    group: [],
    detail: []
  };

  // SQL DETAIL ******************************************************
  let queryDetail = query(userSelection);
  
  try {
    result.detail = await pool.destiny.query(queryDetail);
  } catch (error) {
    result.detail = { errorDetail: error };
  }

  // SQL GROUP ******************************************************
  let queryGroup = `

  SELECT
  ${groupFields(userSelection)}
  FROM
  (${query(userSelection)}) as detail
  
  GROUP BY agent_id
   `;

  try {
    result.group = await pool.destiny.query(queryGroup);
  } catch (error) {
    result.group = { errorDetail: error };
  }

  // SQL TOTAL ******************************************************
  let queryTotal = `

   SELECT
   ${totalFields(userSelection)}
   FROM
   (${query(userSelection)}) as detail
    `;

  try {
    result.total = await pool.destiny.query(queryTotal);
  } catch (error) {
    result.total = { errorTotal: error };
  }

  return result;
}

/******************************************************************** */
function totalFields() {
  return `

  NOW() as now
  ,'' as record_id
  ,'' as previous_day
  ,'' as connected
  ,SUM(connected_num) as connected_num
  ,COUNT(agent_id) as agent_id
  ,SUM(times_registered) as times_registered
  ,'' as agent_name
  ,'' as agent_legal_id
  ,'' as agent_internal_id
  ,'' as agent_extension
  ,'' as agent_supervisor_name
  ,'' as agent_schedule_name
  ,COUNT(datetime_init) as datetime_init
  ,COUNT(datetime_end) as datetime_end
  ,MIN(min_date) as min_date
  ,MAX(max_date) as max_date
  ,MIN(start_time) as start_time
  ,MAX(end_time) as end_time
  ,SEC_TO_TIME(SUM(duration_time_secs)) as duration_time
  ,SUM(duration_time_secs) as duration_time_secs

  `;
}

/******************************************************************** */
function groupFields() {
  return `
  NOW() as now
  ,'' as record_id
  ,'' as previous_day
  ,IF(SUM(connected_num) > 0 , 'si-conectado', 'no-conectado') as connected
  ,SUM(connected_num) as connected_num
  ,(agent_id) as agent_id
  ,SUM(times_registered) as times_registered
  ,(agent_name) as agent_name
  ,(agent_legal_id) as agent_legal_id
  ,(agent_internal_id) as agent_internal_id
  ,(agent_extension) as agent_extension
  ,(agent_supervisor_name) as agent_supervisor_name
  ,(agent_schedule_name) as agent_schedule_name
  ,COUNT(datetime_init) as datetime_init
  ,COUNT(datetime_end) as datetime_end
  ,MIN(min_date) as min_date
  ,MAX(max_date) as max_date
  ,MIN(start_time) as start_time
  ,MAX(end_time) as end_time
  ,SEC_TO_TIME(SUM(duration_time_secs)) as duration_time
  ,SUM(duration_time_secs) as duration_time_secs
  `;
}

/******************************************************************** */
function detailFields() {
  return `

  NOW() as now
  ,audit_id as record_id
  ,IF(DATE(audit_datetime_init) = DATE(audit_datetime_end) OR audit_datetime_init is null, 'no-previo', 'si-previo') as previous_day

  ,IF(audit_datetime_end is null, 'si-conectado', 'no-conectado') as connected
  ,IF(audit_datetime_end is null, 1, 0) as connected_num

  ,audit_agent_id as agent_id
  ,1 as times_registered
  ,inv_agent_name as agent_name
  ,inv_agent_legal_id as agent_legal_id
  ,inv_agent_internal_id as agent_internal_id

  ,inv_agent_extension as agent_extension
  ,JSON_UNQUOTE(JSON_EXTRACT(audit_people_json, "$supervisor[0].name") ) as agent_supervisor_name
  ,JSON_UNQUOTE(JSON_EXTRACT(audit_time_json, "$schedule[0].name") ) as agent_schedule_name

  ,audit_datetime_init as datetime_init

  ,IF(audit_datetime_end is not null, audit_datetime_end, NOW() ) as datetime_end

  ,audit_datetime_init as min_date
  ,IF(audit_datetime_end is not null, audit_datetime_end, NOW() ) as max_date

  
  ,TIME(audit_datetime_init) as start_time
  ,TIME(IF(audit_datetime_end is null, now(), audit_datetime_end)) as end_time
  
  ,SEC_TO_TIME(IF(audit_datetime_end is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init, now()))) as duration_time

  ,IF(audit_datetime_end is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init, now())) as duration_time_secs
  `;
}

/***************************************************************************************** */

function query(userSelection, option) {
  let fields = detailFields(userSelection);

  if (option === "group") {
    fields = groupFields(userSelection);
  }

  return `

    SELECT
      
        ${detailFields(userSelection)}
      
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
        audit_break_id is null

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

    `;
}
