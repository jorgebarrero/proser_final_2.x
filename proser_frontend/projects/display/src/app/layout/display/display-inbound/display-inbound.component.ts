import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-display-display-inbound",
  templateUrl: "./display-inbound.component.html",
  styleUrls: ["./display-inbound.component.scss"]
})
export class DisplayInboundComponent implements OnInit {
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;
  title;

  constructor(
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService
  ) {
    this.userSelection = this.userSelectionService.readUserSelection(
      "proser_store"
    );
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.title = "Display llamadas entrantes";
  }

  ngOnInit() {
    if (this.userSelection.title !== this.title) {
      this.setReportTitles();
    }

    this.userSelection.title = this.title;

    console.log("this.title", this.title);
  }

  setReportTitles() {
    // this.userSelection = new UserSelectionModel("standard");
    this.userSelection.title = this.title;
    // //
    // //
    // this.userSelectionService.writeUserSelection(this.userSelection);

    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
  }
}
