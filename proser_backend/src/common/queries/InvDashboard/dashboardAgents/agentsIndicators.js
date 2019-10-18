import * as pool from "../../../../connectors/pool";
import moment from "moment";

async function agentsIndicators(userSelection) {
  let result = {};
  let resume_error = false;

  async function agentsPlannedTotalFunction(userSelection) {
    let query = `
      SELECT

          COUNT(hca_agent_id) as agentsRegistredTotal
          ,COUNT(hca_agent_schedule_plan) as agentsPlannedTotal

      FROM
          HcaAgent
      LEFT OUTER JOIN InvAgent as agent
          ON hca_agent_id = agent.inv_agent_id
      WHERE
          hca_agent_date = '${userSelection.start_date}'

        `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsPlannedTotalFunction " + error
      };
    }
  }

  async function agentsConnectedTotalFunction(userSelection) {
    let query = `
    SELECT
    COUNT(DISTINCT rca_agent_id) as agentsConnectedTotal

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'Logueado'
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsConnectedTotalFunction " + error
      };
    }
  }

  async function agentsEffectiveTotalFunction(userSelection) {
    let query = `
    SELECT
	  COUNT(DISTINCT rca_agent_id) as agentsEffectiveTotal

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

    WHERE
    rca_date = '${userSelection.start_date}'
    AND
      rca_agent_status = 'Logueado'
    AND
    (rca_group_name = 'Disponible' or rca_group_name = 'Ocupado' )
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsEffectiveTotalFunction " + error
      };
    }
  }

  async function agentsAsignedTotalFunction(userSelection) {
    let query = `
    SELECT
    COUNT(DISTINCT rca_agent_id)

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'Logueado'
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsAsignedTotalFunction " + error
      };
    }
  }

  async function agentsBreakTotalFunction(userSelection) {
    let query = `
    SELECT
    COUNT(DISTINCT rca_agent_id)

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'Logueado'
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "agentsIndicators - agentsBreakTotalFunction " + error };
    }
  }

  async function agentsAvailableTotalFunction(userSelection) {
    let query = `
    SELECT
    COUNT(DISTINCT rca_agent_id)

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'Logueado'
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsAvailableTotalFunction " + error
      };
    }
  }

  async function agentsOccupiedTotalFunction(userSelection) {
    let query = `
    SELECT
    COUNT(DISTINCT rca_agent_id)

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'Logueado'
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsOccupiedTotalFunction " + error
      };
    }
  }

  async function agentsConnectedByGroupFunction(userSelection) {
    let query = `
    SELECT

     rca_group_name as name
    ,aux_color_string as color
    ,COUNT(DISTINCT rca_agent_id) as value

    FROM
        RealCurrentAgents
        LEFT OUTER JOIN InvAgent
        ON rca_agent_id = inv_agent_id

        LEFT OUTER JOIN AuxColor
        ON aux_color_use = rca_group_name

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'Logueado'
        AND
        ${userSelection.filter_inv_agent}
    
        GROUP BY rca_group_name
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsConnectedByGroupFunction " + error
      };
    }
  }

  async function agentsBreakResumeFunction(userSelection) {
    let query = `
    SELECT
       rcb_break_name as name
       ,rcb_break_id as id
      ,count(*) as value
      ,DATE_FORMAT(SEC_TO_TIME(SUM(rcb_break_duration_sec)), '%H:%i:%s') AS color
      ,SEC_TO_TIME(SUM(rcb_break_duration_sec)) AS duration

    FROM
      RealCurrentBreaks
    
    LEFT OUTER JOIN InvAgent
        ON rca_break_agent_id = inv_agent_id
    WHERE
    rcb_date = '${userSelection.start_date}'
    AND
      rcb_break_productivity = 0
    AND
      ${userSelection.filter_inv_agent}
      
      GROUP BY rcb_break_name
  `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "agentsIndicators - agentsBreakResumeFunction " + error };
    }
  }

  async function agentsAssignationResumeFunction(userSelection) {
    let query = `
    SELECT
    rcb_break_name as name
    ,rcb_break_id as id
      ,count(*) as value
      ,DATE_FORMAT(SEC_TO_TIME(SUM(rcb_break_duration_sec)), '%H:%i:%s') AS color
      ,SEC_TO_TIME(SUM(rcb_break_duration_sec)) AS duration

    FROM
      RealCurrentBreaks
    LEFT OUTER JOIN InvAgent
        ON rca_break_agent_id = inv_agent_id
    WHERE
      rcb_date = '${userSelection.start_date}'
    AND
      rcb_break_productivity = 1
    AND
      ${userSelection.filter_inv_agent}
      
      GROUP BY rcb_break_name
  `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsAssignationResumeFunction " + error
      };
    }
  }

  async function agentsLoggedTotalFunction(userSelection) {
    let query = `
    SELECT
    COUNT(DISTINCT inv_agent_id) as agentsLoggedTotal
    FROM
        MainAudit as audit
        LEFT OUTER JOIN InvAgent as agent
        ON audit_agent_id = agent.inv_agent_id

    WHERE
        audit_date = '${userSelection.start_date}'
        AND
        audit_break_id = 0
        AND
        ${userSelection.filter_inv_agent}
    
    `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return { error: "agentsIndicators - agentsLoggedTotalFunction " + error };
    }
  }

  async function agentHistoricResumeFunction(userSelection) {
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

  async function agentsHistoricBreakResumeFunction(userSelection) {
    let query = `
    SELECT
      inv_break_name as name
      ,inv_break_id as id
      ,count(DISTINCT audit_agent_id) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

    FROM
      MainAudit AS audit
    LEFT OUTER JOIN
      InvBreak AS break
        ON audit_break_id = inv_break_id
    LEFT OUTER JOIN
      InvAgent AS agent
        ON audit_agent_id = inv_agent_id
    WHERE
    audit_date = '${userSelection.start_date}'
    AND
      inv_break_productivity = 0
    AND
      inv_break_name is not null
    AND
    ${userSelection.filter_inv_agent}
      
      GROUP BY inv_break_name
  `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error: "agentsIndicators - agentsHistoricBreakResumeFunction " + error
      };
    }
  }

  async function agentsHistoricAssignationResumeFunction(userSelection) {
    let query = `
    SELECT
      inv_break_name as name
      ,inv_break_id as id
      ,count(DISTINCT audit_agent_id) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

    FROM
      MainAudit AS audit
    LEFT OUTER JOIN
      InvBreak AS break
        ON audit_break_id = inv_break_id
    LEFT OUTER JOIN
      InvAgent AS agent
        ON audit_agent_id = inv_agent_id
    WHERE
    audit_date = '${userSelection.start_date}'
    AND
      inv_break_productivity = 1
    AND
      inv_break_name is not null
    AND
      ${userSelection.filter_inv_agent}
      
      GROUP BY inv_break_name
  `;

    try {
      const result = await pool.destiny.query(query);
      return result;
    } catch (error) {
      resume_error = true;
      return {
        error:
          "agentsIndicators - agentsHistoricAssignationResumeFunction " + error
      };
    }
  }

  let agentsPlannedTotal = await agentsPlannedTotalFunction(userSelection);
  let agentsConnectedTotal = await agentsConnectedTotalFunction(userSelection);
  let agentsEffectiveTotal = await agentsEffectiveTotalFunction(userSelection);

  let agentsAsignedTotal = await agentsAsignedTotalFunction(userSelection);
  let agentsBreakTotal = await agentsBreakTotalFunction(userSelection);
  let agentsAvailableTotal = await agentsAvailableTotalFunction(userSelection);
  let agentsOccupiedTotal = await agentsOccupiedTotalFunction(userSelection);

  let agentsConnectedByGroup = await agentsConnectedByGroupFunction(
    userSelection
  );

  let agentsBreakResume = await agentsBreakResumeFunction(userSelection);
  let agentsAssignationResume = await agentsAssignationResumeFunction(
    userSelection
  );

  let agentsLoggedTotal = await agentsLoggedTotalFunction(userSelection);

  let agentHistoricResume = await agentHistoricResumeFunction(userSelection);

  let agentsHistoricBreakResume = await agentsHistoricBreakResumeFunction(
    userSelection
  );

  let agentsHistoricAssignationResume = await agentsHistoricAssignationResumeFunction(
    userSelection
  );

  result = {
    agentsPlannedTotal,
    agentsConnectedTotal,
    agentsEffectiveTotal,
    agentsAsignedTotal,
    agentsBreakTotal,
    agentsAvailableTotal,
    agentsOccupiedTotal,
    agentsConnectedByGroup,
    agentsBreakResume,
    agentsAssignationResume,
    agentsLoggedTotal,
    agentHistoricResume,
    agentsHistoricBreakResume,
    agentsHistoricAssignationResume
  };

  if (!resume_error) {
    return result;
  } else {
    return { error: result };
  }
}

async function agentsPlannedList(userSelection) {
  let query = `
  SELECT
      *
      FROM
          HcaAgent

     LEFT OUTER JOIN
      (
        SELECT
          *
      FROM MainAudit as audit
          
      LEFT OUTER JOIN InvAgent as agent
      ON audit_agent_id = agent.inv_agent_id
      
      WHERE
        audit_date = '${userSelection.start_date}'
      AND
        audit_break_id = 0
      AND
      ${userSelection.filter_inv_agent}
      GROUP BY audit_agent_id
      ) as audit
      
      ON
      audit_agent_id = hca_agent_id


      WHERE
          hca_agent_date = '${userSelection.start_date}'
      AND
          hca_agent_schedule_plan = 1
      AND
      ${userSelection.filter_hca_agent}
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsPlannedList " + error };
  }
}

