import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { InvAgentModel, ActionConfig } from "shared/models";
import { InvAgentService, ExcelService } from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

@Component({
  selector: "app-crud-inv-agent",
  templateUrl: "./crud-inv-agent.component.html",
  styleUrls: ["./crud-inv-agent.component.scss"]
})
export class CrudInvAgentComponent implements OnInit {
  // @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: InvAgentModel;
  action: ActionConfig;

  rows;
  rows_original;
  selected: [{ selected: InvAgentModel }];
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
    private invAgentService: InvAgentService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = true;
    this.show_selected_button = false;

    this.selection = new InvAgentModel();
    this.action = new ActionConfig();
    this.status_field = "inv_agent_status";
    this.excel_subtitle = "agente";

    this.selected = [{ selected: new InvAgentModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {
      field_name: "inv_agent_name",
      name: "nombre",
      text: "nombre"
    };
  }

  ngOnInit() {
    this.onGetActive();
  }

  ngOnDestroy() {
    localStorage.setItem("recordSelection", "");
  }

  // IMPORT DATA FROM SERVICE
  getAll_Records(query?) {
    this.invAgentService.getAllRecords(query).subscribe(
      (data: InvAgentModel[]) => {
        let data_mapped = data.map(x => {
          return {
            inv_agent_id: x.inv_agent_id,
            inv_agent_status: x.inv_agent_status,
            inv_agent_chk: x.inv_agent_chk,
            inv_agent_name: x.inv_agent_name,
            inv_agent_shortname: x.inv_agent_shortname,

            inv_agent_extension: x.inv_agent_extension,

            inv_agent_legal_id: x.inv_agent_legal_id,
            inv_agent_internal_id: x.inv_agent_internal_id,

            inv_agent_type: x.inv_agent_type,

            __JSON__: 1,

            inv_agent_people_json: x.inv_agent_people_json
              ? JSON.parse(x.inv_agent_people_json)
              : null,

            inv_agent_operation_json: x.inv_agent_operation_json
              ? JSON.parse(x.inv_agent_operation_json)
              : null,

            inv_agent_time_json: x.inv_agent_time_json
              ? JSON.parse(x.inv_agent_time_json)
              : null,

            // Optional
            inv_agent_role_json: x.inv_agent_people_json
              ? JSON.parse(x.inv_agent_people_json).role
              : null,

            inv_agent_supervisor_json: x.inv_agent_people_json
              ? JSON.parse(x.inv_agent_people_json).supervisor
              : null,

            inv_agent_schedule_json: x.inv_agent_time_json
              ? JSON.parse(x.inv_agent_time_json).schedule
              : null,

            inv_agent_calendar_json: x.inv_agent_time_json
              ? JSON.parse(x.inv_agent_time_json).calendar
              : null,

            inv_agent_client_json: x.inv_agent_operation_json
              ? JSON.parse(x.inv_agent_operation_json).client
              : null,

            inv_agent_queue_json: x.inv_agent_operation_json
              ? JSON.parse(x.inv_agent_operation_json).queue
              : null,

            inv_agent_service_json: x.inv_agent_operation_json
              ? JSON.parse(x.inv_agent_operation_json).service
              : null,

            inv_agent_campaign_json: x.inv_agent_operation_json
              ? JSON.parse(x.inv_agent_operation_json).campaign
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

  // BUTTON FOR NEW RECORD
  onNewRecord($event?) {
    this.show_datatable = false;
    this.show_selected_button = false;
    this.action.action = "newRecord";
    // this.action.temp = new InvSupervisorModel();
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([new InvAgentModel()])
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

  onGetActive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvAgentModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.query);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvAgentModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.query);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvAgentModel();
    this.query = "";
    this.getAll_Records(this.query);
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
        id: x.inv_agent_id,
        nombre: x.inv_agent_name,
        estatus: x.inv_agent_status,
        extension: x.inv_agent_extension,
        cedula: x.inv_agent_legal_id,
        id_interno: x.inv_agent_internal_id,
        supervisor: x.inv_agent_supervisor_json_name,
        horario: x.inv_agent_schedule_json_name,
        asignacion: x.inv_agent_assignation,
        rol: x.inv_agent_role_name
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
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

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }

  // IMPORT DATA FROM SERVICE
  getSingle_Record(event?) {
    this.rows = [event.temp];
    let id = event.temp.inv_agent_id;

    this.invAgentService.getRecordById(id).subscribe(
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
}
