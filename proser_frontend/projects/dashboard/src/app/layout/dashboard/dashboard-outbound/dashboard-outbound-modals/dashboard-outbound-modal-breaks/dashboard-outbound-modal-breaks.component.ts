// Angular import
import { Component, OnInit, Input } from "@angular/core";

// Global shared services
import {
  AlertService,
  EnvService,
  UserSelectionService
} from "shared/services";

// Global shared models
import { AlertModel } from "shared/models/helpers/Alert";
import { UserSelectionModel } from "shared/models";

import { DashboardSelectionModel } from "projects/dashboard/src/app/shared/models";
import { DashboardOutboundListsService } from "projects/dashboard/src/app/shared/services";

@Component({
  selector: "app-dashboard-outbound-modal-breaks",
  templateUrl: "./dashboard-outbound-modal-breaks.component.html",
  styleUrls: ["./dashboard-outbound-modal-breaks.component.scss"]
})
export class DaashboardOutboundModalBreaksComponent implements OnInit {
  @Input() userSelection;
  @Input() modalView: string;

  // Component variables
  alertMessage = new AlertModel();
  show;
  rows;
  dashboardSelection = new DashboardSelectionModel();
  local_store;
  title;

  constructor(
    private dashboardOutboundListsService: DashboardOutboundListsService,
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService
  ) {}

  ngOnInit() {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );

    this.title = this.onAddTitle(this.modalView);
    this.dashboardOutboundListCurrentBreaks(this.userSelection);
  }

  dashboardOutboundListCurrentBreaks(userSelection: UserSelectionModel) {
    this.dashboardSelection = {
      userSelection: userSelection,
      modalView: this.modalView
    };

    if (this.dashboardSelection) {
      this.dashboardOutboundListsService
        .dashboardOutboundListCurrentBreaks(this.dashboardSelection)
        .subscribe(
          res => {
            if (res) {
              this.rows = res;
            } else {
              console.error("Error", res);
            }
            this.alertMessage = new AlertModel();
          },
          error => {
            console.error("Error", error);
            this.show = false;
            this.alertService.error(error.status);
            this.alertMessage.alertTitle = "Error del servidor";
            this.alertMessage.alertText = error.statusText;
            this.alertMessage.alertShow = true;
            this.alertMessage.alertClass =
              "alert alert-danger alert-dismissible fade show";
          }
        );
    }
  }

  onActivate() {}

  onSelect() {}

  onAddTitle(modalView) {
    let result = "Lista de agentes";
    if (modalView === "asignacion") {
      result = "Lista de agentes en asignación";
    }

    if (modalView === "auxiliar") {
      result = "Lista de agentes en auxiliar";
    }

    return result;
  }
}
