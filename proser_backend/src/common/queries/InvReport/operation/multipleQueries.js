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

export async function multipleQueries(userSelection) {
  let result = "";

  let query = `

SELECT
inv_agent_id as agent_id
,inv_agent_name as agent_name
,inv_agent_legal_id as agent_legal_id
,inv_agent_internal_id as agent_internal_id
,CONNECT.login_duration_sec
,CONNECT.login_duration_time
,AUXILIAR.aux_start_date as aux_start_date
,AUXILIAR.aux_end_date as aux_end_date
,AUXILIAR.aux_hold_sec
,AUXILIAR.aux_hold_time
,AUXILIAR.aux_bano_sec
,AUXILIAR.aux_bano_time
,AUXILIAR.aux_descanso_sec
,AUXILIAR.aux_descanso_time
,AUXILIAR.aux_reunion_sec
,AUXILIAR.aux_reunion_time
,AUXILIAR.aux_curso_sec
,AUXILIAR.aux_curso_time
,ASSIGNATION.aux_start_date
,ASSIGNATION.aux_end_date
,ASSIGNATION.asig_llamadas_salientes_sec
,ASSIGNATION.asig_llamadas_salientes_time
,ASSIGNATION.asig_rrss_sec
,ASSIGNATION.asig_rrss_time
,ASSIGNATION.asig_calidad_sec
,ASSIGNATION.asig_calidad_time

FROM InvAgent

LEFT OUTER JOIN
(${auditConecctionQuery(userSelection)}) as CONNECT
 ON inv_agent_id = CONNECT.audit_agent_id

LEFT OUTER JOIN
(${cdrQuery(userSelection)}) as CDR
ON inv_agent_id = CDR.cdr_agent_id

LEFT OUTER JOIN
(${callentryQuery(userSelection)}) as CALLENTRY
ON inv_agent_id = CALLENTRY.callentry_agent_id

LEFT OUTER JOIN
(${auditAuxiliarQuery(userSelection)}) as AUXILIAR
 ON inv_agent_id = AUXILIAR.audit_agent_id

 LEFT OUTER JOIN
(${auditAssignationQuery(userSelection)}) as ASSIGNATION
 ON inv_agent_id = ASSIGNATION.audit_agent_id

GROUP BY inv_agent_id


`;

  try {
    let resultPre = await pool.destiny.query(query);
    result = resultPre;
  } catch (error) {
    result = { error: error };
  }

  return result;
}

function auditConecctionQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

audit_agent_id
,count(audit_agent_id) AS COUNT_audit_agent_id
,IF(audit_datetime_end is null, SUM(TIMESTAMPDIFF(second,audit_datetime_init,now())), SUM(audit_duration_sec)) as login_duration_sec
,SEC_TO_TIME(IF(audit_datetime_end is null, SUM(TIMESTAMPDIFF(second,audit_datetime_init,now())), SUM(audit_duration_sec))) as login_duration_time


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


GROUP BY audit_agent_id

-- ---------------------------------------------------------------
-- END
 `;
}

function auditAuxiliarQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

FULLTIME_AUX.audit_agent_id
,FULLTIME_AUX.start_date as aux_start_date
,FULLTIME_AUX.end_date as aux_end_date
,IF(FULLTIME_AUX.audit_break_id = 1, SUM(full_duration_sec), 0) as aux_hold_sec
,SEC_TO_TIME(IF(FULLTIME_AUX.audit_break_id = 1, SUM(full_duration_sec), 0)) as aux_hold_time
,IF(FULLTIME_AUX.audit_break_id = 2, SUM(full_duration_sec), 0) as aux_bano_sec
,SEC_TO_TIME(IF(FULLTIME_AUX.audit_break_id = 2, SUM(full_duration_sec), 0)) as aux_bano_time
,IF(FULLTIME_AUX.audit_break_id = 3, SUM(full_duration_sec), 0) as aux_descanso_sec
,SEC_TO_TIME(IF(FULLTIME_AUX.audit_break_id = 3, SUM(full_duration_sec), 0)) as aux_descanso_time
,IF(FULLTIME_AUX.audit_break_id = 4, SUM(full_duration_sec), 0) as aux_reunion_sec
,SEC_TO_TIME(IF(FULLTIME_AUX.audit_break_id = 4, SUM(full_duration_sec), 0)) as aux_reunion_time
,IF(FULLTIME_AUX.audit_break_id = 5, SUM(full_duration_sec), 0) as aux_curso_sec
,SEC_TO_TIME(IF(FULLTIME_AUX.audit_break_id = 5, SUM(full_duration_sec), 0)) as aux_curso_time


-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

(${auditDatetimeEndFullAuxiliarQuery(userSelection)}) as FULLTIME_AUX

GROUP BY FULLTIME_AUX.audit_agent_id

-- ---------------------------------------------------------------
-- END
 `;
}

