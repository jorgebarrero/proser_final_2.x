import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-reports-current-agents-report",
  templateUrl: "./current-agents-report.component.html",
  styleUrls: ["./current-agents-report.component.scss"]
})
export class CurrentAgentsReportComponent implements OnInit {
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
    this.title = "Agentes actuales";
  }

  ngOnInit() {
    if (this.userSelection.title !== this.title) {
      this.setReportTitles();
    }
  }

  setReportTitles() {
    // this.userSelection = new UserSelectionModel("standard");
    this.userSelection.title = this.title;
    //
    // //
    this.userSelectionService.writeUserSelection(this.userSelection);

    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
  }
}
