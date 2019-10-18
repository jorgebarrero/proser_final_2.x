import { Component, OnInit, EventEmitter, Output } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";
import { UserSelectionModel } from "shared/models";

@Component({
  selector: "app-reports-audit-report",
  templateUrl: "./audit-report.component.html",
  styleUrls: ["./audit-report.component.scss"]
})
export class AuditReportComponent implements OnInit {
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
    this.title = "Reporte de Audit";
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.assignation = true;
    this.selectorVisibleFields.auxiliar = true;
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
  }
}

// @Output() refresh = new EventEmitter();
// onReturnResult(event) {
//   console.error("event", event);
//   this.userSelection = event.userSelection;
//   this.refresh.emit("resfresh");
// }
