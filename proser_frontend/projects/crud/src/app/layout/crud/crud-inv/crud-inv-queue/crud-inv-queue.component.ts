import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { InvQueueModel, ActionConfig } from "shared/models";
import { InvQueueService, ExcelService } from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

@Component({
  selector: "app-crud-inv-queue",
  templateUrl: "./crud-inv-queue.component.html",
  styleUrls: ["./crud-inv-queue.component.scss"]
})
export class CrudInvQueueComponent implements OnInit {
  @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: InvQueueModel;
  action: ActionConfig;

  rows;
  rows_original;
  selected: [{ selected: InvQueueModel }];
  query;

  rowsInTableList;
  numberOfRowsInTable;

  show_data;
  show_datatable;
  show_new_button;
  show_selected_button;

  findInList;
  filterFieldList;

  selectedFilterField;
  status_field;

  excel_subtitle;

  // INITIALIZATION
  constructor(
    private invQueueService: InvQueueService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = true;
    this.show_selected_button = false;

    this.selection = new InvQueueModel();
    this.action = new ActionConfig();
    this.status_field = "inv_queue_status";
    this.excel_subtitle = "agente";

    this.selected = [{ selected: new InvQueueModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {
      field_name: "inv_queue_name",
      name: "nombre",
      text: "nombre"
    };
  }

  ngOnInit() {
    this.onGetActive();
  }

  onlistAnswer(event) {
    if (event) {
      this.selection = event;
      this.show_selected_button = true;
    }
    event.action === "cancel" ? this.onCancel(event) : "";
    event.action === "afterCreatedRecord"
      ? this.onAfterCreatedRecord(event)
      : "";
    event.action === "afterEditedRecord" ? this.onAfterEditedRecord(event) : "";

    event.action === "editRecord" ? this.onFindById(event) : "";
    event.action === "delete" ? this.onCancel(event) : "";
    event.action === "test" ? this.test(event) : "";
  }

  // IMPORT DATA FROM SERVICE
  getAll_Records(query?) {
    this.invQueueService.getAllRecords(query).subscribe(
      (data: InvQueueModel[]) => {
        let data_mapped = data.map(x => {
          return {
            inv_queue_id: x.inv_queue_id,
            inv_queue_status: x.inv_queue_status,
            inv_queue_chk: x.inv_queue_chk,
            inv_queue_name: x.inv_queue_name,
            inv_queue_shortname: x.inv_queue_shortname,
            inv_queue_sms_name: x.inv_queue_sms_name,
            inv_queue_number: x.inv_queue_number,
            inv_queue_type: x.inv_queue_type,

            __JSON__: x.__JSON__,

            inv_queue_operation_json: x.inv_queue_operation_json
              ? JSON.parse(x.inv_queue_operation_json)
              : null,

            inv_queue_system_json: x.inv_queue_system_json
              ? JSON.parse(x.inv_queue_system_json)
              : null,

            // optional,

            inv_queue_scale_json: x.inv_queue_operation_json
              ? JSON.parse(x.inv_queue_system_json).scale
              : null,

            inv_queue_client_json: x.inv_queue_operation_json
              ? JSON.parse(x.inv_queue_operation_json).client
              : null,

            inv_queue_service_json: x.inv_queue_operation_json
              ? JSON.parse(x.inv_queue_operation_json).service
              : null
          };
        });

        this.rows_original = data_mapped;
        this.rows = data_mapped;

        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // IMPORT DATA FROM SERVICE
  getSingle_Record(event?) {
    this.rows = [event.temp];
    let id = event.temp.inv_queue_id;

    this.invQueueService.getRecordById(id).subscribe(
      temp => {
        let data = [temp];
        this.rows_original = data;
        this.rows = data;
        this.action.temp = data;

        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  onGetActive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvQueueModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.query);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvQueueModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.query);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvQueueModel();
    this.query = "";
    this.getAll_Records(this.query);
  }

  /********************************** */

  // BUTTON FOR NEW RECORD
  onNewRecord($event?) {
    this.show_datatable = false;
    this.show_selected_button = false;
    this.action.action = "newRecord";
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([new InvQueueModel()])
    );
  }

  // BUTTON FOR SELECTED
  onEditRecord($event?) {
    this.show_datatable = false;
    this.action.action = "editRecord";
  }

  // SHOW CREATED RECORD
  onAfterCreatedRecord(event?) {
    this.rows = JSON.parse(localStorage.getItem("recordSelection"));
    this.show_datatable = true;
  }

  // SHOW EDITED RECORD
  onAfterEditedRecord(event?) {
   

    this.rows = JSON.parse(localStorage.getItem("recordSelection"));
    this.show_datatable = true;
  }
  /********************************** */

  onShowDetail($event?) {
    this.show_datatable = false;
    this.action.action = "showRecord";
  }

  onItemListSelected(event?) {
    this.show_datatable = true;
    this.numberOfRowsInTable = event;
  }

  onFilterFieldList() {
    let temp = {
      lines: this.numberOfRowsInTable
    };
    this.action = { action: "numberOfRowsInTable", temp: temp };
    this.onGetAll();
  }

  onCancel($event?) {
    if (event) {
      this.show_datatable = !this.show_datatable;
      this.onGetActive();
    }
  }

  onUpdateFilter(event) {
    this.show_datatable = true;
    let temp = getUpdateFilter(
      event,
      this.rows,
      this.rows_original,
      this.selectedFilterField.field_name
    );
    this.rows = temp;
  }

  onFindById(event?) {
    this.getSingle_Record(event);
    this.action.action = "selectedRecord";
    this.show_datatable = true;
  }

  // DETECT EVENTS ON DATATABLE
  onActivate(event) {}

  onSelect(event) {
    this.show_selected_button = true;
    this.selection = event.selected[0];
  }

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = "Error del servidor";
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass =
      "alert alert-danger alert-dismissible fade show";
  }

  onExportToExcel(data, name) {
    this.show_datatable = true;
    const filterData = data.map(x => {
      return {
        id: x.inv_queue_id,
        nombre: x.inv_queue_name,
        estatus: x.inv_queue_status
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }
}
