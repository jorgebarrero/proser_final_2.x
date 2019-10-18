// DASHBOARD Agents REPORT
/**********************************
 * Tip vscode:
 * ctrl+k & ctrl+0 to view collapsed - ctrl+k & ctrl+j to expand
 */

// IMPORTS
import * as pool from "../../../../connectors/pool";
import {
  objectDateToTextDate,
  valueFromObject
} from "../../../functions/dateFunctions";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../../functions/sqlFunctions";

import {
  onColorForPercentage,
  onColorForCallsOnQueue
} from "../../../functions/scaleFunctions";

import { userSelectionBlank } from "../../../functions/userSelectionFunctions.js";

/******************************************************************** */
// MAIN FUNCTION
export async function dashboardAgentsIndicators(userSelection) {
  let result = {};
  let resume_error = false;

  let dashboardAgentsCallsIndicators = await dashboardAgentsCallsIndicatorsFunction(
    userSelection
  );
  let dashboardAgentsCurrentCallsInicators = await dashboardAgentsCurrentCallsInicatorsFunction(
    userSelection
  );
  let agentsPlannedTotal = await agentsPlannedTotalFunction(userSelection);
  let agentsConnectedTotal = await agentsConnectedTotalFunction(userSelection);
  let agentsLoggedTotal = await agentsLoggedTotalFunction(userSelection);
  let agentsConnectedByGroup = await agentsConnectedByGroupFunction(
    userSelection
  );

  let agentHistoricResume = await agentHistoricResumeFunction(userSelection);

  let agentsAuxiliarResume = await agentsAuxiliarResumeFunction(userSelection);
  let agentsAssignationResume = await agentsAssignationResumeFunction(
    userSelection
  );
  let agentsHistoricBreakResume = await agentsHistoricBreakResumeFunction(
    userSelection
  );
  let agentsHistoricAssignationResume = await agentsHistoricAssignationResumeFunction(
    userSelection
  );

  let scale = await scaleFunction(userSelection);

  let colors = [
    {
      AgentsServiceLevel: onColorForPercentage(
        dashboardAgentsCallsIndicators[0].AgentsServiceLevel,
        scale[0]
      ),
      AgentsAtentionLevel: onColorForPercentage(
        dashboardAgentsCallsIndicators[0].AgentsAtentionLevel,
        scale[0]
      ),
      AgentsAbandonLevel: onColorForPercentage(
        dashboardAgentsCallsIndicators[0].AgentsAbandonLevel,
        scale[0]
      ),
      callsOnQueue: onColorForCallsOnQueue(
        dashboardAgentsCurrentCallsInicators[0].maxWaitTimeOnQue,
        parseInt(process.env.CDR_SERVICE_IDEAL_TIME)
      ),
      callsOnQueueWaitTime:
        dashboardAgentsCurrentCallsInicators[0].maxWaitTimeOnQue,
      callsOnQueueIdeal: parseInt(process.env.CDR_SERVICE_IDEAL_TIME)
    }
  ];

  result = {
    dashboardAgentsCallsIndicators,
    dashboardAgentsCurrentCallsInicators,
    agentsPlannedTotal,
    agentsConnectedTotal,
    agentsLoggedTotal,
    agentsConnectedByGroup,
    agentHistoricResume,
    agentsAuxiliarResume,
    agentsAssignationResume,
    agentsHistoricBreakResume,
    agentsHistoricAssignationResume,
    scale,
    colors
  };

  return result;
}

