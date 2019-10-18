import { Component, OnInit, Input } from "@angular/core";
import { UserSelectionModel } from "shared/models";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { InboundIndicators } from "aux/dashboard/InboundIndicators";

@Component({
  selector: "app-display-inbound-calls",
  templateUrl: "./display-inbound-calls.component.html",
  styleUrls: ["./display-inbound-calls.component.scss"]
})
export class DisplayInboundCallsComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {
    // console.error('displayInboundCallsIndicators', this.displayInboundCallsIndicators);
  }

  openModal(content) {
    this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "modal-basic-title"
    });
  }
}
