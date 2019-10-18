import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { UserSelectionModel } from "shared/models";

import { InboundIndicators } from "aux/dashboard/InboundIndicators";

import { InvScaleService } from "shared/services/crud/inv/inv-scale.service";
import { InvScaleModel } from "shared/models";

@Component({
  selector: "app-display-inbound-highlights-historic",
  templateUrl: "./display-inbound-highlights-historic.component.html",
  styleUrls: ["./display-inbound-highlights-historic.component.scss"]
})
export class DisplayInboundHighlightsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  constructor(private invScaleService: InvScaleService) {}

  ngOnInit() {}

  onExtractVariables(rows) {}

  onColorClass(color) {
    return `indicator-cell ${color}`;
  }
}
