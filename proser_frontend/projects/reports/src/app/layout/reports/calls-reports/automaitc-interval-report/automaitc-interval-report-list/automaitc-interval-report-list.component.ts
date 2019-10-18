

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

import { RealCurrentAgentsService } from "projects/reports/src/app/shared/services/reports/data/reports-real-current-agents.service";
import { RealCurrentAgentsReportModel } from "projects/reports/src/app/shared/models/reports/data/RealCurrentAgents.model";

@Component({
  selector: 'app-reports-automaitc-interval-report-list',
  templateUrl: './automaitc-interval-report-list.component.html',
  styleUrls: ['./automaitc-interval-report-list.component.scss']
})
export class AutomaitcIntervalReportListComponent implements OnInit {
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

  model: RealCurrentAgentsReportModel;
  exportName;

  constructor(
    private realCurrentAgentsService: RealCurrentAgentsService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private userSelectionService: UserSelectionService,
    private excelService: ExcelService
  ) {
    this.model = new RealCurrentAgentsReportModel();
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
    this.exportName = "reporte-call-entry";

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
      this.rows = [new RealCurrentAgentsReportModel()];

      this.realCurrentAgentsService.getReportList(userSelection).subscribe(
        (res: [RealCurrentAgentsReportModel]) => {
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
    model = new RealCurrentAgentsReportModel().fieldList();

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
        id: x.cdr_id,
        fecha: x.cdr_date,
        clid: x.cdr_clid,
        src: x.cdr_src,
        dst: x.cdr_dst,
        dcontext: x.cdr_dcontext,
        channel: x.cdr_channel,
        dstchannel: x.cdr_dstchannel,
        lastapp: x.cdr_lastapp,
        lastdata: x.cdr_lastdata,
        duracion_seg: x.cdr_duration_sec,
        segundos_facturables: x.cdr_billsec_sec,
        disposicion: x.cdr_disposition,
        amaflags: x.cdr_amaflags,
        accountcode: x.cdr_accountcode,
        uniqueid: x.cdr_uniqueid,
        userfield: x.cdr_userfield,
        grabacion: x.cdr_recordingfile,
        cnum: x.cdr_cnum,
        cnam: x.cdr_cnam,
        outbound_cnum: x.cdr_outbound_cnum,
        outbound_cnam: x.cdr_outbound_cnam,
        dst_cnam: x.cdr_dst_cnam,
        did: x.cdr_did,
        callcenter: x.__CALLCENTER__,
        nombre_callcenter: x.cdr_callcenter_name,
        tipo: x.cdr_call_type,
        clase: x.cdr_call_class,
        extension: x.cdr_agent_extension,
        numero_cola: x.cdr_queue_number,
        id_agente: x.cdr_agent_id,
        id_cola: x.cdr_queue_id,
        date: x.__DATE__,
        hca: x.__HCA__,
        fecha_agente: x.cdr_hca_agent_serial_id,
        fecha_cola: x.cdr_hca_queue_serial_id,
        made: x.__MADE__,
        llamadas_realizadas: x.cdr_call_made,
        llamadas_fallidas: x.cdr_call_fail,
        llamadas_contestadas: x.cdr_call_answered,
        llamadas_efectivas: x.cdr_call_efective,
        colgadas_agente: x.cdr_call_hungout
      };
    });

    this.excelService.exportAsExcelFile(filterData, this.exportName);
  }
}
