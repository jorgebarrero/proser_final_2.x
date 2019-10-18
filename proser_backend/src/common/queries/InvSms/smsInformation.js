import * as pool from "../../../connectors/pool";
import fs from "fs";

import {
  dateAndTimeSqlQuery,
  arrayToSqlQuery,
  arrayToJsonSqlQuery,
  sqlIntervalSqlQuery,
  sqlIntervalGroupSqlQuery
} from "../../functions/sqlFunctions";

/******************************************************************** */

export async function smsInformation(userSelection) {

  let result = {};

  let query = `
-- ---------------------------------------------------------------
-- FIELDS
SELECT


DATE_FORMAT(now(), "%Y-%m-%d") as Fecha
,TIME(now()) as Hora
,inv_queue_sms_name as Cola
,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS Recibidas
,SUM(case when callentry_status = 'terminada' then 1 else 0 end) AS Atendidas
,CONCAT(FORMAT((SUM(case when (callentry_status = 'terminada' AND callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}) then 1 else 0 end)/
SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)) * 100, 2), '%') AS NS

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



GROUP BY inv_queue_sms_name 

-- ---------------------------------------------------------------
-- END
`;


  try {
    let resultPre = await pool.destiny.query(query);
    let file = resultPre.map(
      x => {
        let content = JSON.stringify(x);
        let path = `${process.env.DESTINY_FILE_PATH_SMS}${x.Fecha}_${x.Hora}-${x.Cola}.txt`;
        fs.writeFile(
          path,
          content,
          (error) =>{
            if(error){
              throw error;
            }
            console.log('El archivo ha sido creado exitosamente');
          });
        return path;
      }
    );
    
    result = {
      file,
      resultPre
    };
    
    console.log("RESULT", result);


  } catch (error) {
    result = { error: error };
  }

  return result;
}