async function agentsConnectedList(userSelection) {
  let query = `
    SELECT
    *

    FROM
        RealCurrentAgents as realagent
        LEFT OUTER JOIN InvAgent as agent
        ON rca_logged_agent_id = agent.inv_agent_id

    WHERE
      rca_date = '${userSelection.start_date}'
      AND
      rca_agent_status = 'logged'
        AND
        ${userSelection.filter_inv_agent}
    
    `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsConnectedList " + error };
  }
}

async function agentsEffectiveList(userSelection) {
  let query = `
    SELECT
	  *
    FROM
        RealCurrentAgents as agents
        LEFT OUTER JOIN InvAgent as agent
        ON agents.rca_logged_agent_id = agent.inv_agent_id

    WHERE
    rca_date = '${userSelection.start_date}'
    AND
    rca_agent_status = 'logged'
    AND
    (rca_group_name = 'Disponible' or rca_group_name = 'Ocupado' )
        AND
        ${userSelection.filter_inv_agent}
    
    `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsEffectiveList " + error };
  }
}

async function agentsAsignedList(userSelection) {
  let query = `
  SELECT
  *

  FROM
      RealCurrentAgents as realagent
      LEFT OUTER JOIN InvAgent as agent
      ON rca_logged_agent_id = agent.inv_agent_id

  WHERE
    rca_date = '${userSelection.start_date}'
    AND
    inv_break_id = ${userSelection.selected_break}
    AND
    rca_agent_status = 'logged'
      AND
      ${userSelection.filter_inv_agent}
  
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsAsignedList " + error };
  }
}

async function agentsBreakList(userSelection) {
  let query = `
  SELECT
 *

  FROM
      RealCurrentAgents as realagent
      LEFT OUTER JOIN InvAgent as agent
      ON rca_logged_agent_id = agent.inv_agent_id

  WHERE
    rca_date = '${userSelection.start_date}'
    AND
    inv_break_id = ${userSelection.selected_break}
    AND
    rca_agent_status = 'logged'
      AND
      ${userSelection.filter_inv_agent}
  
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsBreakList " + error };
  }
}

