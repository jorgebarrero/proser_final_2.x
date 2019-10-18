// Angular import
import { Component, OnInit, Input, ViewChild } from "@angular/core";

// Installed modules
import { Observable, Subscription, timer } from "rxjs";
import * as moment from "moment";
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

// Global shared functions import
import { getUpdateFilter } from "shared/functions";
import { objectDateToTextDate, textDateToObjectDate } from "shared/functions";

// Global shared models
import { AlertModel } from "shared/models/helpers/Alert";
import { UserSelectionModel } from "shared/models";

// Global shared services
import { AlertService, EnvService } from "shared/services";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

// Local models
import { DashboardInboundResponseModel } from "projects/dashboard/src/app/shared/models/dashboard-inbound/DashboardInboundResponse.model";

// Local shared
import { DashboardInboundGraphComponent } from "../dashboard-inbound-graph/dashboard-inbound-graph.component";
import { DashboardInboundGroupsComponent } from "./../dashboard-inbound-groups/dashboard-inbound-groups.component";

import { DashboardInboundModel } from "projects/dashboard/src/app/shared/models/dashboard-inbound/DashboardInbound.model";
import { DashboardInboundIndicatorsService } from "projects/dashboard/src/app/shared/services/dashboard-inbound/dashboard-inbound-indicators.service";
import { DashboardInboundHighlightsComponent } from "../dashboard-inbound-highlights/dashboard-inbound-highlights.component";

import { DashboardInboundDailyByIntervalService } from "projects/dashboard/src/app/shared/services/dashboard-inbound/dashboard-inbound-interval.service";
import { DashboardInboundGroupsService } from "projects/dashboard/src/app/shared/services";

import { faIdBadge, faClock } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-dashboard-dashboard-inbound-list",
  templateUrl: "./dashboard-inbound-list.component.html",
  styleUrls: ["./dashboard-inbound-list.component.scss"]
})
export class DashboardInboundListComponent implements OnInit {
  // Subscription
  private subscription: Subscription = new Subscription();
  // Child components
  @ViewChild(DashboardInboundGraphComponent, { static: false })
  private childGraph: DashboardInboundGraphComponent;

  @ViewChild(DashboardInboundHighlightsComponent, { static: false })
  private highligthts: DashboardInboundHighlightsComponent;

  @ViewChild(DashboardInboundGroupsComponent, { static: false })
  private childGroup: DashboardInboundGroupsComponent;

  // Variables that come from main component
  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  // Icon
  faIdBadge = faIdBadge;
  faClock = faClock;

  // Component variables
  alertMessage = new AlertModel();
  env;

  // Selector variables
  local_store;

  // Realtime variables
  timerConnected;
  currentDate;

  // Show variables
  show_columns = false; // shows or hides a colum
  show = false; // shows or hides the table
  show_graph = false;
  show_groups = false;
  show_dashboard = true;
  selected = [];
  idealResponseTime;
  historic;
  historicLabel;

  // Filter variables
  numberOfRowsInTable;
  filterFieldList;
  initialSelectedFilterField;
  findInList;

  // Variable to dispaly values
  model: DashboardInboundModel;
  rows: DashboardInboundResponseModel;
  rows_original: DashboardInboundResponseModel;
  rows_total;
  rows_detail;
  rows_detail_original;
  rows_detail_total;
  row_selection;
  // exportName;

  // Modal window variables
  activeModal: NgbActiveModal;

  // Graph variables
  graph = false;
  rows_graph;
  rows_total_graph;
  idealResponseTime_graph;

  // Group variables
  group = false;
  rows_group;
  rows_total_group;
  idealResponseTime_group;

  // Init
  constructor(
    private dashboardInboundIndicatorsService: DashboardInboundIndicatorsService,
    private dashboardInboundDailyByIntervalService: DashboardInboundDailyByIntervalService,
    private dashboardInboundGroupsService: DashboardInboundGroupsService,
    private alertService: AlertService,
    private envService: EnvService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService
  ) {
    this.env = envService;
    this.model = new DashboardInboundModel();
    this.local_store = "assignation";
    this.selectorVisibleFields = new UserSelectionModel("visible");

    this.selectorVisibleFields.assignation = true;
    this.selectorVisibleFields.auxiliar = true;

    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.rows = new DashboardInboundResponseModel();
    this.rows_original = new DashboardInboundResponseModel();
  }

  // Start
  ngOnInit() {
    this.selectorVisibleFields.groupBy = true;
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.historic = true;
    this.historicLabel = this.onHistoric();
    this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };

    // this.exportName = "reporte-conexión";

    this.initialSelectedFilterField = {
      field_name: "start_date",
      name: "fecha_inicio",
      text: "Fecha desde"
    };

