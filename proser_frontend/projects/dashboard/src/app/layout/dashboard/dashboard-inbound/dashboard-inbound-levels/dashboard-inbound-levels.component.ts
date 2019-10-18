import { Component, OnInit, Input } from "@angular/core";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

import { InboundIndicators } from "aux/dashboard/InboundIndicators";

import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-dashboard-inbound-levels",
  templateUrl: "./dashboard-inbound-levels.component.html",
  styleUrls: ["./dashboard-inbound-levels.component.scss"]
})
export class DashboardInboundLevelsComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  argument;

  modalView;

  // Modal window variables
  activeModal: NgbActiveModal;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // console.error("userSelection", this.userSelection.mode.name);
  }

  // Show modal detail window
  openDetailModal(content, selected) {
    this.argument = selected;

    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }
}
