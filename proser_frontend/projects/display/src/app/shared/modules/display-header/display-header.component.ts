import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { EnvService, UserSelectionService } from "shared/services";

import { UserSelectionModel } from "shared/models";
import { objectDateToTextDate, textDateToObjectDate } from "shared/functions";

import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-display-display-header",
  templateUrl: "./display-header.component.html",
  styleUrls: ["./display-header.component.scss"]
})
export class DisplayHeaderComponent implements OnInit {
  @Output() returnResult = new EventEmitter();

  @Input() userSelection;
  @Input() selectorVisibleFields;
  @Input() timerConnected;

  activeModal: NgbActiveModal;
  local_store;
  env;

  rows;
  rows_original;

  constructor(
    private envService: EnvService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService
  ) {
    this.env = this.envService;
    this.userSelection = new UserSelectionModel("standard");
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.local_store = "assignation";
  }

  ngOnInit() {}

  onUserSelectionText() {
    let data = new UserSelectionModel("standard");
    data.start_date = objectDateToTextDate(this.userSelection.start_date);
    data.end_date = objectDateToTextDate(this.userSelection.end_date);

    return data;
  }

  openModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  // updateSelection($event) {
  //   this.userSelection = this.userSelectionService.readUserSelection(
  //     this.local_store
  //   );
  //   // console.error("RETURN", this.userSelection);
  // }

  // closeSelector($event) {
  //   this.userSelection = this.userSelectionService.readUserSelection(
  //     this.local_store
  //   );
  //   // console.error("CLOSED", this.userSelection);
  //   this.returnResult.emit({
  //     userSelection: this.userSelection,
  //     rows: this.rows,
  //     rows_original: this.rows_original
  //   });
  //   this.ngOnInit();
  // }

  /********************************************************* */

  openDetailModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  onCloseModal(event, closeModal) {
    this.activeModal.close();
  }

  updateSelection(event, userSelectionBack) {
    console.log("userSelectionBack", userSelectionBack);

    // closeDetailModal()

    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    // console.error("RETURN", this.userSelection);
  }

  closeSelector($event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    // console.error("CLOSED", this.userSelection);
    this.returnResult.emit({
      userSelection: this.userSelection,
      rows: this.rows,
      rows_original: this.rows_original
    });
    this.ngOnInit();
  }
}
