export class DashboardOutboundResponseModel {
  dashboardOutboundCallsIndicators: [
    {
      now;
      day_name;
      week_day;
      start_date;
      start_time;
      end_time;
      outboundMade;
      outboundFail;
      outboundAnswered;
      outboundEffective;
      outboundHungout;
      outboundContactLevel;
      outboundEffectiveLevel;
      operation_seconds;
      operation_time;
      outboundTMO;
    }
  ];
  dashboardOutboundCurrentCallsInicators: [
    {
      now;
      callsActive;
      callsOnQueue;
    }
  ];
  agentsPlannedTotal: [
    {
      now;
      agentsPlannedTotal;
    }
  ];
  agentsConnectedTotal: [
    {
      now;
      agentsConnectedTotal;
      agentsEffectiveTotal;
    }
  ];

  agentsLoggedTotal: [
    {
      now;
      agentsConnectedTotal;
      agentsEffectiveTotal;
    }
  ];

  agentsConnectedByGroup: [
    {
      now;
      name;
      color;
      value;
    }
  ];

  agentHistoricResume: [
    {
      now;
      concept;
      count_agents;
      duration_agents;
      average_agents;
    }
  ];

  agentsAuxiliarResume: [
    {
      now;
      name;
      id;
      value;
      duration;
    }
  ];
  agentsAssignationResume: [
    {
      now;
      name;
      id;
      value;
      duration;
    }
  ];
  scale: any;
  colors: any;

  constructor() {
    this.dashboardOutboundCallsIndicators = [
      {
        now: "",
        day_name: "",
        week_day: "",
        start_date: "",
        start_time: "",
        end_time: "",
        outboundMade: "",
        outboundFail: "",
        outboundAnswered: "",
        outboundEffective: "",
        outboundHungout: "",
        outboundContactLevel: "",
        outboundEffectiveLevel: "",
        operation_seconds: "",
        operation_time: "",
        outboundTMO: "",
        }
    ];

    this.dashboardOutboundCurrentCallsInicators = [
      {
        now: "",
        callsActive: "",
        callsOnQueue: ""
      }
    ];

    this.agentsPlannedTotal = [
      {
        now: "",
        agentsPlannedTotal: ""
      }
    ];

    this.agentsConnectedTotal = [
      {
        now: "",
        agentsConnectedTotal: "",
        agentsEffectiveTotal: ""
      }
    ];

    this.agentsLoggedTotal = [
      {
        now: "",
        agentsConnectedTotal: "",
        agentsEffectiveTotal: ""
      }
    ];

    this.agentsConnectedByGroup = [
      {
        now: "",
        name: "",
        color: "",
        value: null
      }
    ];

    this.agentHistoricResume = [
      {
        now: "",
        concept: "",
        count_agents: "",
        duration_agents: "",
        average_agents: ""
      }
    ];

    this.agentsAuxiliarResume = [
      {
        now: "",
        name: "",
        id: "",
        value: "",
        duration: ""
      }
    ];

    this.agentsAssignationResume = [
      {
        now: "",
        name: "",
        id: "",
        value: "",
        duration: ""
      }
    ];
  }
}
