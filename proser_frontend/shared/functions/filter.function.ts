import { UserSelectionModel } from "shared/models";

export function sqlFilterHcaAgent(userSelection: UserSelectionModel) {
  let result = "";

  let supervisor = ""; // userSelection.supervisor;
  let agent = ""; // userSelection.agent;
  let schedule = ""; // userSelection.schedule;
  let substitute = ""; // userSelection.substitute;

  // SUPERVISOR
  const preSupervisor = userSelection.supervisor
    .map(x => {
      return "hca_agent_supervisor_id = " + x.id;
    })
    .join(" OR ");
  preSupervisor.length > 0 ? (supervisor = "(" + preSupervisor + ")") : "";

  // AGENT
  const preAgent = userSelection.agent
    .map(x => {
      return "hca_agent_agent_id = " + x.id;
    })
    .join(" OR ");
  preAgent.length > 0 ? (agent = "(" + preAgent + ")") : "";

  // SCHEDULE
  const preSchedule = userSelection.schedule
    .map(x => {
      return "hca_agent_schedule_id = " + x.id;
    })
    .join(" OR ");
  preSchedule.length > 0 ? (schedule = "(" + preSchedule + ")") : "";


  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  const preResult = [];
  preResult.push(supervisor, agent, schedule, substitute);

  // ADD AND AND REMOVE EMPTY STRINGS
  const preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` AND `);

  result = preResultFixed.length > 0 ? preResultFixed : "1";

  return result;
}

export function sqlFilterHcaQueue(userSelection: UserSelectionModel) {
  let result = "";

  let client = ""; // userSelection.client;
  let queue = ""; // userSelection.queue;
  let service = ""; // userSelection.service;
  let campaign = ""; // userSelection.campaign;

  // CLIENT
  const preClient = userSelection.client
    .map(x => {
      return "hca_queue_client_id = " + x.id;
    })
    .join(" OR ");
  preClient.length > 0 ? (client = "(" + preClient + ")") : "";

  // QUEUE
  const preQueue = userSelection.queue
    .map(x => {
      return "hca_queue_number = " + x.id;
    })
    .join(" OR ");
  preQueue.length > 0 ? (queue = "(" + preQueue + ")") : "";

  // SERVICE
  const preService = userSelection.service
    .map(x => {
      return "hca_queue_service_number = " + x.id;
    })
    .join(" OR ");
  preService.length > 0 ? (service = "(" + preService + ")") : "";

  // CAMPAIGN
  const preCampaign = userSelection.campaign
    .map(x => {
      return "inv_campaign_id = " + x.id;
    })
    .join(" OR ");
  preCampaign.length > 0 ? (campaign = "(" + preCampaign + ")") : "";

  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  const preResult = [];
  preResult.push(client, queue, service, campaign);

  // ADD AND AND REMOVE EMPTY STRINGS
  const preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` AND `);

  result = preResultFixed.length > 0 ? preResultFixed : "1";

  return result;
}

export function sqlFilterInvAgent(userSelection: UserSelectionModel) {
  let result = "";

  let supervisor = ""; // userSelection.supervisor;
  let agent = ""; // userSelection.agent;
  let schedule = ""; // userSelection.schedule;
  let substitute = ""; // userSelection.substitute;

  // SUPERVISOR
  const preSupervisor = userSelection.supervisor
    .map(x => {
      return "inv_agent_supervisor_id = " + x.id;
    })
    .join(" OR ");
  preSupervisor.length > 0 ? (supervisor = "(" + preSupervisor + ")") : "";

  // AGENT
  const preAgent = userSelection.agent
    .map(x => {
      return "inv_agent_id = " + x.id;
    })
    .join(" OR ");
  preAgent.length > 0 ? (agent = "(" + preAgent + ")") : "";

  // SCHEDULE
  const preSchedule = userSelection.schedule
    .map(x => {
      return "inv_agent_schedule_id = " + x.id;
    })
    .join(" OR ");
  preSchedule.length > 0 ? (schedule = "(" + preSchedule + ")") : "";


  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  const preResult = [];
  preResult.push(supervisor, agent, schedule, substitute);

  // ADD AND AND REMOVE EMPTY STRINGS
  const preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` AND `);

  result = preResultFixed.length > 0 ? preResultFixed : "1";

  return result;
}

export function sqlFilterInvQueue(userSelection: UserSelectionModel) {
  let result = "";

  let client = ""; // userSelection.client;
  let queue = ""; // userSelection.queue;
  let service = ""; // userSelection.service;
  let campaign = ""; // userSelection.campaign;

  // CLIENT
  const preClient = userSelection.client
    .map(x => {
      return "inv_queue_client_id = " + x.id;
    })
    .join(" OR ");
  preClient.length > 0 ? (client = "(" + preClient + ")") : "";

  // QUEUE
  const preQueue = userSelection.queue
    .map(x => {
      return "inv_queue_number = " + x.id;
    })
    .join(" OR ");
  preQueue.length > 0 ? (queue = "(" + preQueue + ")") : "";

  // SERVICE
  const preService = userSelection.service
    .map(x => {
      return "inv_queue_service_id = " + x.id;
    })
    .join(" OR ");
  preService.length > 0 ? (service = "(" + preService + ")") : "";

  // CAMPAIGN
  const preCampaign = userSelection.campaign
    .map(x => {
      return "inv_campaign_id = " + x.id;
    })
    .join(" OR ");
  preCampaign.length > 0 ? (campaign = "(" + preCampaign + ")") : "";

  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  const preResult = [];
  preResult.push(client, queue, service, campaign);

  // ADD AND AND REMOVE EMPTY STRINGS
  const preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` AND `);

  result = preResultFixed.length > 0 ? preResultFixed : "1";

  return result;
}
