// Angular import
import { Component, OnInit, Input, ViewChild } from "@angular/core";

// Installed modules
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
import { ExcelService } from "shared/services";

// Local models
import { BackendResponseModel } from "projects/reports/src/app/shared/models/reports/backendResponse.model";

// Local shared

import { CallsOutboundDailyModel } from "projects/reports/src/app/shared/models/reports/calls/CallsOutboundDaily.model";
import { CallsOutboundDailyReportService } from "projects/reports/src/app/shared/services/reports/calls/reports-outbound.service";
import { OutboundReportGraphComponent } from "../outbound-report-graph/outbound-report-graph.component";

@Component({
  selector: "app-reports-outbound-report-list",
  templateUrl: "./outbound-report-list.component.html",
  styleUrls: ["./outbound-report-list.component.scss"]
})
export class OutboundReportListComponent implements OnInit {
  // Child components
  @ViewChild(OutboundReportGraphComponent, { static: false })
  private childGraph: OutboundReportGraphComponent;

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
  model: CallsOutboundDailyModel;
  rows;
  rows_original;
  rows_total;
  rows_detail;
  rows_detail_original;
  rows_detail_total;
  row_selection;
  exportName;
  rows_valid;

  // Modal window variables
  activeModal: NgbActiveModal;

  // Graph variables
  graph = false;
  show_graph_or_table_button = false;

  // Init
  constructor(
    private callsOutboundDailyReportService: CallsOutboundDailyReportService,
    private alertService: AlertService,
    private envService: EnvService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.env = envService;
    this.model = new CallsOutboundDailyModel();
    this.local_store = "assignation";
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
  }

  // Start
  ngOnInit() {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.exportName = "reporte-saliente";

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

  // Get records from backend
  getReportList(userSelection) {
    if (userSelection) {
      this.rows = [new CallsOutboundDailyModel()];
      this.callsOutboundDailyReportService
        .getReportList(userSelection)
        .subscribe(
          (res: BackendResponseModel) => {
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
              this.childGraph
                ? this.childGraph.generateGraph("service", this.rows)
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
    this.childGraph ? this.childGraph.generateGraph("header", this.rows) : "";
  }

  // Activated by button
  onRecalculate(event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.show_graph_or_table_button = false;
    console.error("this.rows", this.rows);

    this.childGraph ? this.childGraph.generateGraph("button", this.rows) : "";
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

  // Export to excel
  exportToExcel(data) {
    const filterData = data.map(x => {
      return {
        nombre_dia: x.day_name,
        dia_semana: x.week_day,
        fecha_inicio: x.start_date,
        hora_inicio: x.start_time,
        hora_fin: x.end_time,
        llamadas_realizadas: x.outboundMade,
        llamadas_fallidas: x.outboundFail,
        llamadas_contestadas: x.outboundAnswered,
        llamadas_efectivas: x.outboundEffective,
        llamadas_colgadas: x.outboundHungout,
        nivel_contactabilidad: x.outboundContactLevel,
        nivel_efectividad: x.outboundEffectiveLevel,
        segundos_operacion: x.operation_seconds,
        tiempo_operacion: x.operation_time,
        tmo_saliente: x.outboundTMO
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportName);
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
    model = new CallsOutboundDailyModel().fieldList();

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
    this.rows_detail = this.rows_detail_original.filter(x => {
      return x.agent_id === this.row_selection.agent_id;
    });

    this.rows_detail_total = this.rows_original.filter(x => {
      return x.agent_id === this.row_selection.agent_id;
    });

    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }
}
