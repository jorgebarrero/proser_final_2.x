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

export async function agentsConnectionReport(userSelection) {
  let result = {
    total: [],
    detail: [],
    individual: []
  };

  // SQL DETAIL
  let queryDetail = query(userSelection, "detail");

  try {
    result.detail = await pool.destiny.query(queryDetail);
  } catch (error) {
    result.detail = { errorDetail: error };
  }

  // SQL GROUP
  let queryGroup =
    query(userSelection, "group") + "\n" + "GROUP BY audit_agent_id";

  try {
    result.group = await pool.destiny.query(queryGroup);
  } catch (error) {
    result.group = { errorDetail: error };
  }

  // SQL TOTAL
  let queryTotal = `

   SELECT
   ${totalFields(userSelection)}
   FROM

   (${query(userSelection, "group") +
     "\n" +
     "GROUP BY audit_agent_id"}) as detail

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

   '' as previous_day
  ,'' as connected
  ,COUNT(agent_id) as agent_id
  ,SUM(times_registered) as times_registered
  ,COUNT(agent_name) as agent_name
  ,COUNT(agent_legal_id) as agent_legal_id
  ,COUNT(agent_internal_id) as agent_internal_id
  ,COUNT(agent_extension) as agent_extension
  ,COUNT(agent_supervisor_name) as agent_supervisor_name
  ,COUNT(agent_schedule_name) as agent_schedule_name
  ,MIN(min_date) as min_date
  ,MAX(max_date) as max_date
  ,MIN(start_time) as start_time
  ,MAX(end_time) as end_time
  ,SEC_TO_TIME(SUM(connection_time_secs)) as connection_time
  ,SUM(connection_time_secs) as connection_time_secs

  `;
}

/******************************************************************** */
function groupFields() {
  return `

  'prev' as previous_day
  ,IF(COUNT(audit_datetime_init) <> COUNT(audit_datetime_end) , 'si-conectado', 'no-conectado') as connected
  ,audit_agent_id as agent_id
  ,COUNT(audit_id) as times_registered
  ,inv_agent_name as agent_name
  ,inv_agent_legal_id as agent_legal_id
  ,inv_agent_internal_id as agent_internal_id
  ,hca_agent_extension as agent_extension
  ,JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as hca_agent_supervisor_name as agent_supervisor_name
  ,hca_agent_schedule_name as agent_schedule_name
  ,DATE(audit_datetime_init) as min_date
  ,DATE(IF(audit_datetime_end is null, now(), audit_datetime_end)) as max_date
  ,TIME(audit_datetime_init) as start_time
  ,TIME(IF(audit_datetime_end is null, now(), audit_datetime_end)) as end_time
  ,SEC_TO_TIME(IF(audit_duration_sec is not null, SUM(audit_duration_sec), SUM(TIMESTAMPDIFF(second,audit_datetime_init,now())))) as connection_time
  ,IF(audit_duration_sec is not null, SUM(audit_duration_sec), SUM(TIMESTAMPDIFF(second,audit_datetime_init,now()))) as connection_time_secs
  `;
}

/******************************************************************** */
function detailFields() {
  return `
  IF(DATE(audit_datetime_init) = DATE(audit_datetime_end) OR audit_datetime_init is null, 'no-previo', 'si-previo') as previous_day
  ,IF(audit_datetime_end is null, 'si-conectado', 'no-conectado') as connected
  ,audit_agent_id as agent_id
  ,'' as times_registered
  ,inv_agent_name as agent_name
  ,inv_agent_legal_id as agent_legal_id
  ,inv_agent_internal_id as agent_internal_id
  ,hca_agent_extension as agent_extension
  ,JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as hca_agent_supervisor_name as agent_supervisor_name
  ,hca_agent_schedule_name as agent_schedule_name
  ,audit_datetime_init as min_date
  ,audit_datetime_end as max_date
  ,TIME(audit_datetime_init) as start_time
  ,TIME(IF(audit_datetime_end is null, now(), audit_datetime_end)) as end_time
  ,SEC_TO_TIME(IF(audit_duration_sec is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init,now()))) as connection_time
  ,IF(audit_duration_sec is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init,now())) as connection_time_secs
  `;
}

function query(userSelection, option) {
  let fields = detailFields(userSelection);

  if (option === "group") {
    fields = groupFields(userSelection);
  }

  return `

    SELECT
      
        ${fields}
      
      -- ---------------------------------------------------------------
-- TABLES & JOINS

        FROM

        MainAudit
        LEFT OUTER JOIN InvAgent
        ON audit_agent_id = inv_agent_id

        LEFT OUTER JOIN InvBreak
        ON audit_break_id = inv_break_id

        LEFT OUTER JOIN HcaAgent
        ON audit_agent_id = hca_agent_id
        AND audit_date = hca_agent_date

        -- ---------------------------------------------------------------
        -- CONDITIONS
        WHERE 1

        AND
        audit_break_id is null

        -- TIME AND DATE
        ${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}

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
        ${arrayToJsonSqlQuery(
    userSelection.client,
    "audit_operation_json",
    "client"
  )}

        -- QUEUE
        ${arrayToJsonSqlQuery(userSelection.queue, "audit_operation_json", "queue")}

        -- SERVICE
        ${arrayToJsonSqlQuery(
    userSelection.service,
    "audit_operation_json",
    "service"
  )}

        -- CAMPAIGN
        ${arrayToJsonSqlQuery(
    userSelection.campaign,
    "audit_operation_json",
    "campaign"
  )}

        -- BREAK
        ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}

        -- ASIGNACION
        ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}

        -- PLANNED CLIENT


        -- PLANNED QUEUE


        -- PLANNED SERVICE


        -- PLANNED CAMPAIGN

    `;
}
