export class DisplayAgentsIndicatorsModel {
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
    this.agentsPlannedTotal = [{ agentsPlannedTotal: 0 }];
    this.agentsConnectedTotal = [{ agentsConnectedTotal: 0 }];
    this.agentsEffectiveTotal = [{ agentsEffectiveTotal: 0 }];

    this.agentsAsignedTotal = [{ agentsAsignedTotal: 0 }];
    this.agentsBreakTotal = [{ agentsBreakTotal: 0 }];
    this.agentsAvailableTotal = [{ agentsAvailableTotal: 0 }];
    this.agentsOccupiedTotal = [{ agentsOccupiedTotal: 0 }];

    this.agentsConnectedByGroup = [{ agentsConnectedByGroup: 0 }];
    this.agentsBreakResume = [{ agentsBreakResume: 0 }];
    this.agentsAssignationResume = [{ agentsAssignationResume: 0 }];
  }
}
