import { Component, OnInit, Input } from "@angular/core";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dashboard-inbound-breaks-assignations",
  templateUrl: "./dashboard-inbound-breaks-assignations.component.html",
  styleUrls: ["./dashboard-inbound-breaks-assignations.component.scss"]
})
export class DashboardInboundBreaksAssignationsComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  modalView;

  // Modal window variables
  activeModal: NgbActiveModal;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openModal(content) {
    this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "modal-basic-title"
    });
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
