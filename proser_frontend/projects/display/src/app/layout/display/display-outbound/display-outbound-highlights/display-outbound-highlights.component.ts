import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { UserSelectionModel } from "shared/models";

import { OutboundIndicators } from "projects/dashboard/src/app/shared/models";

import { InvScaleService } from "shared/services/crud/inv/inv-scale.service";
import { InvScaleModel } from "shared/models";

@Component({
  selector: "app-display-outbound-highlights",
  templateUrl: "./display-outbound-highlights.component.html",
  styleUrls: ["./display-outbound-highlights.component.scss"]
})
export class DisplayOutboundHighlightsComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  constructor(private invScaleService: InvScaleService) {}

  ngOnInit() {}

  onExtractVariables(rows) {}

  onColorClass(color) {
    return `indicator-cell ${color}`;
  }
}