function auditAssignationQuery(userSelection) {
  return `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  
  FULLTIME_ASIG.audit_agent_id
  ,FULLTIME_ASIG.start_date as aux_start_date
  ,FULLTIME_ASIG.end_date as aux_end_date
  ,IF(FULLTIME_ASIG.audit_break_id = 6, SUM(full_duration_sec), 0) as asig_llamadas_salientes_sec
  ,SEC_TO_TIME(IF(FULLTIME_ASIG.audit_break_id = 6, SUM(full_duration_sec), 0)) as asig_llamadas_salientes_time
  ,IF(FULLTIME_ASIG.audit_break_id = 7, SUM(full_duration_sec), 0) as asig_rrss_sec
  ,SEC_TO_TIME(IF(FULLTIME_ASIG.audit_break_id = 7, SUM(full_duration_sec), 0)) as asig_rrss_time
  ,IF(FULLTIME_ASIG.audit_break_id = 8, SUM(full_duration_sec), 0) as asig_calidad_sec
  ,SEC_TO_TIME(IF(FULLTIME_ASIG.audit_break_id = 8, SUM(full_duration_sec), 0)) as asig_calidad_time
  
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  (${auditDatetimeEndFullAssignationQuery(userSelection)}) as FULLTIME_ASIG
  
  GROUP BY FULLTIME_ASIG.audit_agent_id
  
  -- ---------------------------------------------------------------
  -- END
   `;
}

function cdrQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- MAINCDR FIELDS
SELECT

-- TIME & INTERVAL


cdr_agent_id
,COUNT(cdr_agent_id) AS COUNT_cdr_agent_id
,cdr_queue_id as queue_id
,inv_queue_name as queue_name
,IF(cdr_call_made = 1 AND cdr_dcontext <> 'from-internal', COUNT(cdr_call_made), 0) as outbound_calls_made
,IF(cdr_call_made = 1 AND cdr_dcontext <> 'from-internal', SUM(cdr_duration_sec), 0) as outbound_made_sec
,IF(cdr_call_made = 1 AND cdr_dcontext <> 'from-internal', SEC_TO_TIME(SUM(cdr_duration_sec)), 0) as outbound_made_time
,IF(cdr_call_made = 1 AND cdr_dcontext <> 'from-internal', SEC_TO_TIME(ROUND(AVG(cdr_duration_sec))), 0) as outbound_made_avg_time
,IF(cdr_dcontext = 'from-internal', COUNT(cdr_id), 0) as outbound_call_internal

-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainCdr
LEFT OUTER JOIN InvAgent
ON cdr_agent_id = inv_agent_id

LEFT OUTER JOIN HcaAgent
ON cdr_agent_id = hca_agent_id
AND cdr_date = hca_agent_date

LEFT OUTER JOIN InvQueue
ON cdr_queue_id = inv_queue_id

LEFT OUTER JOIN HcaQueue
ON cdr_agent_id = hca_queue_id
AND cdr_date = hca_queue_date

LEFT OUTER JOIN MainCallEntry
ON cdr_uniqueid = callentry_uniqueid


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "cdr_calldate")}

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
${arrayToSqlQuery(userSelection.queue, "cdr_queue_id")}

-- SERVICE
${arrayToJsonSqlQuery(userSelection.service, "hca_queue_service_json")}

-- CAMPAIGN
${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}

-- BREAK


-- ASIGNACION


-- PLANNED CLIENT


-- PLANNED QUEUE


-- PLANNED SERVICE


-- PLANNED CAMPAIGN


GROUP BY cdr_agent_id

-- ---------------------------------------------------------------
-- END
`;
}

function callentryQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

callentry_agent_id
,count(callentry_agent_id) AS COUNT_callentry_agent_id
,DATE(callentry_datetime_init) as start_date
,DATE(callentry_datetime_end) as end_date
,JSON_UNQUOTE(JSON_EXTRACT(inv_agent_people_json, "$[0].name")) as supervisor_name
,IF(callentry_status = 'terminada', COUNT(callentry_id), 0) as inbound_calls_attended
,IF(callentry_status = 'terminada', SUM(callentry_duration_sec), 0) as inbound_attended_duration_sec
,IF(callentry_status = 'terminada', SEC_TO_TIME(SUM(callentry_duration_sec)), 0) as inbound_attended_duration_time
,IF(callentry_status = 'terminada', SEC_TO_TIME(ROUND(AVG(callentry_duration_sec))), 0) as inbound_attended_avg_time


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
ON callentry_queue_id = hca_queue_id
AND callentry_date = hca_queue_date


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


-- ASIGNACION


-- PLANNED CLIENT


-- PLANNED QUEUE


-- PLANNED SERVICE


-- PLANNED CAMPAIGN

GROUP BY callentry_agent_id

-- ---------------------------------------------------------------
-- END
 `;
}

function auditDatetimeEndFullAuxiliarQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

audit_agent_id
,DATE(audit_datetime_init) as start_date
,DATE(audit_datetime_end) as end_date
,audit_break_id
,inv_break_name
,IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec)) as full_duration_sec
,SEC_TO_TIME(IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec))) as full_duration_time



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

WHERE 1
AND
audit_break_id is not null
AND
inv_break_productivity = 0

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

GROUP BY audit_agent_id

-- ---------------------------------------------------------------
-- END
 `;
}

function auditDatetimeEndFullAssignationQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

audit_agent_id
,DATE(audit_datetime_init) as start_date
,DATE(audit_datetime_end) as end_date
,audit_break_id
,inv_break_name
,IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec)) as full_duration_sec
,SEC_TO_TIME(IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec))) as full_duration_time



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

GROUP BY audit_agent_id

-- ---------------------------------------------------------------
-- END
 `;
}
