import { Component, OnInit, Input } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-display-inbound-breaks-auxiliar",
  templateUrl: "./display-inbound-breaks-auxiliar.component.html",
  styleUrls: ["./display-inbound-breaks-auxiliar.component.scss"]
})
export class DisplayInboundBreaksAuxiliarComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  openModal(content) {
    this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "modal-basic-title"
    });
  }

  selectLine(content, id) {
    this.userSelection.selected_break = id;
    this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "modal-basic-title"
    });

    // console.error('name',id, this.userSelection);
  }
}
