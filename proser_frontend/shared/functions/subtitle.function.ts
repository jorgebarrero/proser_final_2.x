import { UserSelectionModel } from "shared/models";

export function selectorOptionSubtitles(userSelection: UserSelectionModel) {
  let result = "";

  let client = ""; // userSelection.client;
  let queue = ""; // userSelection.queue;
  let service = ""; // userSelection.service;
  let campaign = ""; // userSelection.campaign;
  let supervisor = ""; // userSelection.supervisor;
  let agent = ""; // userSelection.agent;
  let schedule = ""; // userSelection.schedule;
  let role = ""; // userSelection.schedule;

  let plannedAgent = "";
  let plannedSupervisor = "";

  // CLIENT
  const preClient = userSelection.client
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preClient.length > 0 ? (client = "Cliente:(" + preClient + ")") : "";

  // QUEUE
  const preQueue = userSelection.queue
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preQueue.length > 0 ? (queue = "Cola:(" + preQueue + ")") : "";

  // SERVICE
  const preService = userSelection.service
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preService.length > 0 ? (service = "Servicio(" + preService + ")") : "";

  // CAMPAIGN
  const preCampaign = userSelection.campaign
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preCampaign.length > 0 ? (campaign = "Campaña:(" + preCampaign + ")") : "";

  // SUPERVISOR
  const preSupervisor = userSelection.supervisor
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preSupervisor.length > 0
    ? (supervisor = "Supervisor:(" + preSupervisor + ")")
    : "";

  // AGENT
  const preAgent = userSelection.agent
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preAgent.length > 0 ? (agent = "Agente:(" + preAgent + ")") : "";

  // SCHEDULE
  const preSchedule = userSelection.schedule
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preSchedule.length > 0 ? (schedule = "Turno:(" + preSchedule + ")") : "";

  // ROLE
  const preRole = userSelection.role
    .map(x => {
      return x ? x.name : "";
    })
    .join(" / ");
  preRole.length > 0 ? (role = "Rol:(" + preRole + ")") : "";

  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  const preResult = [];
  preResult.push(
    client,
    queue,
    service,
    campaign,
    supervisor,
    agent,
    schedule,
    role
  );

  // ADD AND AND REMOVE EMPTY STRINGS
  const preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` - `);

  result = preResultFixed.length > 0 ? preResultFixed : "";

  return result;
}