async function agentsAvailableList(userSelection) {
  let query = `
  SELECT
  *

  FROM
      RealCurrentAgents as realagent
      LEFT OUTER JOIN InvAgent as agent
      ON rca_logged_agent_id = agent.inv_agent_id

  WHERE
    rca_date = '${userSelection.start_date}'
    AND
    rca_agent_status = 'logged'
      AND
      ${userSelection.filter_inv_agent}
  
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsAvailableList " + error };
  }
}

async function agentsOccupiedList(userSelection) {
  let query = `
  SELECT
  *

  FROM
      RealCurrentAgents as realagent
      LEFT OUTER JOIN InvAgent as agent
      ON rca_logged_agent_id = agent.inv_agent_id

  WHERE
    rca_date = '${userSelection.start_date}'
    AND
    rca_agent_status = 'logged'
      AND
      ${userSelection.filter_inv_agent}
  
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsOccupiedList " + error };
  }
}

async function agentsLoggedList(userSelection) {
  let query = `
  SELECT
  
  audit_id, audit_agent_id, audit_break_id, datetime_init, datetime_end, audit_duration, ext_parked, __TIME__, audit_duration_sec, audit_status, audit_date_agent_id, audit_date, audit_break_name, audit_break_class, audit_break_productivity, audit_operation_json,

  DATE_FORMAT(min(datetime_init), '%H:%i:%s') as min_datetime_init,
  DATE_FORMAT(max(datetime_end), '%H:%i:%s') as max_datetime_end,

  hca_agent_id, hca_agent_serial, hca_agent_date, hca_agent_id, hca_agent_name, hca_agent_extension, JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].id") ) as hca_agent_supervisor_id, JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].name") ) as hca_agent_supervisor_name, hca_agent_schedule_id, hca_agent_schedule_name, hca_agent_assignation, hca_agent_calendar_id, hca_agent_calendar_name, hca_agent_schedule_day, hca_agent_guard, hca_agent_schedule_plan, hca_agent_start, hca_agent_end, hca_agent_break, hca_agent_schedule_duration,

  inv_agent_id, inv_agent_status, inv_agent_chk, inv_agent_name, inv_agent_shortname, inv_agent_type, inv_agent_extension, inv_agent_legal_id, inv_agent_internal_id, JSON_UNQUOTE(JSON_EXTRACT(inv_agent_people_json, "$[0].name") ) as inv_agent_supervisor_name, JSON_UNQUOTE(JSON_EXTRACT(inv_agent_people_json, "$[0].id") ) as inv_agent_supervisor_id, inv_agent_schedule_id, inv_agent_schedule_name, inv_agent_password, inv_agent_eccp_password, inv_agent_assignation, inv_agent_calendar_id, inv_agent_calendar_name, inv_agent_calendar_type

  FROM
      MainAudit as audit
      LEFT OUTER JOIN HcaAgent as HcaAgent
      ON audit_agent_id = hca_agent_id

      LEFT OUTER JOIN InvAgent as InvAgent
      ON audit_agent_id = inv_agent_id

  WHERE
      audit_date = '${userSelection.start_date}'
      AND
      audit_break_id = 0
      AND
      ${userSelection.filter_hca_agent}
  
  GROUP BY audit_agent_id
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsLoggedList " + error };
  }
}

async function agentsAsignedDetailList(userSelection) {
  let query = `
  SELECT
      DISTINCT rca_logged_id,
      inv_agent_name as inv_agent_name,
      rca_break_name as name,
      DATE_FORMAT(SEC_TO_TIME( SUM(rca_break_duration) ), '%H:%i:%s') AS duration,
      DATE_FORMAT(rca_break_datetime_init, '%H:%i:%s') as time_init,
      rca_break_datetime_init as fulltime_init
      
    FROM
      RealCurrentAgents
    LEFT OUTER JOIN
      AuxColor
        ON rca_group_name = aux_color_use
    LEFT OUTER JOIN InvAgent as agent
        ON rca_logged_agent_id = agent.inv_agent_id
    WHERE
      rca_date = '${userSelection.start_date}'
    AND
      rca_break_id = '${userSelection.selected_break}'
    AND
      rca_agent_status = 'logged'
    AND
      rca_productivity = 1
    AND
      rca_break_name is not null
    AND
      ${userSelection.filter_inv_agent}
      
      GROUP BY rca_logged_agent_id
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsAsignedDetailList " + error };
  }
}

