import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { UserSelectionModel } from "shared/models";

import { InboundIndicators } from "aux/dashboard/InboundIndicators";

import { InvScaleService } from "shared/services/crud/inv/inv-scale.service";
import { InvScaleModel } from "shared/models";

@Component({
  selector: "app-display-inbound-highlights",
  templateUrl: "./display-inbound-highlights.component.html",
  styleUrls: ["./display-inbound-highlights.component.scss"]
})
export class DisplayInboundHighlightsComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  constructor(private invScaleService: InvScaleService) {}

  ngOnInit() {}

  onExtractVariables(rows) {}

  onColorClass(color) {
    return `indicator-cell ${color}`;
  }
}
