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


export async function operationDetailOperationReport(userSelection){

  let result = "";

  let query = `

SELECT
inv_agent_id as agent_id
,inv_agent_name as agent_name
,inv_agent_legal_id as agent_legal_id
,inv_agent_internal_id as agent_internal_id
,CALLENTRY.start_date as start_date
,CALLENTRY.end_date as end_date
,CALLENTRY.supervisor_name as supervisor_name
,CONNECT.login_duration_sec as login_duration_sec
,CONNECT.login_duration_time as login_duration_time
,CALLENTRY.inbound_calls_attended as inbound_calls_attended
,CALLENTRY.inbound_attended_duration_sec as inbound_attended_duration_sec
,CALLENTRY.inbound_attended_duration_time as inbound_attended_duration_time
,CALLENTRY.inbound_attended_duration_sec/CONNECT.login_duration_sec as inbound_attended_avg_time
,CDR.outbound_calls_made as outbound_calls_made
,CDR.outbound_made_sec as outbound_made_sec
,CDR.outbound_made_time as outbound_made_time
,CDR.outbound_made_sec/login_duration_sec as outbound_made_avg_time
,CDR.outbound_internal_made as outbound_internal_made
,CDR.outbound_internal_sec as outbound_internal_sec
,CDR.outbound_internal_time as outbound_internal_time
,CDR.outbound_internal_sec/login_duration_sec as outbound_internal_avg_time
,AUXILIAR.auxiliar_duration_sec as auxiliar_duration_sec
,AUXILIAR.auxiliar_duration_time as auxiliar_duration_time
,AUXILIAR.auxiliar_duration_sec/CONNECT.login_duration_sec as percent_auxiliar
,ASSIGNATION.assignation_duration_sec as assignation_duration_sec
,ASSIGNATION.assignation_duration_time as assignation_duration_time
,ASSIGNATION.assignation_duration_sec/CONNECT.login_duration_sec as percent_assignation


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

audit_agent_id
,count(audit_agent_id) AS COUNT_audit_agent_id
,IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec)) as auxiliar_duration_sec
,SEC_TO_TIME(IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec))) as auxiliar_duration_time


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
audit_break_id is not null
AND
inv_break_productivity = 0

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
}

function auditAssignationQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

audit_agent_id
,count(audit_agent_id) AS COUNT_audit_agent_id
,IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec)) as assignation_duration_sec
,SEC_TO_TIME(IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), SUM(audit_duration_sec))) as assignation_duration_time


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
audit_break_id is not null
AND
inv_break_productivity = 1

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
}

function cdrQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- MAINCDR FIELDS
SELECT

-- TIME & INTERVAL


cdr_agent_id
,IF(cdr_call_type = 'outbound', SUM(cdr_call_made), 0) as outbound_calls_made
,IF(cdr_call_type = 'outbound', SUM(cdr_duration_sec), 0) as outbound_made_sec
,IF(cdr_call_type = 'outbound', SEC_TO_TIME(SUM(cdr_duration_sec)), 0) as outbound_made_time
,IF(cdr_call_type = 'internal', SUM(cdr_call_made), 0) as outbound_internal_made
,IF(cdr_call_type = 'internal', SUM(cdr_duration_sec), 0) as outbound_internal_sec
,IF(cdr_call_type = 'internal', SEC_TO_TIME(SUM(cdr_duration_sec)), 0) as outbound_internal_time

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

AND
cdr_call_made = 1

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
,JSON_UNQUOTE(JSON_EXTRACT(callentry_people_json, "$[0].name")) as supervisor_name
,IF(callentry_status = 'terminada', COUNT(callentry_id), 0) as inbound_calls_attended
,IF(callentry_status = 'terminada', SUM(callentry_duration_sec), 0) as inbound_attended_duration_sec
,IF(callentry_status = 'terminada', SEC_TO_TIME(SUM(callentry_duration_sec)), 0) as inbound_attended_duration_time



-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

MainCallEntry
LEFT OUTER JOIN InvAgent
ON callentry_agent_id = inv_agent_id

LEFT OUTER JOIN InvQueue
ON callentry_queue_id = inv_queue_id

-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1
AND
inv_queue_type = 'inbound'

-- TIME AND DATE
${dateAndTimeSqlQuery(userSelection, "callentry_datetime_init")}

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

GROUP BY callentry_agent_id

-- ---------------------------------------------------------------
-- END
 `;
}