/**************************************** */
// indicators
async function dashboardAgentsCallsIndicatorsFunction(userSelection) {
  let result = null;
  let resume_error = false;

  let query = `

  -- dashboardAgentsCallsIndicatorsFunction --------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  

  now() AS now
  ,callentry_agent_id as agent_id
  ,inv_agent_name as agent_name
  ,DAYNAME(callentry_date) as day_name
  ,WEEKDAY(callentry_date) + ${process.env.MONDAY_CONFIG} as week_day
      
  ,'${objectDateToTextDate(userSelection.start_date)}' AS start_date
  ,'${objectDateToTextDate(userSelection.end_date)}' AS end_date

  ,'${valueFromObject(userSelection.start_time, "00:00:00")}' AS start_time
  ,'${valueFromObject(userSelection.end_time, "24:00:00")}' AS end_time
  
  ,MIN(DATE_FORMAT(callentry_datetime_init, '%H:%i:%s')) AS min_start_time
  ,MAX(DATE_FORMAT(callentry_datetime_end, '%H:%i:%s')) AS max_end_time
  
  ,${process.env.CDR_SERVICE_IDEAL_TIME} AS idealResponseTime
  ,${process.env.CDR_SHORTCALL_TIME} AS shortTimeDef

  ,MAX(callentry_duration_sec_wait) as maxWaitTime
  
  ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS AgentsReceived
  
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end) AS AgentsAbandoned
  
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS AgentsAttended
  
  ,SUM(case when callentry_duration_sec <= ${
  process.env.CDR_SHORTCALL_TIME
} then 1 else 0 end) AS AgentsShort
  
  ,SUM(case when (callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} AND callentry_status = 'terminada')then 1 else 0 end) AS AgentsBeforeTime
  
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) - SUM(case when (callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} AND callentry_status = 'terminada')then 1 else 0 end) AS AgentsAfterTime
  
  ,SUM(callentry_hung_agent) AS AgentsHungAgent
  
  ,SUM (case when (callentry_status = 'terminada' AND callentry_duration_sec_wait <= ${
  process.env.CDR_SERVICE_IDEAL_TIME
} ) then 1 else 0 end) / SUM ( case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' ) then 1 else 0 end) AS AgentsServiceLevel

  
  ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS AgentsAtentionLevel
  
  ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS AgentsAbandonLevel
  
  ,SUM(callentry_duration_sec) AS operation_seconds
  
  ,SEC_TO_TIME(SUM(callentry_duration_sec)) AS operation_time
  
  ,SUM(callentry_duration_sec_wait) AS wait_seconds
  
  ,SEC_TO_TIME(SUM(callentry_duration_sec_wait)) AS wait_time

  ,MAX(callentry_duration_sec_wait) as maxWaitTime
  
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS AgentsTmo
  
  ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS AgentsAsa
  
   -- ---------------------------------------------------------------
   -- TABLES & JOINS
   FROM
   
   MainCallEntry
   
   LEFT OUTER JOIN InvAgent
   ON callentry_agent_id = inv_agent_id
   



   LEFT OUTER JOIN HcaAgent
   ON (callentry_agent_id = hca_agent_id AND callentry_date = 
    (SELECT hca_agent_date FROM HcaAgent WHERE hca_agent_date <= '${objectDateToTextDate(
    userSelection.start_date
  )}' ORDER BY hca_agent_date DESC LIMIT 1))
   


    
   LEFT OUTER JOIN InvQueue
   ON callentry_queue_id = inv_queue_id
   
   LEFT OUTER JOIN HcaQueue
   ON (callentry_agent_id = hca_queue_id AND callentry_date = hca_queue_date)
   
   -- -----------------------------
   WHERE 1
   
   
   -- TIME AND DATE
   ${dateAndTimeSqlQuery(userSelection, "callentry_datetime_entry_queue")}
   AND callentry_date is not null
   
   -- AGENT
   ${arrayToSqlQuery(userSelection.agent, "callentry_agent_id")}
   
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
   
  
   GROUP BY callentry_agent_id
   -- END ---------------------------------------------------------------

  `;

  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { errorDetail: error });
  }
}

/**************************************** */
// current calls
async function dashboardAgentsCurrentCallsInicatorsFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
-- dashboardAgentsCurrentCallsInicatorsFunction --------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now

,rcc_callentry_agent_id as agent_id
,inv_agent_name as agent_name

,rcc_callentry_id, rcc_callentry_queue_id, rcc_callentry_contact_id, rcc_callentry_callerid, rcc_callentry_datetime_init, rcc_callentry_datetime_end, rcc_callentry_duration, rcc_callentry_duration_sec, rcc_callentry_status, rcc_callentry_transfer, rcc_callentry_datetime_entry_queue, rcc_callentry_duration_wait_sec, rcc_callentry_uniqueid, rcc_callentry_campaign_id, rcc_callentry_trunk, rcc_date


-- ---------------------------------------------------------------
-- TABLES & JOINS

FROM

RealCurrentCalls

LEFT OUTER JOIN InvAgent
ON rcc_callentry_agent_id = inv_agent_id

LEFT OUTER JOIN HcaAgent
ON rcc_callentry_agent_id = hca_agent_id
AND rcc_date = hca_agent_date

LEFT OUTER JOIN InvQueue
ON rcc_callentry_queue_id = inv_queue_id

LEFT OUTER JOIN HcaQueue
ON rcc_callentry_queue_id = hca_queue_id
AND rcc_date = hca_queue_date


-- ---------------------------------------------------------------
-- CONDITIONS
WHERE 1

