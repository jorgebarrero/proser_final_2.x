import { Component, OnInit, Input } from "@angular/core";
import { UserSelectionModel } from "shared/models";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
import { OutboundIndicators } from "projects/dashboard/src/app/shared/models";

@Component({
  selector: "app-dashboard-outbound-calls",
  templateUrl: "./dashboard-outbound-calls.component.html",
  styleUrls: ["./dashboard-outbound-calls.component.scss"]
})
export class DashboardOutboundCallsComponent implements OnInit {
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
