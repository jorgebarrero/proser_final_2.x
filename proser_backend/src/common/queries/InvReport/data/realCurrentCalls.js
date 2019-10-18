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

export async function realCurrentCallsReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT

-- TIME & NINTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "rcc_callentry_datetime_entry_queue")}


,rcc_callentry_id, rcc_callentry_agent_id, rcc_callentry_queue_id, rcc_callentry_contact_id, rcc_callentry_callerid, rcc_callentry_datetime_init, rcc_callentry_datetime_end, rcc_callentry_duration, rcc_callentry_duration_sec, rcc_callentry_status, rcc_callentry_transfer, rcc_callentry_datetime_entry_queue, rcc_callentry_duration_wait_sec, rcc_callentry_uniqueid, rcc_callentry_campaign_id, rcc_callentry_trunk, rcc_date

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
${dateAndTimeSqlQuery(userSelection, "rcc_callentry_datetime_init")}

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


-- PLANNED CLIENT


-- PLANNED QUEUE


-- PLANNED SERVICE


-- PLANNED CAMPAIGN

${sqlIntervalGroupSqlQuery(userSelection)}

-- ---------------------------------------------------------------
-- END
`;

  try {
    let resultPre = await pool.destiny.query(query);
    result = resultPre;
  } catch (error) {
    result = { error: error };
  }

  return result;
}
