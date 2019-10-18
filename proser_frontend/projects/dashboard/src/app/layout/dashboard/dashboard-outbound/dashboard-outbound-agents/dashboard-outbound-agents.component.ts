import { Component, OnInit, Input } from "@angular/core";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dashboard-outbound-agents",
  templateUrl: "./dashboard-outbound-agents.component.html",
  styleUrls: ["./dashboard-outbound-agents.component.scss"]
})
export class DashboardOutboundAgentsComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  rows_detail;
  rows_detail_original;
  rows_detail_total;
  row_selection;
  rows_original;

  // Modal window variables
  activeModal: NgbActiveModal;

  modalView;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  // Show modal detail window
  openDetailModal(content, selected) {
    this.modalView = selected;
  

    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }
}

