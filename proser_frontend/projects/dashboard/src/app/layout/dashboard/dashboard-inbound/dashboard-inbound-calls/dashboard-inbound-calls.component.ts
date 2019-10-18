import { Component, OnInit, Input } from "@angular/core";
import { UserSelectionModel } from "shared/models";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

import { InboundIndicators } from "aux/dashboard/InboundIndicators";

@Component({
  selector: "app-dashboard-inbound-calls",
  templateUrl: "./dashboard-inbound-calls.component.html",
  styleUrls: ["./dashboard-inbound-calls.component.scss"]
})
export class DashboardInboundCallsComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  modalView;

  // Modal window variables
  activeModal: NgbActiveModal;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // console.error('dashboardInboundCallsIndicators', this.dashboardInboundCallsIndicators);
  }

  // Show modal detail window
  openDetailModal(content, selected) {
    this.modalView = selected;

    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }
}
