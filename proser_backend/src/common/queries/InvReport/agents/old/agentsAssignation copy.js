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


async function agentsAssignationReport(userSelection){

  // if (userSelection.agent) {

  //   return agentsAuxiliarReportDetail(userSelection);
  // } else {


  let result = {
    detail: [],
    total: []
  };

  let queryDetail = `
  SELECT
      
       audit_agent_id as agent_id
      ,COUNT(audit_id) as times_registered
      ,inv_break_name as break_name
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
      ,SEC_TO_TIME(IF(audit_duration_sec is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init,now()))) as connection_time
      ,IF(audit_duration_sec is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init,now())) as connection_time_secs
      
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
        audit_break_id is not null
        AND
        inv_break_productivity = 1

        -- TIME AND DATE
        ${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}

        -- AGENT
        ${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}

        -- SUPERVISOR
        ${arrayToJsonSqlQuery(userSelection.supervisor, "hca_agent_people_json")}

        -- SCHEDULE
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_schedule_json")}

        -- ROLE
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_role_json")}

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

        -- PLANNED CLIENT


        -- PLANNED QUEUE


        -- PLANNED SERVICE


        -- PLANNED CAMPAIGN
      
	GROUP BY
  audit_agent_id

    `;


  try {
    result.detail = await pool.destiny.query(queryDetail);

  } catch (error) {
    result.detail = { errorDetail: error };
  }

  let queryTotal = `
    SELECT
	    SEC_TO_TIME(SUM(TIME_TO_SEC(connection_time_secs))) as total
    
      FROM
    (
      SELECT
      
       audit_agent_id as agent_id
      ,COUNT(audit_id) as times_registered
      ,inv_break_name as break_name
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
      ,SEC_TO_TIME(IF(audit_duration_sec is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init,now()))) as connection_time
      ,IF(audit_duration_sec is not null, audit_duration_sec, TIMESTAMPDIFF(second,audit_datetime_init,now())) as connection_time_secs
      
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
        audit_break_id is not null
        AND
        inv_break_productivity = 1

        -- TIME AND DATE
        ${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}

        -- AGENT
        ${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}

        -- SUPERVISOR
        ${arrayToJsonSqlQuery(userSelection.supervisor, "hca_agent_people_json")}

        -- SCHEDULE
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_schedule_json")}

        -- ROLE
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_role_json")}

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

        -- PLANNED CLIENT


        -- PLANNED QUEUE


        -- PLANNED SERVICE


        -- PLANNED CAMPAIGN
      
	GROUP BY
  audit_agent_id
    ) as detail
    
    `;

  try {
    result.total = await pool.destiny.query(queryTotal);
  } catch (error) {
    result.total = { errorTotal: error };
  }

  return result;
}



// async function agentsAssignationReportDetail(userSelection){


//   let result = {
//     detail: [],
//     modal: []
//   };

//   let queryDetail = `
//   SELECT
      
//   id_agent as id_inv_agentes
//   ,hca_agent_name as nombre_agentes
//   ,inv_agent_legal_id as doc_indent_agentes
//   ,inv_agent_internal_id as doc_complemtario_agentes
//   ,hca_agent_extension as numero_agentes
//   ,JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as hca_agent_supervisor_name as nombre_supervisor
//   ,hca_agent_schedule_name as agent_schedule_name
//   ,audit_break_name as nombre_auxiliares
//   ,COUNT(id_break) as ocasiones
//   ,MIN(audit_date) as min_date
//   ,MAX(audit_date) as max_date
//   ,MIN(DATE_FORMAT(datetime_init, '%H:%i:%s')) as hora_inicio
//   ,MAX(DATE_FORMAT(datetime_end_full, '%H:%i:%s')) as hora_final
//   ,SEC_TO_TIME(SUM(TIME_TO_SEC(duration_full))) as duracion_total
  

// FROM
//   (
//     SELECT
//       audit_id
//       , id_agent
//       , id_break
//       , datetime_init
//       , IF(datetime_end is not null, datetime_end, now() ) as datetime_end_full
//       , IF(duration IS not NULL, duration,

          
//         SEC_TO_TIME(TIMESTAMPDIFF(second,datetime_init,now()))


//       ) as duration_full
//       , ext_parked
//       , __TIME__
//       , audit_duration_sec
//       , audit_status
//       , audit_date_agent_id
//       , audit_date
//       , audit_break_name
//       , audit_break_class
//       , audit_break_productivity

//       from MainAudit
      
//       where
//       audit_break_productivity = 1

//   ) as MainAudit_full
//   LEFT OUTER JOIN HcaAgent
//   ON audit_date = hca_agent_date
//   AND id_agent = hca_agent_id

//   LEFT OUTER JOIN InvAgent
//   ON id_agent = inv_agent_id
  
//     WHERE
//       (audit_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}')
//       AND
//       id_break <> 0
//       AND
//       ${userSelection.agent}
      
// 	GROUP BY
// 		id_agent
      
//     `;


//   try {
//     result.detail = await pool.destiny.query(queryDetail);

//   } catch (error) {
//     result.detail = { errorDetail: error };
//   }

//   let queryModal = `
//      SELECT
//           DISTINCT(audit_id)
//           ,id_agent as agent_id
//           ,inv_agent_name as agent_name
//           ,inv_agent_legal_id as agent_legal_id
//           ,inv_agent_internal_id as agent_internal_id
//           ,hca_agent_extension as agent_extension
//           ,JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as hca_agent_supervisor_name as agent_supervisor_name
//           ,hca_agent_schedule_name as agent_schedule_name
//           ,audit_break_name as break_name
//           ,audit_date as date
//           ,DATE_FORMAT(datetime_init, '%H:%i:%s') as start_time
//           ,DATE_FORMAT(datetime_end_full, '%H:%i:%s') as end_time
//           ,TIME_TO_SEC(duration_full) as connection_time
//           ,duration_full as connection_time_secs
      
    
//     FROM
//       (
//         SELECT
//           audit_id
//           , id_agent
//           , id_break
//           , datetime_init
//           , IF(datetime_end is not null, datetime_end, now() ) as datetime_end_full
//           , IF(duration IS not NULL, duration,
    
              
//             SEC_TO_TIME(TIMESTAMPDIFF(second,datetime_init,now()))
    
    
//           ) as duration_full
//           , audit_duration_sec
//           , audit_status
//           , audit_date_agent_id
//           , audit_date
//           , audit_break_name
//           , audit_break_class
//           , audit_break_productivity
    
//           from MainAudit
          
//           where
//           audit_break_productivity = 1
    
//       ) as MainAudit_full
//       LEFT OUTER JOIN HcaAgent
//       ON audit_date = hca_agent_date
//       AND id_agent = hca_agent_id
    
//       LEFT OUTER JOIN InvAgent
//       ON id_agent = inv_agent_id
      
//         WHERE
//           (audit_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}')
//           AND
//           id_break <> 0
//           AND
//           ${userSelection.agent}
    
//         `;
    
    
//   try {
//     result.modal = await pool.destiny.query(queryModal);
    
//   } catch (error) {
//     result.modal = { errorModal: error };
//   }

//   return result;

// }



export { 
  agentsAssignationReport,
};
