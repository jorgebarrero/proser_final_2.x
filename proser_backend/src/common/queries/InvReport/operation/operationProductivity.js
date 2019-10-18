import * as pool from "../../../../connectors/pool";

import {
  textDateToObjectDate,
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

/******************************************************************** */

export async function operationProductivityReport(userSelection) {
  let result = "";
  let sqlArray = await queryBuilder(userSelection);

  let query = `

  SELECT
  *
  
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
  (${sqlArray}) as BREAK
  ON inv_agent_id = BREAK.agent_id  
  
  WHERE 
  CONNECT.login_duration_sec is not null
  
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

async function queryBuilder(userSelection) {
  let result = null;
  let query = `
        SELECT
            inv_break_id as id
            ,inv_break_name as name
            ,inv_break_productivity as productivity
            ,inv_break_class as class
            ,inv_break_shortname as shortname
        
        FROM
            InvBreak
    `;

  try {
    let resultPre = await pool.destiny.query(query);
    let fieldArray = resultPre.map(x => {
      return `(CAST(JSON_OBJECT("agent_id", audit_agent_id,"name", '${x.name}',"clase", '${x.class}',"count", SUM(CASE when audit_break_id = ${x.id} then 1 else 0 end),"duration_sec", SUM(CASE when audit_break_id = ${x.id} then (IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), audit_duration_sec) ) else 0 end),"duration_time", SEC_TO_TIME(SUM(CASE when audit_break_id = ${x.id} then (IF(audit_datetime_end is null, TIMESTAMPDIFF(second,audit_datetime_init,now()), audit_duration_sec) ) else 0 end)) ) AS CHAR(10000) CHARACTER SET utf8) ) as '${x.shortname}'`;
    });
    result = `
          SELECT
          audit_agent_id as agent_id
          ,${fieldArray}
        
          FROM
          MainAudit
        
          WHERE
          1
          AND
          audit_break_id is not null
          
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


          GROUP BY agent_id
          `;
  } catch (error) {
    result = { error: error };
  }
  return result;
}

function callentryQuery(userSelection) {
  return `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL

    callentry_agent_id
    ,SUM(callentry_duration_sec) as inbound_duration_sec
    ,SEC_TO_TIME(SUM(callentry_duration_sec)) as inbound_duration_time

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
    AND
    callentry_status = 'terminada'
    
    -- TIME AND DATE
    ${dateAndTimeSqlQuery(userSelection, "callentry_datetime_init")}

    -- AGENT
    ${arrayToSqlQuery(userSelection.agent, "callentry_agent_id")}

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
    "hca_agent_operation_json",
    "client"
  )}

    -- QUEUE
    ${arrayToSqlQuery(userSelection.queue, "callentry_queue_id")}

    -- SERVICE
    ${arrayToJsonSqlQuery(
    userSelection.service,
    "hca_agent_operation_json",
    "service"
  )}

    -- CAMPAIGN
    ${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}


GROUP BY callentry_agent_id

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
    ,SUM(cdr_duration_sec) as outbound_duration_sec
    ,SEC_TO_TIME(SUM(cdr_duration_sec)) as outbound_duration_time
    
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

    AND
    cdr_call_made = 1
    
    -- TIME AND DATE
    ${dateAndTimeSqlQuery(userSelection, "cdr_calldate")}
    
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
    "hca_queue_operation_json",
    "client"
  )}
    
    -- QUEUE
    ${arrayToSqlQuery(userSelection.queue, "cdr_queue_id")}
    
    -- SERVICE
    ${arrayToJsonSqlQuery(
    userSelection.service,
    "hca_queue_operation_json",
    "service"
  )}
    
    -- CAMPAIGN
    ${arrayToSqlQuery(userSelection.campaign, "callentry_campaign_id")}


GROUP BY cdr_agent_id

-- ---------------------------------------------------------------
-- END
`;
}

function auditConecctionQuery(userSelection) {
  return `
  -- ---------------------------------------------------------------
  -- FIELDS
  SELECT
  
  -- TIME & NINTERVAL
 
    audit_agent_id
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
    
    
    GROUP BY audit_agent_id
    
    -- ---------------------------------------------------------------
    -- END
     `;
}
