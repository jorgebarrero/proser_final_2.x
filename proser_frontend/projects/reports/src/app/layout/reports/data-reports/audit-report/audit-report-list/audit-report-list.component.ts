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

import { MainAuditService } from "projects/reports/src/app/shared/services/reports/data/reports-main-audit.service";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

import { UserSelectionModel, MainAuditModel } from "shared/models";
import { MainAuditReportModel } from "projects/reports/src/app/shared/models/reports/data/MainAuditReport.model";

import {
  objectDateToTextDate,
  textDateToObjectDate
} from "shared/functions";

import { ExcelService } from "shared/services";

@Component({
  selector: "app-reports-audit-report-list",
  templateUrl: "./audit-report-list.component.html",
  styleUrls: ["./audit-report-list.component.scss"]
})
export class AuditReportListComponent implements OnInit {
  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  numberOfRowsInTable;

  rows;
  rows_original;
  selection;
  findInList;
  filterFieldList;

  selected = [];
  selectedAsArray = [];
  show_columns = false;
  alertMessage = new AlertModel();

  local_store;
  agent;

  show = false;
  timerConnected;

  activeModal: NgbActiveModal;
  initialSelectedFilterField;

  model;
  exportName;

  constructor(
    private mainAuditService: MainAuditService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.show = false;
    this.local_store = "assignation";
    this.model = new MainAuditReportModel();
    // this.filterFieldList = this.model.fieldList();
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.exportName = "reporte-audit";
  }

  ngOnInit() {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    this.getAuditList(this.userSelection);
    this.filterFieldList = this.model.fieldList();
    this.initialSelectedFilterField = {
      field_name: "inv_agent_name",
      name: "nombre_agente",
      text: "Agente"
    };
  }

  ngOnDestroy() {
    // this.userSelectionService.writeUserSelection(
    //   this.userSelection,
    //   this.local_store
    // );
  }

  getAuditList(userSelection) {
    if (userSelection) {
      this.rows = [new MainAuditReportModel()];

      this.mainAuditService.getReportList(userSelection).subscribe(
        (res: [MainAuditReportModel]) => {
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
    this.getAuditList(this.userSelection);
  }

  onGetAll() {
    this.findInList = "";
    this.getAuditList(this.userSelection);
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

  onCreateModel(model) {
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
        id: x.audit_id,
        agente_id: x.audit_agent_id,
        break: x.audit_break_id,
        inicio: x.audit_datetime_init,
        final: x.audit_datetime_end,
        duracion: x.audit_duration,
        duracion_sec: x.audit_duration_sec,
        status: x.audit_status,
        fecha: x.audit_date,
        info_colas_cdr: x.audit_cdr_queues,
        supervisor: x.supervisor,
        turno: x.schedule,
        rol: x.role,
        cliente: x.client,
        cola: x.queue,
        servicio: x.service,
        campaña: x.campaign,
        nombre_agente: x.inv_agent_name,
        nombre_break: x.inv_break_name
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportName);
  }
}
