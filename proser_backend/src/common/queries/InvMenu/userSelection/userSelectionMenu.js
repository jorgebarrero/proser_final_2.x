import * as pool from "../../../../connectors/pool";
import moment from "moment";

import {
  textDateToObjectDate,
  objectDateToTextDate,
  valueFromObject
} from "../../../functions/dateFunctions";

export async function userSelectionMenu(userSelection) {
  let resumeError = null;
  let resultFinal = userSelection;

  async function title_Menu(userSelection) {
    let internalFunctionName = "title_Menu";

    try {
      const functionResult = userSelection.title;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function entity_selection_Menu(userSelection) {
    let internalFunctionName = "entity_selection_Menu";

    try {
      const functionResult = userSelection.entity_selection;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function options_Menu(userSelection) {
    let internalFunctionName = "options_Menu";

    try {
      const functionResult = userSelection.options;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function legend_Menu(userSelection) {
    let internalFunctionName = "legend_Menu";

    try {
      const functionResult = userSelection.legend;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function mode_Menu(userSelection) {
    let internalFunctionName = "mode_Menu";

    let mode = [
      { id: 0, name: "Actual", value: true },
      { id: 0, name: "Histórico", value: false }
    ];

    try {
      const functionResult = mode;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function type_Menu(userSelection) {
    let internalFunctionName = "type_Menu";

    try {
      const functionResult = userSelection.type;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function start_date_Menu(userSelection) {
    let internalFunctionName = "start_date_Menu";

    try {
      const functionResult = objectDateToTextDate(userSelection.start_date);

      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function end_date_Menu(userSelection) {
    let internalFunctionName = "end_date_Menu";

    try {
      const functionResult = userSelection.end_date;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function start_time_Menu(userSelection) {
    let internalFunctionName = "start_time_Menu";

    let query = `
    SELECT
    JSON_OBJECT("id", aux_hour_id, "name", aux_hour_name, "value", aux_hour_value) as start_time
    FROM
    AuxHour
        `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.start_time);
        })
        .map(x => {
          return { id: x.id, name: x.name, value: x.value };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function end_time_Menu(userSelection) {
    let internalFunctionName = "end_time_Menu";

    let query = `
    SELECT
    JSON_OBJECT("id", aux_hour_id, "name", aux_hour_name, "value", aux_hour_value) as end_time
    FROM
    AuxHour
        `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.end_time);
        })
        .map(x => {
          return { id: x.id, name: x.name, value: x.value };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function login_Menu(userSelection) {
    let internalFunctionName = "login_Menu";

    try {
      const functionResult = userSelection.login;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function auxiliar_Menu(userSelection) {
    let internalFunctionName = "auxiliar_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_break_status = '${statusParse.status.value}'`;

    let query = `
      SELECT
      inv_break_id as id, inv_break_name as name
      FROM
      InvBreak
      
      WHERE 1
      AND
      inv_break_productivity = 0
      AND
      (inv_break_id is not null OR inv_break_id <> 0)
      ${status_field}

          `;

    try {
      const functionResult = await pool.destiny.query(query);
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function asignation_Menu(userSelection) {
    let internalFunctionName = "asignation_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_break_status = '${statusParse.status.value}'`;

    let query = `
    SELECT
    inv_break_id as id, inv_break_name as name
    FROM
    InvBreak
    
    WHERE 1
    AND
    inv_break_productivity = 1
    AND
    (inv_break_id is not null OR inv_break_id <> 0)
    ${status_field}

          `;

    try {
      const functionResult = await pool.destiny.query(query);
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function client_Menu(userSelection) {
    let internalFunctionName = "client_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_client_status = '${statusParse.status.value}'`;

    let query = `
    SELECT
      JSON_OBJECT("id", inv_client_id, "name", inv_client_name) as client
      
    FROM
      InvClient
               
    WHERE 1
      ${status_field}  
    
      GROUP BY client
          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.client);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });

      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function queue_Menu(userSelection) {
    let internalFunctionName = "queue_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_queue_status = '${statusParse.status.value}'`;

    let query = `
      SELECT
        JSON_OBJECT("id", inv_queue_id, "name", CONCAT(inv_queue_number, "-", inv_queue_name)) as queue
      
      FROM
        InvQueue
      
      WHERE 1
      ${status_field}
      
      GROUP BY queue

          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.queue);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });

      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function service_Menu(userSelection) {
    let internalFunctionName = "service_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_service_status = '${statusParse.status.value}'`;

    let query = `
    SELECT
      JSON_OBJECT("id", inv_service_id, "name", inv_service_name) as service
    
    FROM
      InvService
            
    WHERE 1
    ${status_field}
            
      GROUP BY service

          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.service);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });

      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function campaign_Menu(userSelection) {
    let internalFunctionName = "campaign_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_campaign_status = '${statusParse.status.value}'`;

    let query = `
      SELECT
        JSON_OBJECT("id", inv_campaign_id, "name", inv_campaign_name) as campaign
      
      FROM
        InvCampaign

      
      WHERE 1
      ${status_field}
      
      GROUP BY campaign
          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.campaign);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function supervisor_Menu(userSelection) {
    let internalFunctionName = "supervisor_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_supervisor_status = '${statusParse.status.value}'`;

    let query = `
    SELECT
    JSON_OBJECT("id", inv_supervisor_id, "name", inv_supervisor_name) as supervisor
    
    FROM
      InvSupervisor
    

    WHERE 1
    ${status_field}
          
    GROUP BY supervisor
        `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.supervisor);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function agent_Menu(userSelection) {
    let internalFunctionName = "agent_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_agent_status = '${statusParse.status.value}'`;

    let query = `
    SELECT
    
    JSON_OBJECT("id", inv_agent_id, "name", inv_agent_name) as agent
    
    FROM
      InvAgent

    WHERE 1
    ${status_field}
          
    GROUP BY agent

          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.agent);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function role_Menu(userSelection) {
    let internalFunctionName = "role_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_agentrole_status = '${statusParse.status.value}'`;

    let query = `
      SELECT
      
      JSON_OBJECT("id", inv_agentrole_id, "name", inv_agentrole_name) as role
      
      FROM
      InvAgentRole

      WHERE 1
      ${status_field}
          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.role);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function schedule_Menu(userSelection) {
    let internalFunctionName = "schedule_Menu";
    let statusParse = JSON.parse(JSON.stringify(userSelection));
    let status_field =
      statusParse.status.value === "All" || statusParse.status.value === ""
        ? "AND 1"
        : `AND inv_schedule_status = '${statusParse.status.value}'`;

    let query = `
    SELECT
    JSON_OBJECT("id", inv_schedule_id, "name", inv_schedule_name) as schedule
      
    FROM
      InvSchedule
         
    WHERE 1
    ${status_field}
            
      GROUP BY schedule

          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.schedule);
        })
        .map(x => {
          return { id: x.id, name: x.name };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function last_minutes_Menu(userSelection) {
    let internalFunctionName = "last_minutes_Menu";

    let query = `
      SELECT
      JSON_OBJECT("id", aux_interval_id, "name", aux_interval_name, "value", aux_interval_value) as last_minutes
      FROM
      AuxInterval
      
          `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.last_minutes);
        })
        .map(x => {
          return { id: x.id, name: x.name, value: x.value };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function interval_Menu(userSelection) {
    let internalFunctionName = "interval_Menu";

    let query = `
    SELECT
    JSON_OBJECT("id", aux_interval_id, "name", aux_interval_name, "value", aux_interval_value, "minute", aux_interval_minutes ) as data_interval
    FROM
    AuxInterval
    
        `;

    try {
      const functionResultTemp = await pool.destiny.query(query);
      const functionResult = functionResultTemp
        .map(x => {
          return JSON.parse(x.data_interval);
        })
        .map(x => {
          return { id: x.id, name: x.name, value: x.value, minute: x.minute };
        });
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function groupBy_Menu(userSelection) {
    let internalFunctionName = "groupBy_Menu";

    try {
      const functionResult = userSelection.groupBy;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function orderBy_Menu(userSelection) {
    let internalFunctionName = "orderBy_Menu";

    try {
      const functionResult = userSelection.orderBy;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function limitBy_Menu(userSelection) {
    let internalFunctionName = "limitBy_Menu";

    try {
      const functionResult = userSelection.limitBy;
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  async function sample_Menu(userSelection) {
    let internalFunctionName = "sample_Menu";

    let query = `
    SELECT
    inv_agent_id as id, inv_agent_name as name
    FROM
    ${mainTable}

        `;

    try {
      const functionResult = await pool.destiny.query(query);
      return functionResult;
    } catch (error) {
      resumeError = true;
      return {
        error: `userSelection_Menu - ${internalFunctionName}: ` + error
      };
    }
  }

  /**************** */

  /********************************************************************************* */

  let title = userSelection.title;
  let entity_selection = userSelection.title;
  let options = userSelection.options;
  let legend = userSelection.legend;
  let mode = await mode_Menu(userSelection);
  let type = await type_Menu(userSelection);
  let start_date = await start_date_Menu(userSelection);
  let end_date = await end_date_Menu(userSelection);
  let start_time = await start_time_Menu(userSelection);
  let end_time = await end_time_Menu(userSelection);
  let login = await login_Menu(userSelection);
  let auxiliar = await auxiliar_Menu(userSelection);
  let assignation = await asignation_Menu(userSelection);
  let client = await client_Menu(userSelection);
  let queue = await queue_Menu(userSelection);
  let service = await service_Menu(userSelection);
  let campaign = await campaign_Menu(userSelection);

  let supervisor = await supervisor_Menu(userSelection);
  let agent = await agent_Menu(userSelection);

  let role = await role_Menu(userSelection);
  let schedule = await schedule_Menu(userSelection);
  let last_minutes = await last_minutes_Menu(userSelection);
  let interval = await interval_Menu(userSelection);

  let status = [
    { id: 0, name: "Activo", value: "A" },
    { id: 1, name: "Inactivo", value: "I" },
    { id: 2, name: "Todos", value: "All" }
  ];
  let groupBy = userSelection.groupBy;
  let orderBy = userSelection.groupBy;
  let limitBy = userSelection.groupBy;

  resultFinal = {
    title,
    entity_selection,
    options,
    legend,
    mode,
    type,
    start_date,
    end_date,
    start_time,
    end_time,
    login,
    auxiliar,
    assignation,
    client,
    queue,
    service,
    campaign,
    supervisor,
    agent,
    role,
    schedule,
    last_minutes,
    interval,
    groupBy,
    orderBy,
    limitBy,
    status
  };

  if (!resumeError) {
    return resultFinal;
  } else {
    return { error: resultFinal };
  }
}
