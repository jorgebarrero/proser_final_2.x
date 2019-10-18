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

async function callsInboundDailyReport(userSelection) {

  let result = {
    detail: [],
    total: []
  };

  let queryDetail = `

  -- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
  
  ,callentry_date AS fecha_desde

  ,MIN(DATE_FORMAT(callentry_datetime_init, '%H:%i:%s')) AS hora_inicio
  ,MAX(DATE_FORMAT(callentry_datetime_end, '%H:%i:%s')) AS hora_final
  ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS llamadas_recibidas
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end) AS llamadas_abandonadas
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS llamadas_atendidas
  ,SUM(case when callentry_duration_sec <= ${
  process.env.CDR_SHORTCALL_TIME
} then 1 else 0 end) AS llamadas_cortas
  ,SUM(case when (callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} AND callentry_status = 'terminada')then 1 else 0 end) AS llamadas_antes_de_20
  ,SUM(callentry_hung_agent) AS llamadas_colgadas
  ,SUM(case when callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS nivel_servicios
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS nivel_atencion
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS nivel_abandono
  ,SUM(callentry_duration_sec) AS segundos_operacion
  ,SEC_TO_TIME(SUM(callentry_duration_sec)) AS tiempo_operacion
  ,SUM(callentry_duration_sec_wait) AS segundos_espera
  ,SEC_TO_TIME(SUM(callentry_duration_sec_wait)) as tiempo_espera
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) as tmo
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) as asa

  -- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainCallEntry
LEFT OUTER JOIN InvAgent
ON callentry_agent_id = inv_agent_id

LEFT OUTER JOIN HcaAgent
ON callentry_agent_id = hca_agent_id
AND callentry_date = hca_agent_date

LEFT OUTER JOIN InvQueue
ON callentry_queue_id = inv_queue_id

LEFT OUTER JOIN HcaQueue
ON callentry_agent_id = hca_queue_id
AND callentry_date = hca_queue_date

LEFT OUTER JOIN MainAudit
ON callentry_agent_id = audit_agent_id
AND callentry_date = audit_date

-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "callentry_datetime_init")}

-- AGENT
${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}

-- SUPERVISOR
${arrayToJsonSqlQuery(userSelection.supervisor, "hca_agent_people_json")}

-- SCHEDULE
${arrayToJsonSqlQuery(userSelection.client, "hca_agent_schedule_json")}

-- ROLE
${arrayToJsonSqlQuery(userSelection.client, "hca_agent_role_json")}

-- CLIENT
${arrayToJsonSqlQuery(userSelection.client, "hca_queue_client_json")}

-- QUEUE
${arrayToSqlQuery(userSelection.queue, "callentry_queue_id")}

-- SERVICE
${arrayToJsonSqlQuery(userSelection.service, "hca_queue_service_json")}

-- CAMPAIGN
${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}

-- BREAK
${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}

-- ASIGNACION
${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}

-- PLANNED CLIENT


-- PLANNED QUEUE


-- PLANNED SERVICE


-- PLANNED CAMPAIGN

GROUP BY
    callentry_date


-- ---------------------------------------------------------------
-- END
`;


  try {
    result.detail = await pool.destiny.query(queryDetail);
  } catch (error) {
    result.detail = { errorDetail: error };
  }

  let queryTotal = `
    SELECT
         ${process.env.CDR_SERVICE_IDEAL_TIME} AS idealTime
        ,SUM(llamadas_recibidas) as llamadas_recibidas_total
        ,SUM(llamadas_abandonadas) as llamadas_abandonadas_total
        ,SUM(llamadas_atendidas) as llamadas_atendidas_total
        ,SUM(llamadas_cortas) as llamadas_cortas_total
        ,SUM(llamadas_antes_de_20) as llamadas_antes_de_20_total
        ,SUM(llamadas_colgadas) as llamadas_colgadas_total
        ,AVG(nivel_servicios) as nivel_servicios_total
        ,AVG(nivel_atencion) as nivel_atencion_total
        ,AVG(nivel_abandono) as nivel_abandono_total
        ,SUM(segundos_operacion) as segundos_operacion_total
        ,SEC_TO_TIME(SUM(segundos_operacion)) as tiempo_operacion_total
        ,SUM(segundos_espera) as segundos_espera_total
        ,SEC_TO_TIME(SUM(segundos_espera)) as tiempo_espera_total
        ,AVG(tmo) as tmo_total
        ,AVG(asa) as asa_total
    FROM
        (
          SELECT
  callentry_date AS fecha_desde

  ,MIN(DATE_FORMAT(callentry_datetime_init, '%H:%i:%s')) AS hora_inicio
  ,MAX(DATE_FORMAT(callentry_datetime_end, '%H:%i:%s')) AS hora_final
  ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS llamadas_recibidas
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end) AS llamadas_abandonadas
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS llamadas_atendidas
  ,SUM(case when callentry_duration_sec <= ${
  process.env.CDR_SHORTCALL_TIME
} then 1 else 0 end) AS llamadas_cortas
  ,SUM(case when (callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} AND callentry_status = 'terminada')then 1 else 0 end) AS llamadas_antes_de_20
  ,SUM(callentry_hung_agent) AS llamadas_colgadas
  ,SUM(case when callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS nivel_servicios
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS nivel_atencion
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS nivel_abandono
  ,SUM(callentry_duration_sec) AS segundos_operacion
  ,SEC_TO_TIME(SUM(callentry_duration_sec)) AS tiempo_operacion
  ,SUM(callentry_duration_sec_wait) AS segundos_espera
  ,SEC_TO_TIME(SUM(callentry_duration_sec_wait)) as tiempo_espera
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) as tmo
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) as asa

   FROM

   MainCallEntry
   LEFT OUTER JOIN InvAgent
   ON callentry_agent_id = inv_agent_id
   
   LEFT OUTER JOIN HcaAgent
   ON callentry_agent_id = hca_agent_id
   AND callentry_date = hca_agent_date
   
   LEFT OUTER JOIN InvQueue
   ON callentry_queue_id = inv_queue_id
   
   LEFT OUTER JOIN HcaQueue
   ON callentry_agent_id = hca_queue_id
   AND callentry_date = hca_queue_date
   
   LEFT OUTER JOIN MainAudit
   ON callentry_agent_id = audit_agent_id
   AND callentry_date = audit_date
   
   -- ---------------------------------------------------------------
   -- CONDITIONS
   WHERE 1
   
   -- TIME AND DATE
   ${dateAndTimeSqlQuery(userSelection, "callentry_datetime_init")}
   
   -- AGENT
   ${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}
   
   -- SUPERVISOR
   ${arrayToJsonSqlQuery(userSelection.supervisor, "hca_agent_people_json")}
   
   -- SCHEDULE
   ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_schedule_json")}
   
   -- ROLE
   ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_role_json")}
   
   -- CLIENT
   ${arrayToJsonSqlQuery(userSelection.client, "hca_queue_client_json")}
   
   -- QUEUE
   ${arrayToSqlQuery(userSelection.queue, "callentry_queue_id")}
   
   -- SERVICE
   ${arrayToJsonSqlQuery(userSelection.service, "hca_queue_service_json")}
   
   -- CAMPAIGN
   ${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}
   
   -- BREAK
   ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
   
   -- ASIGNACION
   ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
   
   -- PLANNED CLIENT
   
   
   -- PLANNED QUEUE
   
   
   -- PLANNED SERVICE
   
   
   -- PLANNED CAMPAIGN
        

    GROUP BY
    callentry_date
        ) as daily
    
    `;


  try {
    result.total = await pool.destiny.query(queryTotal);
  } catch (error) {
    result.total = { errorTotal: error };
  }

  return result;
}

export { callsInboundDailyReport };
