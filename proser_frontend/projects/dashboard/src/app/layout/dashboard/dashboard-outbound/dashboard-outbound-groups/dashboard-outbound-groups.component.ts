// Angular import
import { Component, OnInit, Input, ViewChild } from "@angular/core";

// Global shared functions import
import { getUpdateFilter } from "shared/functions";
import { objectDateToTextDate, textDateToObjectDate } from "shared/functions";

// Global shared models
import { AlertModel } from "shared/models/helpers/Alert";
import { UserSelectionModel } from "shared/models";

// Global shared services
import { AlertService, EnvService } from "shared/services";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

// Local shared
import { CallsOutboundGroupModel } from "projects/dashboard/src/app/shared/models";
import { DashboardOutboundGroupsService } from "projects/dashboard/src/app/shared/services";

@Component({
  selector: "app-dashboard-dashboard-outbound-groups",
  templateUrl: "./dashboard-outbound-groups.component.html",
  styleUrls: ["./dashboard-outbound-groups.component.scss"]
})
export class DashboardOutboundGroupsComponent implements OnInit {
  // Variables that come from main component
  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  // Component variables
  alertMessage = new AlertModel();
  env;

  // Selector variables
  local_store;

  // Realtime variables
  timerConnected;

  // Datatable variables
  show_columns = false; // shows or hides a colum
  show = false; // shows or hides the table
  selected = [];
  idealResponseTime;

  // Filter variables
  numberOfRowsInTable;
  filterFieldList;
  initialSelectedFilterField;
  findInList;

  // Variable to dispaly values
  model: CallsOutboundGroupModel;
  rows;
  rows_total;
  @Input() rows_original;
  @Input() rows_detail;
  @Input() rows_detail_original;
  @Input() rows_detail_total;
  @Input() row_selection;
  exportName;
  rows_valid;

  // Graph variables
  graph = false;
  show_graph_or_table_button = false;

  // Init
  constructor(
    private dashboardOutboundGroupsService: DashboardOutboundGroupsService,
    private alertService: AlertService,
    private envService: EnvService,

    private userSelectionService: UserSelectionService
  ) {
    this.env = envService;
    this.model = new CallsOutboundGroupModel();
    this.local_store = "assignation";
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
  }

  // Start
  ngOnInit() {
    this.generateGroup();
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    // this.getReportList(this.userSelection);
    this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.exportName = "reporte-entrante";

    this.initialSelectedFilterField = {
      field_name: "start_date",
      name: "fecha_inicio",
      text: "Fecha desde"
    };
  }

  // Finish
  ngOnDestroy() {
    this.userSelectionService.writeUserSelection(
      this.userSelection,
      this.local_store
    );
  }

  generateGroup() {
    this.userSelection = JSON.parse(
      localStorage.getItem("proser_store")
    ).userSelection;

    this.getReportList(this.userSelection);
    this.show = true;
  }

  // // Get records from backend
  getReportList(userSelection) {
    if (userSelection) {
      this.rows = [new CallsOutboundGroupModel()];
      this.dashboardOutboundGroupsService.getReportList(userSelection).subscribe(
        res => {
          this.show = false;

          this.timerConnected = 0;
          // console.error("res", res);

          if (Array.isArray(res.detail)) {
            this.rows_valid = res.detail[0] === undefined ? false : true;

            this.rows = res.detail;
            this.rows_original = res.group;
            this.rows_total = res.total;

            this.rows_detail = res.detail;
            this.rows_detail_original = res.detail;

            this.show = true;

            this.idealResponseTime = this.rows_total[0].idealResponseTime;
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

  // Show or hide graph or table buttons
  onShowHideGraphButtons() {
    this.graph = !this.graph;
    this.show_graph_or_table_button = !this.show_graph_or_table_button;
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
    this.getReportList(this.userSelection);
    this.show_graph_or_table_button = false;
  }

  // Activated by button
  onRecalculate(event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.show_graph_or_table_button = false;
  }

  // Response report finder to display number of rows in table
  onReturnNumberOfRowsInTable(event) {
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
}
