async function sqlFilter(userSelection) {

  let result = "";

  let client = ""; // userSelection.client;
  let queue = ""; // userSelection.queue;
  let service = ""; // userSelection.service;
  let campaign = ""; // userSelection.campaign;
  let supervisor = ""; // userSelection.supervisor;
  let agent = ""; // userSelection.agent;
  let schedule = ""; // userSelection.schedule;
  let substitute = ""; // userSelection.substitute;

  //   let userSelectionObject = {
  //       client: JSON.parse(userSelection.client),
  //       queue: JSON.parse(userSelection.queue),
  //       service: JSON.parse(userSelection.service),
  //       campaign: JSON.parse(userSelection.campaign),
  //       supervisor: JSON.parse(userSelection.supervisor),
  //       agent: JSON.parse(userSelection.agent),
  //       schedule: JSON.parse(userSelection.schedule),
  //       substitute: JSON.parse(userSelection.substitute)
  //   }

  let userSelectionObject = userSelection;



  // CLIENT
  let preClient = userSelectionObject.client
    .map(x => {
      return "hca_queue_client_id = " + x.id;
    })
    .join(" OR ");
  preClient.length > 0 ? (client = "(" + preClient + ")") : "";

  // QUEUE
  let preQueue = userSelectionObject.queue
    .map(x => {
      return "hca_queue_number = " + x.id;
    })
    .join(" OR ");
  preQueue.length > 0 ? (queue = "(" + preQueue + ")") : "";

  // SERVICE
  let preService = userSelectionObject.service
    .map(x => {
      return "hca_queue_service_number = " + x.id;
    })
    .join(" OR ");
  preService.length > 0 ? (service = "(" + preService + ")") : "";

  // CAMPAIGN
  // let preCampaign = userSelectionObject.campaign
  //   .map( x => {
  //     return 'inv_campaign_id = ' + x.id;
  //   })
  //   .join(' OR ');
  // preCampaign.length > 0? campaign = '('+ preCampaign + ')': '';

  // SUPERVISOR
  let preSupervisor = userSelectionObject.supervisor
    .map(x => {
      return (
        'JSON_UNQUOTE(JSON_EXTRACT(hca_agent_people_json, "$[0].id") ) as hca_agent_supervisor_id = ' +
        x.id
      );
    })
    .join(" OR ");
  preSupervisor.length > 0 ? (supervisor = "(" + preSupervisor + ")") : "";

  // AGENT
  let preAgent = userSelectionObject.agent
    .map(x => {
      return "hca_agent_id = " + x.id;
    })
    .join(" OR ");
  preAgent.length > 0 ? (agent = "(" + preAgent + ")") : "";

  // SCHEDULE
  let preSchedule = userSelectionObject.schedule
    .map(x => {
      return "hca_agent_schedule_id = " + x.id;
    })
    .join(" OR ");
  preSchedule.length > 0 ? (schedule = "(" + preSchedule + ")") : "";

  // SUBSTITUTE
  // let preSubstitute = userSelectionObject.substitute
  //   .map( x => {
  //     return 'hca_agent_substitute_id = ' + x.id;
  //   })
  //   .join(' OR ');
  // preSubstitute.length > 0? substitute = '('+ preSubstitute + ')': '';

  /*********************************************************************************** */
  //  CONVERTION TO ARRAY OS STRINGS
  let preResult = [];
  preResult.push(
    client,
    queue,
    service,
    campaign,
    supervisor,
    agent,
    schedule,
    substitute
  );

  // ADD AND AND REMOVE EMPTY STRINGS
  let preResultFixed = preResult
    .filter(x => {
      return x.length;
    })
    .join(` AND `);
  result = preResultFixed.length > 0 ? preResultFixed : 1;

  return result;
}

export { sqlFilter };
