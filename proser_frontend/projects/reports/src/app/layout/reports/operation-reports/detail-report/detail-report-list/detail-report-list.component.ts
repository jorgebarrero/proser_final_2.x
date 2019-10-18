

import { Component, OnInit, Input } from "@angular/core";

import { AlertModel } from "shared/models/helpers/Alert";
import { AlertService } from "shared/services";

import { getUpdateFilter } from "shared/functions";

import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

import { UserSelectionModel } from "shared/models";

import {
  objectDateToTextDate,
  textDateToObjectDate
} from "shared/functions";

import { ExcelService } from "shared/services";

import { OperationDetailOperationService } from "projects/reports/src/app/shared/services/reports/operation/reports-operation-detail.service";
import { OperationDetailOperationModel } from "projects/reports/src/app/shared/models/reports/operation/OperationDetailOperation.model";


@Component({
  selector: 'app-reports-detail-report-list',
  templateUrl: './detail-report-list.component.html',
  styleUrls: ['./detail-report-list.component.scss']
})
export class DetailReportListComponent implements OnInit {

  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  numberOfRowsInTable;
  selectedAsArray;
  filterFieldList;

  rows;
  rows_original;
  selection;
  findInList;

  selected = [];
  show_columns = false;
  alertMessage = new AlertModel();

  local_store;
  agent;

  show = false;
  timerConnected;

  activeModal: NgbActiveModal;
  initialSelectedFilterField;

  model: OperationDetailOperationModel;
  exportName;

  constructor(
    private operationDetailOperationService: OperationDetailOperationService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.model = new OperationDetailOperationModel();
    this.local_store = "assignation";
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.selectorVisibleFields.assignation = false;
    this.selectorVisibleFields.auxiliar = false;
  }

  ngOnInit() {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getReportList(this.userSelection);
    this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.exportName = "reporte-detalle-operacion";

    this.initialSelectedFilterField = {
      field_name: "callentry_uniqueid",
      name: "identificador_llamada",
      text: "Identificador"
    };
  }

  ngOnDestroy() {
    this.userSelectionService.writeUserSelection(
      this.userSelection,
      this.local_store
    );
  }

  getReportList(userSelection) {
    if (userSelection) {
      this.rows = [new OperationDetailOperationModel()];

      this.operationDetailOperationService.getReportList(userSelection).subscribe(
        (res: [OperationDetailOperationModel]) => {
          this.show = false;

          this.timerConnected = 0;

          if (Array.isArray(res)) {
            this.rows = res;
            this.rows_original = res;
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

  updateSelection($event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
  }

  closeSelector($event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.ngOnInit();
  }
  onActivate(event, ngModelDir?) {
    if (event.type === "dblclick") {
    }
  }

  onSelect(event) {
    this.selected = event.selected;
  }

  onOpenDetailWindow(content) {
    this.selectedAsArray = this.onObjectToArray(this.selected[0]);
    this.openModal(content);
  }

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

  onChange() {}

  openModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  onUpdateReport(event) {
    this.getReportList(this.userSelection);
  }

  onGetAll() {
    this.findInList = "";
    this.getReportList(this.userSelection);
  }

  // Update on return of sehector in header
  onReturnHeaderResult(event) {
    this.ngOnInit();
  }

  onReturnNumberOfRowsInTable(event) {
    console.error("event", event);
    this.numberOfRowsInTable = event;
  }

  onReturnRowsForTable(event) {
    this.rows = event;
  }

  onCreateModel(model?) {
    model = new OperationDetailOperationModel().fieldList();

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

  exportToExcel(data) {
    const filterData = data.map(x => {
      return {
        id_agente: x.agent_id,
        nombre_agente: x.agent_name,
        cedula: x.agent_legal_id,
        doc_interno: x.agent_internal_id,
        fecha_inicio: x.start_date,
        fecha_final: x.end_date,
        supervisor: x.supervisor_name,
        login_seg: x.login_duration_sec,
        login_tiempo: x.login_duration_time,
        llamadas_atendidas: x.inbound_calls_attended,
        llamadas_atendidas_seg: x.inbound_attended_duration_sec,
        llamadas_atendidas_tiempo: x.inbound_attended_duration_time,
        llamadas_atendidas_porcentaje: x.inbound_attended_avg_time,
        llamadas_realizadas: x.outbound_calls_made,
        llamadas_realizadas_seg: x.outbound_made_sec,
        llamadas_realizadas_tiempo: x.outbound_made_time,
        llamadas_realizadas_porcentaje: x.outbound_made_avg_time,
        llamadas_internas: x.outbound_internal_made,
        llamadas_internas_seg: x.outbound_internal_sec,
        llamadas_internas_tiempo: x.outbound_internal_time,
        llamadas_internas_porcentaje: x.outbound_internal_avg_time,
        auxiliar_seg: x.auxiliar_duration_sec,
        auxiliar_tiempo: x.auxiliar_duration_time,
        auxiliar_porcentaje: x.percent_auxiliar,
        asignacion_seg: x.assignation_duration_sec,
        asignacion_tiempo: x.assignation_duration_time,
        asignacion_porcentaje: x.percent_assignation

       
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportName);
  }
}
