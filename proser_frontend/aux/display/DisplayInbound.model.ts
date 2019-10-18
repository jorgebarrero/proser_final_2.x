import { DisplayCallsIndicatorsModel } from "./DisplayCallsIndicators.model";
import { DisplayAgentsIndicatorsModel } from "./DisplayAgentsIndicators.model";

export class DisplayInboundModel {
  displayCallsIndicators;
  displayAgentsIndicators;

  constructor() {
    this.displayCallsIndicators = new DisplayCallsIndicatorsModel();
    this.displayAgentsIndicators = new DisplayAgentsIndicatorsModel();
  }
}
