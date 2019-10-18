import * as pool from "../../../connectors/pool";
// import {
//   userSelectionFilters,
//   userSelectionSqlFunction
// } from "../InvMenu/userSelection/userSelectionFilters";
// import { sqlDateQueries, sqlIntervalFields } from "./inboundFunctions";


export async function auditFunction(
  userSelection,
  selectField,
  aditionalFilterField
) {
  let result;
  let resume_error = false;
  let selectFieldQuery = selectField ? selectField : "1";
  let aditionalFilterFieldQuery = aditionalFilterField
    ? aditionalFilterField
    : "1";
  let userSelectionFields = {
    agent: "audit_agent_id",
    supervisor: "hca_agent_people_json",
    role: "hca_agent_role_json",
    schedule: "hca_agent_schedule_json",
    assignation: "audit_break_id",
    auxiliar: "audit_break_id",
    client: "audit_operation_json",
    service: "audit_operation_json",
    queue: "audit_operation_json",
    campaign: ""
    // plannedClient: "inv_service_id",
    // plannedQueue: "inv_service_id",
    // plannedService: "inv_service_id",
    // plannedCampaign: "inv_service_id",
  };

  let filter = userSelectionFilters(userSelection, userSelectionFields);
  let filterDates = sqlDateQueries(filter, "audit_datetime_init");
  let intervalFields = sqlIntervalFields(
    filter,
    "audit_datetime_init",
    userSelection.interval ? userSelection.interval.minute : ""
  );
  let group_interval =
    !filter.interval || filter.interval === "00:00:00"
      ? ""
      : "GROUP BY interval_init";
  let main_where =
    filter.agent +
    filter.supervisor +
    filter.role +
    filter.schedule +
    filter.assignation +
    filter.auxiliar;

  let audit_queues = 
  filter.client +
  filter.service +
  filter.queue;

  let query = `
    SELECT 1

      ${intervalFields}

    ,${selectFieldQuery}
      
      FROM
         MainAudit

         LEFT OUTER JOIN  InvAgent
          ON audit_agent_id = inv_agent_id
      
         LEFT OUTER JOIN HcaAgent
          ON audit_date = hca_agent_date
          AND audit_agent_id = hca_agent_id 
              

      WHERE 1
          ${filterDates}
          ${main_where}
    
      AND
          ${aditionalFilterFieldQuery}

      ${group_interval}
      ${filter.groupBy}
      ${filter.orderBy}
      ${filter.limitBy}

          `;

  
  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    resume_error = true;
    return {
      error: "callEntry - callEntryFunction " + error
    };
  }
}