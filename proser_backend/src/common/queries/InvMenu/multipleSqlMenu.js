import * as pool from "../../../connectors/pool";
import moment from "moment";
import objectDateToTextDate from "../../functions/dateFunctions";

async function multipleSqlMenu(userSelection) {
  let result = {};
  let resume_error = false;

  async function queryCalendarDayFunction(userSelection) {
    let query = `
      SELECT
      *
      FROM
      InvCalendarDay
      WHERE
      inv_calendarday_date = '${userSelection.start_date}'

          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryCalendarDayFunction " + error };
    }
  }

  async function queryMenuClientFunction(userSelection) {
    let query = `

        SELECT DISTINCT
        inv_client_id AS id
        ,inv_client_name AS name
      FROM
        MainCdr
      LEFT OUTER JOIN InvQueue
      ON  cdr_queue_id = inv_queue_id

      WHERE
      (cdr_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}')
      
      GROUP BY
        inv_client_id
  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuClientFunction " + error };
    }
  }

  async function queryMenuQueueFunction(userSelection) {
    let query = `

    SELECT DISTINCT
      inv_queue_number as id
      ,inv_queue_name as name

    FROM
      MainCdr
      LEFT OUTER JOIN InvQueue
      ON cdr_queue_id = inv_queue_id
    
    WHERE
      (cdr_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}')
      GROUP BY inv_queue_number
  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuQueueFunction " + error };
    }
  }

  async function queryMenuServiceFunction(userSelection) {
    let query = `

    SELECT DISTINCT
      inv_service_id AS id
    ,inv_service_name AS name
      
    FROM
      MainCdr
      LEFT OUTER JOIN InvQueue
      ON cdr_queue_id = inv_queue_id
    
    WHERE
      (cdr_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}')

      GROUP BY inv_service_id
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuServiceFunction " + error };
    }
  }

  async function queryMenuCampaignFunction(userSelection) {
    let query = `

    SELECT
    inv_campaign_id as id,
    inv_campaign_name as name

    FROM
    InvCampaign
    WHERE  (inv_campaign_start_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}')


  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuCampaignFunction " + error };
    }
  }

  async function queryMenuSupervisorFunction(userSelection) {
    let query = `

    SELECT DISTINCT
       JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].id") ) as hca_agent_supervisor_id AS id
      ,inv_supervisor_name as name

    FROM
      MainAudit AS audit

    LEFT OUTER JOIN HcaAgent AS agent
      ON audit_agent_id = hca_agent_id

    LEFT OUTER JOIN InvSupervisor AS inv_supervisor
      ON JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].id") ) as hca_agent_supervisor_id = inv_supervisor_id
    
    WHERE
      audit_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}'


  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "multipleSqlMenu - queryMenuSupervisorFunction " + error
      };
    }
  }

  async function queryMenuAgentFunction(userSelection) {
    let query = `

    SELECT DISTINCT
		audit_agent_id AS id
        ,inv_agent_name as name
       FROM
        MainAudit AS audit
        LEFT OUTER JOIN HcaAgent AS agent
        ON audit_agent_id = hca_agent_id
        LEFT OUTER JOIN InvAgent AS inv_agent
        ON audit_agent_id = inv_agent_id
        
      WHERE

        audit_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}'

          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuAgentFunction " + error };
    }
  }

  async function queryMenuScheduleFunction(userSelection) {
    let query = `

    SELECT
    inv_schedule_id as id,
    inv_schedule_name as name
  
    FROM
    InvSchedule
  
    WHERE
    inv_schedule_status = 'A'


  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuScheduleFunction " + error };
    }
  }

  async function queryMenuAuxiliarFunction(userSelection) {
    let query = `

    SELECT
      DISTINCT(break.inv_break_id) as id,
      break.inv_break_name as name

      FROM
      MainAudit AS audit INNER JOIN InvBreak AS break
      ON
      break.inv_break_id = audit_break_id

      WHERE
      audit.audit_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}'
      AND
      break.inv_break_productivity is null or break.inv_break_productivity <> 1


  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuAuxiliarFunction " + error };
    }
  }

  async function queryMenuAsignationFunction(userSelection) {
    let query = `

    SELECT
      DISTINCT(break.inv_break_id) as id,
      break.inv_break_name as name

      FROM
      MainAudit AS audit
      INNER JOIN InvBreak AS break
      ON
      break.inv_break_id = audit_break_id

      WHERE
      audit.audit_date BETWEEN '${userSelection.start_date}' AND '${userSelection.end_date}'
      AND
      break.inv_break_productivity = 1


  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "multipleSqlMenu - queryMenuAsignationFunction " + error
      };
    }
  }

  async function queryMenuReportLinesFunction(userSelection) {
    let query = `

    SELECT
    
    aux_line_id as id,
    aux_line_name as name,
    aux_line_value as value
    
    FROM AuxLine
  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "multipleSqlMenu - queryMenuReportLinesFunction " + error
      };
    }
  }

  async function queryMenuHourFunction(userSelection) {
    let query = `

    SELECT
    
    aux_hour_id as id,
    aux_hour_name as name,
    aux_hour_value as value

    FROM AuxHour
  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuHourFunction " + error };
    }
  }

  async function queryMenuIntervalFunction(userSelection) {
    let query = `

    SELECT

    aux_interval_id as id,
    aux_interval_name as name,
    aux_interval_value as value

    FROM AuxInterval
  
          `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "multipleSqlMenu - queryMenuIntervalFunction " + error };
    }
  }

  // [{id: 12, name: 'Año nuevo'}];//

  let queryCalendarDay = await queryCalendarDayFunction(userSelection);

  let queryMenuClient = await queryMenuClientFunction(userSelection);
  let queryMenuQueue = await queryMenuQueueFunction(userSelection);
  let queryMenuService = await queryMenuServiceFunction(userSelection);
  let queryMenuCampaign = await queryMenuCampaignFunction(userSelection);
  let queryMenuSupervisor = await queryMenuSupervisorFunction(userSelection);
  let queryMenuAgent = await queryMenuAgentFunction(userSelection);
  let queryMenuSchedule = await queryMenuScheduleFunction(userSelection);
  let queryMenuAuxiliar = await queryMenuAuxiliarFunction(userSelection);
  let queryMenuAsignation = await queryMenuAsignationFunction(userSelection);

  let queryMenuReportLines = await queryMenuReportLinesFunction(userSelection);
  let queryMenuHour = await queryMenuHourFunction(userSelection);
  let queryMenuInterval = await queryMenuIntervalFunction(userSelection);

  result = {
    dashboardType: userSelection.dashboardType,
    bootstrap_start_date: userSelection.bootstrap_start_date,
    bootstrap_end_date: userSelection.bootstrap_end_date,
    bootstrap_start_time: userSelection.bootstrap_start_time,
    bootstrap_end_time: userSelection.bootstrap_end_time,

    title: userSelection.title,
    subtitle: userSelection.subtitle,
    filter: userSelection.filter,
    status: userSelection.status,

    reportlines: queryMenuReportLines,
    scale: userSelection.scale,
    login: userSelection.login,

    today: userSelection.today,
    schedule_hollyday: queryCalendarDay,
    start_date: userSelection.start_date,
    end_date: userSelection.end_date,
    start_time: queryMenuHour,
    end_time: queryMenuHour,
    interval: queryMenuInterval,
    last_minutes: queryMenuInterval,

    client: queryMenuClient,
    queue: queryMenuQueue,
    service: queryMenuService,
    campaign: queryMenuCampaign,
    supervisor: queryMenuSupervisor,
    agent: queryMenuAgent,
    schedule: queryMenuSchedule,

    auxiliar: queryMenuAuxiliar,
    assignation: queryMenuAsignation,

    groupBy: userSelection.groupBy,
    orderBy: userSelection.orderBy,
    limitBy: userSelection.limitBy,

    break_class: userSelection.break_class
  };

  if (!resume_error) {
    return result;
  } else {
    return { error: result };
  }
}

export { multipleSqlMenu };
