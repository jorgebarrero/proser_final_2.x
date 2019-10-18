import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { UserSelectionModel } from "shared/models";

// Installed modules
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-dashboard-dashboard-outbound-breaks-assignations-historic',
  templateUrl: './dashboard-outbound-breaks-assignations-historic.component.html',
  styleUrls: ['./dashboard-outbound-breaks-assignations-historic.component.scss']
})
export class DashboardOutboundBreaksAssignationsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  modalView;

  // Modal window variables
  activeModal: NgbActiveModal;

  argument;

  constructor(
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

