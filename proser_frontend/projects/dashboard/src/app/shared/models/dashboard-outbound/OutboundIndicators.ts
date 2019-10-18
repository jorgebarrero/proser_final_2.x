export class OutboundIndicators {

    outboundMadeTotal;
    outboundFailTotal;
    outboundAnsweredTotal;
    outboundEffectiveTotal;
    outboundHungoutTotal;
    outboundContactLevel;
    outboundEffectiveLevel;
    outboundTMO;

    constructor() {
      this.outboundMadeTotal =  [{data: 0}];
      this.outboundFailTotal =  [{data: 0}];
      this.outboundAnsweredTotal =  [{data: 0}];
      this.outboundEffectiveTotal =  [{data: 0}];
      this.outboundHungoutTotal =  [{data: 0}];
      this.outboundContactLevel =  [{data: 0}];
      this.outboundEffectiveLevel =  [{data: 0}];
      this.outboundTMO =  [{data: 0}];
      
    }
}
