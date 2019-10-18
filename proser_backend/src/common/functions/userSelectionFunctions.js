export function userSelectionBlank(userSelection) {
  console.log("userSelection", userSelection);

  let result = null;

  result = {
    title: "Test",
    entity_selection: "selection",
    options: "",
    legend: "",
    login: { id: 0, name: username, profile: profile },
    mode: { id: 0, name: Actual },
    type: { id: 0, name: Ejecutado },
    start_date: { year: 2019, month: 8, day: 22 },
    end_date: { year: 2019, month: 8, day: 22 },
    start_time: null,
    end_time: null,
    auxiliar: [],
    assignation: [],
    client: [],
    queue: [],
    service: [],
    campaign: [],
    plannedClient: [],
    plannedQueue: [],
    plannedService: [],
    plannedCampaign: [],
    plannedSupervisor: [],
    plannedAgent: [],
    supervisor: [],
    agent: [],
    role: [],
    schedule: [],
    last_minutes: null,
    interval: null,
    groupBy: {},
    orderBy: {},
    limitBy: {}
  };

  return result;
}
