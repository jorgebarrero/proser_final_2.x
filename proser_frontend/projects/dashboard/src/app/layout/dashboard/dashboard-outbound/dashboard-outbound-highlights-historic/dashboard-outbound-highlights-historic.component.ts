import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { UserSelectionModel } from "shared/models";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

import { OutboundIndicators } from "projects/dashboard/src/app/shared/models";

import { InvScaleService } from "shared/services/crud/inv/inv-scale.service";
import { InvScaleModel } from "shared/models";

@Component({
  selector: "app-dashboard-outbound-highlights-historic",
  templateUrl: "./dashboard-outbound-highlights-historic.component.html",
  styleUrls: ["./dashboard-outbound-highlights-historic.component.scss"]
})
export class DashboardOutboundHighlightsHistoricComponent implements OnInit {
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

  onCloseModal() {
    console.log("closing... destiny");
    this.activeModal.close();
  }

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