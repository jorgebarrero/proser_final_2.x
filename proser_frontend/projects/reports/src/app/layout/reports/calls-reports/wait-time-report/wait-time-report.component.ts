import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-reports-wait-time-report",
  templateUrl: "./wait-time-report.component.html",
  styleUrls: ["./wait-time-report.component.scss"]
})
export class WaitTimeReportComponent implements OnInit {
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
    this.title = "Reporte de tiempos de espera";
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
