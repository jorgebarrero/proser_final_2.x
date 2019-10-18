import * as pool from "../../../connectors/pool";
// import {
//   userSelectionFilters,
//   userSelectionSqlFunction
// } from "../InvMenu/userSelection/userSelectionFilters";
// import { sqlDateQueries, sqlIntervalFields } from "./inboundFunctions";

// export async function callEntry(userSelection, selectField, aditionalFilterField) {
//   let result_final = {};
//   let resume_error = false;

export async function callEntryFunction(
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
    agent: "hca_agent_id",
    supervisor: "hca_agent_people_json",
    role: "hca_agent_role_json",
    schedule: "hca_agent_schedule_json",
    client: "hca_queue_client_json",
    service: "hca_queue_service_json",
    queue: "hca_queue_id",
    campaign: "inv_campaign_id"
    // plannedClient: "inv_service_id",
    // plannedQueue: "inv_service_id",
    // plannedService: "inv_service_id",
    // plannedCampaign: "inv_service_id",
  };

  let filter = userSelectionFilters(userSelection, userSelectionFields);
  let filterDates = sqlDateQueries(filter, "callentry_datetime_entry_queue");
  let intervalFields = sqlIntervalFields(
    filter,
    "callentry_datetime_entry_queue",
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
    filter.client +
    filter.service +
    filter.queue +
    filter.campaign +
    " 1";

  let query = `
    SELECT 1

      ${intervalFields}

    ,${selectFieldQuery}
      
      FROM
         MainCallEntry

         LEFT OUTER JOIN  InvAgent
          ON callentry_agent_id = inv_agent_id
      
         LEFT OUTER JOIN InvQueue
          ON callentry_queue_id = inv_queue_id
      
         LEFT OUTER JOIN HcaAgent
          ON callentry_date = hca_agent_date
          AND callentry_agent_id = hca_agent_id
      
         LEFT OUTER JOIN HcaQueue
          ON callentry_date = hca_queue_date
          AND callentry_queue_id = hca_queue_id

         LEFT OUTER JOIN  InvCampaign
          ON callentry_campaign_id = inv_campaign_id

      WHERE 1
          ${filterDates}
      AND
         ${main_where}

      AND
          ${aditionalFilterFieldQuery}

      ${group_interval}
      ${filter.groupBy}
      ${filter.orderBy}
      ${filter.limitBy}

          `;

  // AND
  // ${main_where}
  // ${filter.groupBy}
  // ${filter.orderBy}
  // ${filter.limitBy}


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

//   return callEntryFunction(userSelection);
// }
