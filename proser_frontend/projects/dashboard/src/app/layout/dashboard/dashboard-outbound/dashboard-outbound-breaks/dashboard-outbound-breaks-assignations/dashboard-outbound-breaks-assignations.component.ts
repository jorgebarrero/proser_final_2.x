import { Component, OnInit, Input } from "@angular/core";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dashboard-outbound-breaks-assignations",
  templateUrl: "./dashboard-outbound-breaks-assignations.component.html",
  styleUrls: ["./dashboard-outbound-breaks-assignations.component.scss"]
})
export class DashboardOutboundBreaksAssignationsComponent implements OnInit {
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
