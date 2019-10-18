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

export async function mainCdrReport(userSelection) {
  let result = "";

  let query = `
-- ---------------------------------------------------------------
-- MAINCDR FIELDS
SELECT

-- TIME & INTERVAL
now() as now
,${sqlIntervalSqlQuery(userSelection, "cdr_calldate")}

,cdr_id
,cdr_calldate
,cdr_clid
,cdr_src
,cdr_dst
,cdr_dcontext
,cdr_channel
,cdr_dstchannel
,cdr_lastapp
,cdr_lastdata
,cdr_duration_sec
,cdr_billsec_sec
,cdr_disposition
,cdr_amaflags
,cdr_accountcode
,cdr_uniqueid
,cdr_userfield
,cdr_recordingfile
,cdr_cnum
,cdr_cnam
,cdr_outbound_cnum
,cdr_outbound_cnam
,cdr_dst_cnam
,cdr_did
,__CALLCENTER__
,cdr_callcenter_name
,cdr_call_type
,cdr_call_class
,cdr_agent_extension
,cdr_queue_number
,cdr_agent_id
,cdr_queue_id
,__DATE__
,cdr_date

,cdr_hca_agent_serial_id
,cdr_hca_queue_serial_id
,__MADE__
,cdr_call_made
,cdr_call_fail
,cdr_call_answered
,cdr_call_efective
,cdr_call_hungout

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
