import { Component, OnInit, OnDestroy Output, EventEmitter } from "@angular/core";
import { InvSupervisorModel, ActionConfig } from "shared/models";
import { InvSupervisorService, ExcelService } from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

@Component({
  selector: "app-crud-inv-supervisor",
  templateUrl: "./crud-inv-supervisor.component.html",
  styleUrls: ["./crud-inv-supervisor.component.scss"]
})
export class CrudInvSupervisorComponent implements OnInit {
  @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: InvSupervisorModel;
  action: ActionConfig;

  rows;
  rows_original;
  selected: [{ selected: InvSupervisorModel }];
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
    private invSupervisorService: InvSupervisorService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = true;
    this.show_selected_button = false;

    this.selection = new InvSupervisorModel();
    this.action = new ActionConfig();
    this.status_field = "inv_supervisor_status";
    this.excel_subtitle = "agente";

    this.selected = [{ selected: new InvSupervisorModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {
      field_name: "inv_supervisor_name",
      name: "nombre",
      text: "nombre"
    };
  }

  ngOnInit() {
    this.onGetActive();
  }

  ngOnDestroy() {

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
    this.invSupervisorService.getAllRecords(query).subscribe(
      (data: InvSupervisorModel[]) => {
        let data_mapped = data.map(x => {
          return {
            inv_supervisor_id: x.inv_supervisor_id,
            inv_supervisor_status: x.inv_supervisor_status,
            inv_supervisor_chk: x.inv_supervisor_chk,
            inv_supervisor_name: x.inv_supervisor_name,
            inv_supervisor_shortname: x.inv_supervisor_shortname,
            inv_supervisor_legal_id: x.inv_supervisor_legal_id,
            inv_supervisor_internal_id: x.inv_supervisor_internal_id,

            __JSON__: x.__JSON__,

            inv_supervisor_people_json: x.inv_supervisor_people_json
              ? JSON.parse(x.inv_supervisor_people_json)
              : null,

            inv_supervisor_operation_json: x.inv_supervisor_operation_json
              ? JSON.parse(x.inv_supervisor_operation_json)
              : null,

            inv_supervisor_time_json: x.inv_supervisor_time_json
              ? JSON.parse(x.inv_supervisor_time_json)
              : null,

            inv_supervisor_type_json: x.inv_supervisor_people_json
              ? JSON.parse(x.inv_supervisor_people_json).type
              : null,

            inv_supervisor_schedule_json: x.inv_supervisor_time_json
              ? JSON.parse(x.inv_supervisor_time_json).schedule
              : null,

            inv_supervisor_client_json: x.inv_supervisor_operation_json
              ? JSON.parse(x.inv_supervisor_operation_json).client
              : null,

            inv_supervisor_queue_json: x.inv_supervisor_operation_json
              ? JSON.parse(x.inv_supervisor_operation_json).queue
              : null,

            inv_supervisor_service_json: x.inv_supervisor_operation_json
              ? JSON.parse(x.inv_supervisor_operation_json).service
              : null,

            inv_supervisor_campaign_json: x.inv_supervisor_operation_json
              ? JSON.parse(x.inv_supervisor_operation_json).campaign
              : null
          };
        });

        this.rows = data_mapped;
        this.rows_original = data_mapped;
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
    let id = event.temp.inv_supervisor_id;

    this.invSupervisorService.getRecordById(id).subscribe(
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
    this.selection = new InvSupervisorModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.query);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvSupervisorModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.query);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvSupervisorModel();
    this.query = "";
    this.getAll_Records(this.query);
  }

  onNewRecord($event?) {
    this.show_datatable = false;
    this.show_selected_button = false;
    this.action.action = "newRecord";
    this.action.temp = new InvSupervisorModel();
  }

  onAfterCreatedRecord(event?) {
    this.rows = JSON.parse(localStorage.getItem("recordSelection"));
    this.show_datatable = true;
  }
  onEditRecord($event?) {
    this.show_datatable = false;
    this.action.action = "editRecord";
  }

  onAfterEditedRecord(event?) {
    this.rows = JSON.parse(localStorage.getItem("recordSelection"));
    this.show_datatable = true;
  }

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
        id: x.inv_supervisor_id,
        nombre: x.inv_supervisor_name,
        estatus: x.inv_supervisor_status
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }
}
