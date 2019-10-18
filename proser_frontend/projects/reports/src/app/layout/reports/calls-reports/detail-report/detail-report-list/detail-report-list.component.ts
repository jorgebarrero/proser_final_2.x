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

import { objectDateToTextDate, textDateToObjectDate } from "shared/functions";

import { ExcelService } from "shared/services";

import { UserSelectionModel } from "shared/models";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";
import { CallsDetailService } from "projects/reports/src/app/shared/services/reports/calls/reports-detail-calls.service";
import { CallsDetailModel } from "projects/reports/src/app/shared/models/reports/calls/CallsDetail.model";

import { faPhone } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-reports-detail-report-list",
  templateUrl: "./detail-report-list.component.html",
  styleUrls: ["./detail-report-list.component.scss"]
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
  rows_valid = false;

  selected = [];
  show_columns = false;
  alertMessage = new AlertModel();

  local_store;
  agent;

  show = false;
  timerConnected;

  activeModal: NgbActiveModal;
  initialSelectedFilterField;

  model: CallsDetailModel;
  exportName;

  faPhone = faPhone;

  constructor(
    private callsDetailService: CallsDetailService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.model = new CallsDetailModel();
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
    this.exportName = "reporte-detalle-llamadas";

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
      this.rows = [new CallsDetailModel()];

      this.callsDetailService.getReportList(userSelection).subscribe(
        (res: [CallsDetailModel]) => {
          this.show = false;

          this.timerConnected = 0;

          if (Array.isArray(res)) {
            this.rows_valid = res.length > 0 ? true : false;

            this.rows = res;
            this.rows_original = res;
            this.show = true;

            // console.warn("this.rows", this.rows[0]);
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

  getRecording(selected) {
    let record = selected;
    this.callsDetailService.getRecording(record).subscribe(
      res => {
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

  downloadFile() {
    const recordSelection = JSON.parse(localStorage.getItem("selected_row"));
    const url = recordSelection.record;
    const route = url.substring(url.lastIndexOf("/") + 1);
    const fileExtension = route.substring(route.lastIndexOf(".") + 1);
    const fileName = `${recordSelection.call_type}-${recordSelection.agent_name}-${recordSelection.start_date}-${recordSelection.start_time}.${fileExtension}`;

    this.callsDetailService
      .downloadFile(route, fileName)
      .subscribe((response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        if (fileName) downloadLink.setAttribute("download", fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
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

  onActivate(event) {
    if (event.type == "click") {
      this.selected = event.row;
      localStorage.setItem("selected_row", JSON.stringify(this.selected));
    }
  }

  onSelect(event, origin) {
    this.selected = event.row;
  }

  onGetRecording(event) {
    this.getRecording(this.selected);
    this.openModal("new");
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

  // Update on return of selector in header
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

  onRecordFile(selection) {
    console.error("selection", selection);
  }

  onCreateModel(model?) {
    model = new CallsDetailModel().fieldList();
    console.warn("model", model);
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

    console.warn("model", model3);
  }

  exportToExcel(data) {
    const filterData = data.map(x => {
      return {
        id_agente: x.agent_id,
        agente: x.agent_name,
        supervisor: x.agent_supervisor_name,
        fecha_inicio: x.start_date,
        hora_inicio: x.start_time,
        tipo: x.call_type,
        origen: x.call_source,
        destino: x.call_destiny,
        duracion: x.duration,
        estatus: x.call_status,
        clasificacion: x.call_clasif,
        grabacion: x.record,
        hora_cola: x.queue_time,
        hora_conexion: x.connection_time,
        hora_final: x.end_time,
        hora_colgado_agente: x.time_hung_agent,
        hora_colgado_llamante: x.time_hung_caller,
        hora_abandonada: x.time_abandoned
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportName);
  }

  // Show modal detail window
  openDetailModal(content, selected?) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }
}