-- TIME AND DATE

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
${arrayToSqlQuery(userSelection.queue, "rcc_callentry_queue_id")}

-- SERVICE
${arrayToJsonSqlQuery(userSelection.service, "hca_queue_service_json")}

-- CAMPAIGN
${arrayToSqlQuery(userSelection.campaign, "rcc_callentry_campaign_id")}

-- BREAK
-- ASIGNACION

GROUP BY rcc_callentry_agent_id
-- END -------------------------------------------------------
`;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

/**************************************** */
// Agents planned
async function agentsPlannedTotalFunction(userSelection) {
  let result = [
    {
      now: "",
      agentsPlannedTotal: null
    }
  ];
  let resume_error = false;
  let query = `
  -- agentsPlannedTotalFunction ----------
-- FIELDS
SELECT

-- TIME & NINTERVAL
   now() as now
   ,COUNT(hca_agent_id) as agentsPlannedTotal

    FROM
        HcaAgent
       
        -- ---------------------------------------------------------------
        -- CONDITIONS
        WHERE 1
        
        -- TIME AND DATE
        ${dateAndTimeSqlQuery(userSelection, "hca_agent_date")}
        
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
        ${arrayToJsonSqlQuery(userSelection.client, "hca_agent_client_json")}
        
        -- QUEUE
        ${arrayToJsonSqlQuery(userSelection.queue, "hca_agent_queue_json")}
        
        -- SERVICE
        ${arrayToJsonSqlQuery(userSelection.service, "hca_agent_service_json")}
        
        -- CAMPAIGN
        ${arrayToSqlQuery(userSelection.campaign, "hca_agent_campaign_json")}
        
        -- BREAK
        -- ASIGNACION

        GROUP BY hca_agent_date
        -- END ----------------------------------------------------------
        `;

  try {
    let temp = await pool.destiny.query(query);
    return temp.length < 1 ? result : temp;
  } catch (error) {
    return (result = { error: error });
  }
}

/**************************************** */
// Agents connected
async function agentsConnectedTotalFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,COUNT(DISTINCT rca_agent_id) as agentsConnectedTotal
  ,SUM(CASE when rca_group_name = 'Disponible' or rca_group_name = 'Ocupado' then 1 else 0 end ) as agentsEffectiveTotal
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  RealCurrentAgents
  LEFT OUTER JOIN InvAgent
  ON rca_agent_id = inv_agent_id
   
  LEFT OUTER JOIN MainAudit
  ON rca_audit_login_id = audit_id
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rca_agent_status = 'Logueado'
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "rca_agent_id")}
  
  -- SUPERVISOR
  ${arrayToJsonSqlQuery(userSelection.supervisor, "rca_people_json", "supervisor")}

  -- SCHEDULE
  ${arrayToJsonSqlQuery(userSelection.client, "rca_time_json", "schedule")}

  -- ROLE
  ${arrayToJsonSqlQuery(userSelection.client, "rca_people_json", "role")}

  -- CLIENT
  ${arrayToJsonSqlQuery(userSelection.client, "rca_operation_json", "client")}

  -- QUEUE
  ${arrayToJsonSqlQuery(userSelection.queue, "rca_operation_json", "queue")}

  -- SERVICE
  ${arrayToJsonSqlQuery(userSelection.service, "rca_operation_json", "service")}

  -- CAMPAIGN
  ${arrayToJsonSqlQuery(userSelection.campaign, "rca_operation_json", "campaign")}
  
  -- BREAK
  ${arrayToSqlQuery(userSelection.auxiliar, "audit_break_id")}
  
  -- ASIGNACION
  ${arrayToSqlQuery(userSelection.assignation, "audit_break_id")}
  
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

// Agents connected
async function agentsLoggedTotalFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
      
  ,COUNT(DISTINCT audit_agent_id) as agentsLoggedTotal
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  MainAudit
  LEFT OUTER JOIN InvAgent
  ON audit_agent_id = inv_agent_id
  
  LEFT OUTER JOIN HcaAgent
  ON audit_agent_id = hca_agent_id
  AND audit_date = hca_agent_date
  
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1


  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}
  
  -- AGENT
  ${arrayToSqlQuery(userSelection.agent, "audit_agent_id")}
  
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
  
  
  -- END ------------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

/**************************************** */
// agents grouped
async function agentsConnectedByGroupFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
  ,rca_agent_id AS agent_id
  ,inv_agent_name AS agent_name
      
  ,rca_audit_login_id, rca_audit_logout_id, rca_date, __AGENT__, rca_agent_id, rca_agent_name, rca_agent_datetime_login, rca_agent_datetime_logout, rca_agent_duration, rca_agent_duration_sec, rca_agent_status, __GROUP__, rca_group_id, rca_group_name, rca_subgroup_id, rca_subgroup_name
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  RealCurrentAgents
  LEFT OUTER JOIN InvAgent
  ON rca_agent_id = inv_agent_id
  
  LEFT OUTER JOIN HcaAgent
  ON rca_agent_id = hca_agent_id
  AND rca_date = hca_agent_date
  
  LEFT OUTER JOIN MainAudit
  ON rca_audit_login_id = audit_id

  LEFT OUTER JOIN AuxColor
  ON aux_color_use = rca_group_name
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
  rca_agent_status = 'Logueado'
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rca_agent_datetime_login")}
  
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
  
  
  GROUP BY rca_agent_id
      
  -- END ---------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

/**************************************** */
// agents historic
async function agentHistoricResumeFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
      SELECT
      'planificados' as concept
      ,COUNT(hca_agent_schedule_plan) as count_agents
      ,SEC_TO_TIME(SUM(hca_agent_schedule_duration)) as duration_agents
      ,DATE_FORMAT(SEC_TO_TIME(SUM(hca_agent_schedule_duration) / COUNT(hca_agent_schedule_plan)), '%H:%i:%s')
      as average_agents
      FROM
      HcaAgent
      LEFT OUTER JOIN InvAgent as agent
      ON hca_agent_id = inv_agent_id
      WHERE
      hca_agent_date = '${userSelection.start_date}'
      AND
      ${userSelection.filter_hca_agent}


      UNION

      SELECT
      'registrados' as concept
      ,COUNT(DISTINCT audit_agent_id) as count_agents
      ,SEC_TO_TIME( SUM( audit_duration_sec )) as duration_agents
      ,SEC_TO_TIME( SUM( audit_duration_sec) / COUNT(DISTINCT audit_agent_id))
      as average_agents
      FROM
      MainAudit
      LEFT OUTER JOIN InvAgent
      ON audit_agent_id = inv_agent_id
      WHERE
      audit_break_id = 0
      AND
      audit_date = '${userSelection.start_date}'
      AND
      ${userSelection.filter_inv_agent}


      UNION


      SELECT
      'Llamadas entrantes' as concept
      ,COUNT(DISTINCT callentry_agent_id) as count_agents
      ,SEC_TO_TIME(SUM((callentry_duration_sec))) as duration_agents
      ,DATE_FORMAT(SEC_TO_TIME(SUM((callentry_duration_sec)) / COUNT(DISTINCT callentry_agent_id)), '%H:%i:%s')
      as average_agents
      FROM
      MainCallEntry
      LEFT OUTER JOIN InvAgent
      ON callentry_agent_id = inv_agent_id
      WHERE
      callentry_date = '${userSelection.start_date}'
      AND
      callentry_status = 'terminada'
      AND
      ${userSelection.filter_inv_agent}

      UNION

      SELECT
      'Llamadas salientes' as concept
      ,COUNT(DISTINCT cdr_agent_id) as count_agents
      ,SEC_TO_TIME(SUM((cdr_duration_sec))) as duration_agents
      ,DATE_FORMAT(SEC_TO_TIME(SUM((cdr_duration_sec)) / COUNT(DISTINCT cdr_agent_id)), '%H:%i:%s')
      as average_agents
      FROM
      MainCdr
      LEFT OUTER JOIN InvAgent
      ON cdr_agent_id = inv_agent_id
      WHERE
      cdr_call_made = 1
      AND
      cdr_date = '${userSelection.start_date}'
      AND
      ${userSelection.filter_inv_agent}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    resume_error = true;
    return {
      error: "agentsIndicators - agentHistoricResumeFunction " + error
    };
  }
}

/**************************************** */
// break auxiliar resume
async function agentsAuxiliarResumeFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
  ,rcb_break_name as name
  ,rcb_break_id as id
  ,COUNT(rcb_break_audit_id) as value
  ,SEC_TO_TIME(SUM(TIME_TO_SEC(rcb_break_duration))) AS duration
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  RealCurrentBreaks
  LEFT OUTER JOIN InvAgent
  ON rcb_break_agent_id = inv_agent_id
  
  LEFT OUTER JOIN InvBreak
  ON rcb_break_id = inv_break_id
  
  LEFT OUTER JOIN HcaAgent
  ON rcb_break_agent_id = hca_agent_id
  AND rcb_date = hca_agent_date
  
  LEFT OUTER JOIN MainAudit
  ON rcb_break_audit_id = audit_id
  
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
    rcb_break_productivity = 0
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rcb_break_datetime_init")}
  
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
  
  
  GROUP BY rcb_break_name
  
  -- END -----------------------------------------------------------
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

/**************************************** */
// break assignation resume
async function agentsAssignationResumeFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
  now() as now
  ,rcb_break_name as name
  ,rcb_break_id as id
  ,COUNT(rcb_break_audit_id) as value
  ,SEC_TO_TIME(SUM(rcb_break_duration)) AS duration
  
  -- ---------------------------------------------------------------
  -- TABLES & JOINS
  
  FROM
  
  RealCurrentBreaks
  LEFT OUTER JOIN InvAgent
  ON rcb_break_agent_id = inv_agent_id
  
  LEFT OUTER JOIN InvBreak
  ON rcb_break_id = inv_break_id
  
  LEFT OUTER JOIN HcaAgent
  ON rcb_break_agent_id = hca_agent_id
  AND rcb_date = hca_agent_date
  
  LEFT OUTER JOIN MainAudit
  ON rcb_break_audit_id = audit_id
  
  
  -- ---------------------------------------------------------------
  -- CONDITIONS
  WHERE 1

  AND
    rcb_break_productivity = 1
  
  -- TIME AND DATE
  ${dateAndTimeSqlQuery(userSelection, "rcb_break_datetime_init")}
  
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
  
  
  GROUP BY rcb_break_name
  
  -- END ---------------------------------------------------------

  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

/**************************************** */
// scale
async function scaleFunction(userSelection) {
  let result = null;
  let resume_error = false;
  let query = `
    SELECT
    *
    FROM
    InvScale
    WHERE
    inv_scale_name = '${process.env.COLORSCALE_NAME}'
  `;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

async function agentsHistoricBreakResumeFunction(userSelection) {
  let query = `
  SELECT
      inv_break_name as name
      ,inv_break_id as id
      ,count(DISTINCT audit_agent_id) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

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
    
    WHERE
    inv_break_productivity = 0
    AND
      inv_break_name is not null

      -- TIME AND DATE
      ${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}
      
      -- AGENT
      ${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}
      
      -- SUPERVISOR
      ${arrayToJsonSqlQuery(
    userSelection.supervisor,
    "hca_agent_people_json",
    "supervisor"
  )}
      
      -- SCHEDULE
      ${arrayToJsonSqlQuery(
    userSelection.client,
    "hca_agent_time_json",
    "schedule"
  )}
      
      -- ROLE
      ${arrayToJsonSqlQuery(
    userSelection.client,
    "hca_agent_people_json",
    "role"
  )}
      
      
      -- CLIENT
      ${arrayToJsonSqlQuery(
    userSelection.client,
    "audit_operation_json",
    "client"
  )}
      
      -- QUEUE
      ${arrayToJsonSqlQuery(
    userSelection.queue,
    "audit_operation_json",
    "queue"
  )}
      
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
    
      
      GROUP BY inv_break_name
