import { Component, OnInit, Input } from "@angular/core";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-dashboard-outbound-breaks-auxiliar",
  templateUrl: "./dashboard-outbound-breaks-auxiliar.component.html",
  styleUrls: ["./dashboard-outbound-breaks-auxiliar.component.scss"]
})
export class DashboardOutboundBreaksAuxiliarComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  modalView;

  // Modal window variables
  activeModal: NgbActiveModal;

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