async function agentsBreakDetailList(userSelection) {
  let query = `
  SELECT
    DISTINCT rca_logged_id,
    inv_agent_name as inv_agent_name,
    rca_break_name as name,
    DATE_FORMAT(SEC_TO_TIME( SUM(  rca_break_duration ) ), '%H:%i:%s') AS duration,
    DATE_FORMAT(rca_break_datetime_init, '%H:%i:%s') as time_init,
    rca_break_datetime_init as fulltime_init

  FROM
    RealCurrentAgents
    LEFT OUTER JOIN
    AuxColor
      ON rca_group_name = aux_color_use
    LEFT OUTER JOIN InvAgent as agent
      ON rca_logged_agent_id = agent.inv_agent_id
    
  WHERE
    rca_date = '${userSelection.start_date}'
    AND
    rca_break_id = '${userSelection.selected_break}'
    AND
    rca_agent_status = 'logged'
    AND
    rca_productivity = 0
    AND
    rca_break_name is not null
    AND
      ${userSelection.filter_inv_agent}
    
    GROUP BY rca_logged_agent_id
`;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsBreakDetailList " + error };
  }
}

/****************************** */

async function agentsAsignedHistoricList(userSelection) {
  let query = `
    SELECT
       inv_agent_id
      ,inv_agent_name
      ,inv_break_name as name
      ,count(*) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

    FROM
      MainAudit AS audit
    LEFT OUTER JOIN
      InvBreak AS break
        ON audit_break_id = inv_break_id
    LEFT OUTER JOIN
      InvAgent AS agent
        ON audit_agent_id = inv_agent_id
    WHERE
    audit_date = '${userSelection.start_date}'
    AND
    inv_break_id = ${userSelection.selected_break}
    AND
      inv_break_productivity = 1
    AND
      inv_break_name is not null
    AND
    ${userSelection.filter_inv_agent}
      
    GROUP BY inv_agent_id, inv_break_name

    ORDER BY inv_agent_id, inv_break_name
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsAsignedHistoricList " + error };
  }
}

async function agentsBreakHistoricList(userSelection) {
  let query = `
    SELECT
       inv_agent_id
      ,inv_agent_name
      ,inv_break_name as name
      ,count(*) as value
      ,SEC_TO_TIME( SUM( audit_duration_sec )) AS duration

    FROM
      MainAudit AS audit
    LEFT OUTER JOIN
      InvBreak AS break
        ON audit_break_id = inv_break_id
    LEFT OUTER JOIN
      InvAgent AS agent
        ON audit_agent_id = inv_agent_id
    WHERE
      audit_date = '${userSelection.start_date}'
    AND
      inv_break_id = ${userSelection.selected_break}
    AND
      inv_break_productivity = 0
    AND
      inv_break_name is not null
    AND
    ${userSelection.filter_inv_agent}
      
    GROUP BY inv_agent_id, inv_break_name

    ORDER BY inv_agent_id, inv_break_name
  `;

  try {
    const result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    return { error: "agentsBreakHistoricList " + error };
  }
}

export {
  agentsIndicators,
  agentsPlannedList,
  agentsConnectedList,
  agentsEffectiveList,
  agentsAsignedList,
  agentsBreakList,
  agentsAvailableList,
  agentsOccupiedList,
  agentsLoggedList,
  agentsAsignedDetailList,
  agentsBreakDetailList,
  agentsAsignedHistoricList,
  agentsBreakHistoricList
};
