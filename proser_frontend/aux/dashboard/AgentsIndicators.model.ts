export class AgentsIndicatorsModel {
  agentsPlannedTotal;
  agentsConnectedTotal;
  agentsEffectiveTotal;

  agentsAsignedTotal;
  agentsBreakTotal;
  agentsAvailableTotal;
  agentsOccupiedTotal;

  agentsConnectedByGroup;
  agentsBreakResume;
  agentsAssignationResume;

  constructor() {
    this.agentsPlannedTotal =  [{data: 0}];
    this.agentsConnectedTotal =  [{data: 0}];
    this.agentsEffectiveTotal =  [{data: 0}];

    this.agentsAsignedTotal  =  [{data: 0}];
    this.agentsBreakTotal =  [{data: 0}];
    this.agentsAvailableTotal  =  [{data: 0}];
    this.agentsOccupiedTotal  =  [{data: 0}];

    this.agentsConnectedByGroup =  [{data: 0}];
    this.agentsBreakResume  =  [{data: 0}];
    this.agentsAssignationResume  =  [{data: 0}];

  }
}
