import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { UserSelectionModel } from "shared/models";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

import { InboundIndicators } from "aux/dashboard/InboundIndicators";

import { InvScaleService } from "shared/services/crud/inv/inv-scale.service";
import { InvScaleModel } from "shared/models";

@Component({
  selector: "app-dashboard-inbound-highlights-historic",
  templateUrl: "./dashboard-inbound-highlights-historic.component.html",
  styleUrls: ["./dashboard-inbound-highlights-historic.component.scss"]
})
export class DashboardInboundHighlightsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  modalView;

  // Modal window variables
  activeModal: NgbActiveModal;

  argument;

  constructor(
    private invScaleService: InvScaleService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {}

  onExtractVariables(rows) {}

  onColorClass(color) {
    return `indicator-cell ${color}`;
  }

  // Show modal detail window
  openDetailModal(content, selected) {
    this.argument = selected;
    this.modalView = selected;
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }
}