    this.onRepeat();
    this.getReportListDashboard(this.userSelection);
    this.getReportListGraph(this.userSelection);
  }

  // Finish
  ngOnDestroy() {
    this.userSelectionService.writeUserSelection(
      this.userSelection,
      this.local_store
    );
    this.subscription.unsubscribe();
  }

  onRepeat() {
    const timerComponent = timer(1000, 5000);
    const timerClock = timer(1000, 1000);

    // this.getReportListDashboard(this.userSelection);

    this.subscription.add(
      timerComponent.subscribe(() => {
        this.getReportListDashboard(this.userSelection);
      })
    );

    timerClock.subscribe(() => {
      this.timerConnected = this.timerConnected + 1;
    });
  }

  // Show modal detail window
  openDetailModal(content, selected) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  // Show or hide graph or table buttons
  onShowHideGraphButtons() {
    this.graph = !this.graph;
    this.show_dashboard = !this.show_dashboard;
  }
  // Data table activate
  onActivate(event) {
    this.row_selection = event.row;
    if (event.type === "dblclick") {
    }
  }
  // Datateable select
  onSelect(event) {
    this.selected = event.selected;
  }

  // Update on return of selector in header
  onReturnHeaderResult(event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );

    this.historic = this.userSelection.mode.value;
    this.getReportListDashboard(this.userSelection);
    this.getReportListGraph(this.userSelection);

    this.childGraph
      ? this.childGraph.generateGraph("header", this.rows_graph)
      : "";

    this.childGroup ? this.childGroup.generateGroup() : "";
  }

  // Activated by button
  onRecalculate(event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportListDashboard(this.userSelection);

    this.childGraph
      ? this.childGraph.generateGraph("button", this.rows_graph)
      : "";
  }

  // Response report finder to dashboard number of rows in table
  onReturnNumberOfRowsInTable(event) {
    console.error("event", event);
    this.numberOfRowsInTable = event;
  }

  // Response report finder
  onReturnRowsForTable(event) {
    this.rows = event;
  }

  // Helper function to expose detail fields from a row
  onObjectToArray(data) {
    let obj = data[0];

    let output;
    if (obj !== undefined) {
      output = Object.entries(obj).map(([key, value]) => ({
        key,
        value
      }));
    }
    return output;
  }

  onHistoric() {
    let result;
    if (this.historic === true) {
      result = "Histórico";
    } else {
      result = "Actual";
    }
    return result;
  }

  // temporary method to generate excel map for exporting model
  onCreateModel(model?) {
    model = new DashboardInboundModel().fieldList();

    console.error("model", model);

    let obj = {};

    model.map(x => {
      obj[`${x.name}`] = "x." + x.field_name;
    });

    let newModel = JSON.stringify(obj);
    let newModel2 = JSON.stringify(
      newModel
        .replace(/\"/g, "")
        .replace(/:/g, ": ")
        .replace(/,/g, ",\n ")
    );
    let model3 = eval(newModel2);
  }

  /**** HISTORIC *********************** */

  onShowHistoric() {
    this.show_graph = false;
    this.show_groups = false;
    this.historic = !this.historic;
    this.historicLabel = this.onHistoric();
    this.userSelection.mode = this.historic
      ? { id: 0, name: "Actual", value: true }
      : { id: 0, name: "Histórico", value: false };
  }

  /**** GROUPS *********************** */

  onShowGroups() {
    this.show_dashboard = !this.show_dashboard;
    this.show_graph = false;
    this.historic = false;
    this.show_groups = !this.show_groups;
  }

  /**** GRAPH *********************** */

  onShowGraph() {
    this.show_dashboard = !this.show_dashboard;
    this.historic = false;
    this.show_groups = false;
    this.show_graph = !this.show_graph;

    this.userSelection.interval =
      this.userSelection.interval === null
        ? {
            id: 60,
            name: "60 min",
            value: "01:00:00",
            minute: 60
          }
        : this.userSelection.interval;

    this.getReportListGraph(this.userSelection);
  }

  // Get records from backend
  getReportListGraph(userSelection) {
    if (userSelection) {
      this.dashboardInboundDailyByIntervalService
        .getReportList(userSelection)
        .subscribe(
          res => {
            this.show = false;

            this.timerConnected = 0;

            if (Array.isArray(res.detail)) {
              this.rows_graph = res.detail;
              this.rows_total_graph = res.total;
              this.idealResponseTime_graph = this.rows_total_graph[0].idealResponseTime;

              this.show = true;
              this.childGraph
                ? this.childGraph.generateGraph("service", this.rows_graph)
                : "";
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

  // Get records from backend
  getReportListDashboard(userSelection: UserSelectionModel) {
    if (userSelection) {
      this.historic = userSelection.mode.value;
      this.dashboardInboundIndicatorsService
        .getReportList(userSelection)
        .subscribe(
          (res: DashboardInboundResponseModel) => {
            this.timerConnected = 0;
            if (res) {
              this.rows = res;

              if (this.show_graph) {
                this.getReportListGraph(this.userSelection);
              }

              if (this.historic) {
                this.childGroup
                  ? this.childGroup.getReportList(this.userSelection)
                  : "";
              }
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
}
