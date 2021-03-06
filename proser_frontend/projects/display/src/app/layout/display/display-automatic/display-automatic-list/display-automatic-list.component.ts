// Angular
import { Component, OnInit, OnDestroy, Input, ViewChild } from "@angular/core";

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
import { UserSelectionService } from "shared/services/";

// Local models
import {
  DisplayAutomaticModel,
  DisplayAutomaticResponseModel
} from "projects/display/src/app/shared/models/";

// Local shared
import { DisplayAutomaticIndicatorsService } from "projects/display/src/app/shared/services/";

@Component({
  selector: "app-display-display-automatic-list",
  templateUrl: "./display-automatic-list.component.html",
  styleUrls: ["./display-automatic-list.component.scss"]
})
export class DisplayAutomaticListComponent implements OnInit, OnDestroy {
  // Subscription
  private subscription: Subscription = new Subscription();

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
  currentDate;

  // Show variables
  show_columns = false; // shows or hides a colum
  show = false; // shows or hides the table
  selected = [];
  idealResponseTime;
  historic = false;

  // Filter variables
  numberOfRowsInTable;
  filterFieldList;
  initialSelectedFilterField;
  findInList;

  // Variable to dispaly values
  model: DisplayAutomaticModel;
  rows: DisplayAutomaticResponseModel;
  rows_original: DisplayAutomaticResponseModel;
  rows_total;
  rows_detail;
  rows_detail_original;
  rows_detail_total;
  row_selection;
  exportName;

  // Modal window variables
  activeModal: NgbActiveModal;

  // Graph variables
  graph = false;
  show_graph_or_table_button = false;

  // Init
  constructor(
    private displayAutomaticIndicatorsService: DisplayAutomaticIndicatorsService,
    private alertService: AlertService,
    private envService: EnvService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService
  ) {
    this.env = envService;
    this.model = new DisplayAutomaticModel();
    this.local_store = "assignation";
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.rows = new DisplayAutomaticResponseModel();
    this.rows_original = new DisplayAutomaticResponseModel();
  }

  // Start
  ngOnInit() {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.exportName = "reporte-conexión";

    this.initialSelectedFilterField = {
      field_name: "start_date",
      name: "fecha_inicio",
      text: "Fecha desde"
    };
    this.onRepeat();
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
    // this.show_automatic = true;
    // this.show_highlights = false;

    const timerComponent = timer(1000, 5000);
    const timerClock = timer(1000, 1000);

    this.getReportList(this.userSelection);

    this.subscription.add(
      timerComponent.subscribe(() => {
        if (
          objectDateToTextDate(this.userSelection.start_date) ===
          this.currentDate
        ) {
          // this.historic_mode = false;
          // this.userSelection.historic_mode = false;
          this.getReportList(this.userSelection);
        } else {
          // this.historic_mode = true;
          // this.userSelection.historic_mode = true;
        }
      })
    );
    timerClock.subscribe(() => {
      this.timerConnected = this.timerConnected + 1;
    });
  }

  // Get records from backend
  getReportList(userSelection: UserSelectionModel) {
    if (userSelection) {
      this.displayAutomaticIndicatorsService
        .getReportList(userSelection)
        .subscribe(
          (res: DisplayAutomaticResponseModel) => {
            // this.show = false;

            this.timerConnected = 0;
            // console.error("res", res);

            this.currentDate !== objectDateToTextDate(userSelection.start_date)
              ? (this.historic = true)
              : (this.historic = false);

            if (res) {
              // res.colors = res.colors[0];
              this.rows = res;
              // this.highligthts.onExtractVariables(this.rows);

              // console.error("rows", this.rows);

              // this.childGraph
              //   ? this.childGraph.generateGraph("service", this.rows)
              //   : "";
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
    // this.childGraph ? this.childGraph.generateGraph("header", this.rows) : "";
  }

  // Activated by button
  onRecalculate(event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.show_graph_or_table_button = false;
    console.error("this.rows", this.rows);

    // this.childGraph ? this.childGraph.generateGraph("button", this.rows) : "";
  }

  // Response report finder to display number of rows in table
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

  // temporary method to generate excel map for exporting model
  onCreateModel(model?) {
    model = new DisplayAutomaticModel().fieldList();

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

    console.error("model", model3);
  }

  //Test function for modal
  openModal(content) {
    // this.rows_detail = this.rows_detail_original.filter(x => {
    //   return x.agent_id === this.row_selection.agent_id;
    // });
    // this.rows_detail_total = this.rows_original.filter(x => {
    //   return x.agent_id === this.row_selection.agent_id;
    // });
    // this.activeModal = this.modalService.open(content, {
    //   windowClass: "my-class",
    //   keyboard: false
    // });
  }
}
