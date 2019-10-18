// Angular import
import { Component, OnInit, Input } from "@angular/core";

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
import { AlertService } from "shared/services";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";
import { ExcelService } from "shared/services";

// Local models
import { BackendResponseModel } from "projects/reports/src/app/shared/models/reports/backendResponse.model";

// Local shared
import { AgentsConnectionService } from "projects/reports/src/app/shared/services/reports/agents/reports-agents-connection.service";
import { AgentsConnectionModel } from "projects/reports/src/app/shared/models/reports/agents/AgentsConnection.model";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import * as moment from "moment";

@Component({
  selector: "app-reports-connection-report-list",
  templateUrl: "./connection-report-list.component.html",
  styleUrls: ["./connection-report-list.component.scss"]
})
export class ConnectionReportListComponent implements OnInit {
  // Variables that come from main component
  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  // Component variables
  alertMessage = new AlertModel();

  // Selector variables
  local_store;

  // Realtime variables
  timerConnected;

  // Datatable variables
  show_columns = false; // shows or hides a colum
  show = false; // shows or hides the table
  selected = [];

  // Filter variables
  numberOfRowsInTable;
  filterFieldList;
  initialSelectedFilterField;
  findInList;

  // Variable to dispaly values
  model: AgentsConnectionModel;
  rows;
  rows_original;
  rows_total;
  rows_detail;
  rows_detail_original;
  rows_detail_total;
  row_selection;
  exportNameGroup;
  exportNameDetail;
  rows_valid = false;

  //Icons
  faUser = faUser;

  // Modal window variables
  activeModal: NgbActiveModal;

  // Init
  constructor(
    private agentsConnectionService: AgentsConnectionService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.model = new AgentsConnectionModel();
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
    this.exportNameGroup = "reporte-conexión-consolidado";
    this.exportNameDetail = "reporte-conexión-detalle";

    this.initialSelectedFilterField = {
      field_name: "agent_name",
      name: "nombre_agente",
      text: "Nombre agente"
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
      this.rows = [new AgentsConnectionModel()];
      this.agentsConnectionService.getReportList(userSelection).subscribe(
        (res: BackendResponseModel) => {
          this.show = false;

          this.timerConnected = 0;
          // console.error("res", res);

          if (Array.isArray(res.detail)) {
            this.rows_valid = res.detail[0] === undefined ? false : true;

            this.rows = res.group;
            this.rows_original = res.group;
            this.rows_total = res.total;

            this.rows_detail = res.detail;
            this.rows_detail_original = res.detail;

            this.show = true;
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
    // console.error("selected-onActivate", this.row_selection);

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
    this.ngOnInit();
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

  // Export group to excel
  exportToExcelGroup(data) {
    const filterData = data.map(x => {
      return {
        id_agente: x.agent_id,
        veces_registrado: x.times_registered,
        nombre_agente: x.agent_name,
        cedula: x.agent_legal_id,
        doc_interno: x.agent_internal_id,
        extension: x.agent_extension,
        supervisor: x.agent_supervisor_name,
        horario: x.agent_schedule_name,
        fecha: moment(x.min_date).format("YYYY-MM-DD"),
        fecha_inicial: x.min_date,
        fecha_final: x.max_date,
        tiempo_inicial: x.start_time,
        tiempo_final: x.end_time,
        tiempo_conexion: x.duration_time,
        segundos_conexion: x.duration_time_secs
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportNameGroup);
  }

  // Export detail to excel detalle
  exportToExcelDetail(data) {
    const filterData = data.map(x => {
      return {
        id: x.record_id,
        id_agente: x.agent_id,
        nombre_agente: x.agent_name,
        cedula: x.agent_legal_id,
        doc_interno: x.agent_internal_id,
        extension: x.agent_extension,
        supervisor: x.agent_supervisor_name,
        horario: x.agent_schedule_name,
        fecha: moment(x.min_date).format("YYYY-MM-DD"),
        fecha_inicial: x.min_date,
        fecha_final: x.max_date,
        tiempo_inicial: x.start_time,
        tiempo_final: x.end_time,
        tiempo_duracion: x.duration_time,
        segundos_duracion: x.duration_time_secs
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportNameDetail);
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
    model = new AgentsConnectionModel().fieldList();

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
