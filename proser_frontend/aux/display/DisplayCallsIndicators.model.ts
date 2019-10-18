export class DisplayCallsIndicatorsModel {
  inboundAbandonLevelTotal;
  inboundAbandonedTotal;
  inboundActiveTotal;
  inboundAsaTotal;
  inboundAttendedTotal;
  inboundAtentionLevelTotal;
  inboundBeforeTimeTotal;
  inboundHungAgentTotal;
  inboundLostCallsTotal;
  inboundOnQueTotal;
  inboundReceivedTotal;
  inboundServiceLevelTotal;
  inboundShortTotal;
  inboundTmoTotal;
  // inboundIndicatorsInterval;

  constructor() {
    this.inboundAbandonLevelTotal = [{ inboundAbandonLevelTotal: 0 }];
    this.inboundAbandonedTotal = [{ inboundAbandonedTotal: 0 }];
    this.inboundActiveTotal = [{ inboundActiveTotal: 0 }];
    this.inboundAsaTotal = [
      { waitDuration: 0, totalAttended: 0, inboundCalls: 0, inboundAsaTotal: 0 }
    ];
    this.inboundAttendedTotal = [{ inboundAttendedTotal: 0 }];
    this.inboundAtentionLevelTotal = [
      { inboundAtentionLevelTotal: 0, AttendedCalls: 0, totalCalls: 0 }
    ];
    this.inboundBeforeTimeTotal = [
      { idealAttendingTime: 0, inboundBeforeTimeTotal: 0 }
    ];
    this.inboundHungAgentTotal = [{ inboundHungAgentTotal: 0 }];
    this.inboundLostCallsTotal = [{ inboundLostCallsTotal: 0 }];

    this.inboundOnQueTotal = [
      { inboundOnQueTotal: 0, waitTime: 0, idealTime: 0 }
    ];
    this.inboundReceivedTotal = [{ inboundReceivedTotal: 0 }];
    this.inboundServiceLevelTotal = [
      {
        inboundServiceLevelTotal: 0,
        idealAttendingTime: 0,
        beforeTimeAttendedCalls: 0
      }
    ];
    this.inboundShortTotal = [{ inboundShortTotal: 0, shortCallTime: 0 }];
    this.inboundTmoTotal = [
      {
        inboundTmoTotal: 0,
        inboundDuration: 0,
        inboundDurationhHms: "00:00:00",
        inboundCalls: 0
      }
    ];
    // this.inboundIndicatorsInterval = [{ inboundIndicatorsInterval: 0 }];
  }
}