`;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}

async function agentsHistoricAssignationResumeFunction(userSelection) {
  let query = `
  SELECT
      inv_break_name as name
      ,inv_break_id as id
      ,count(DISTINCT audit_agent_id) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

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
    
    WHERE
    inv_break_productivity = 1
    AND
      inv_break_name is not null

      -- TIME AND DATE
      ${dateAndTimeSqlQuery(userSelection, "audit_datetime_init")}
      
      -- AGENT
      ${arrayToSqlQuery(userSelection.agent, "hca_agent_id")}
      
      -- SUPERVISOR
      ${arrayToJsonSqlQuery(
    userSelection.supervisor,
    "hca_agent_people_json",
    "supervisor"
  )}
      
      -- SCHEDULE
      ${arrayToJsonSqlQuery(
    userSelection.client,
    "hca_agent_time_json",
    "schedule"
  )}
      
      -- ROLE
      ${arrayToJsonSqlQuery(
    userSelection.client,
    "hca_agent_people_json",
    "role"
  )}
      
      
      -- CLIENT
      ${arrayToJsonSqlQuery(
    userSelection.client,
    "audit_operation_json",
    "client"
  )}
      
      -- QUEUE
      ${arrayToJsonSqlQuery(
    userSelection.queue,
    "audit_operation_json",
    "queue"
  )}
      
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
    
      
      GROUP BY inv_break_name
`;

  try {
    let result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return (result = { error: error });
  }
}
