import { UserSelectionModel } from "./../../../../../../../../shared/models/crud/system/UserSelection.model";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ProShowDisplayModel, ActionConfig } from "shared/models";
import { ProShowDisplayService, ExcelService } from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

@Component({
  selector: "app-crud-crud-show-display",
  templateUrl: "./crud-show-display.component.html",
  styleUrls: ["./crud-show-display.component.scss"]
})
export class CrudShowDisplayComponent implements OnInit {
  @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: ProShowDisplayModel;
  action: ActionConfig;

  rows;
  rows_original;
  selected: [{ selected: ProShowDisplayModel }];
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
    private showDisplayService: ProShowDisplayService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = true;
    this.show_selected_button = false;

    this.selection = new ProShowDisplayModel();
    this.action = new ActionConfig();
    this.status_field = "aux_color_status";
    this.excel_subtitle = "agente";

    this.selected = [{ selected: new ProShowDisplayModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {
      field_name: "aux_color_name",
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
    this.showDisplayService.getAllRecords(query).subscribe(
      (data: ProShowDisplayModel[]) => {
        let data_mapped = data.map(x => {
          return {
            pro_show_display_id: x.pro_show_display_id,

            pro_show_display_name: x.pro_show_display_name,
            pro_show_display_start_time: x.pro_show_display_start_time,
            pro_show_display_end_time: x.pro_show_display_end_time,
            pro_show_display_status: x.pro_show_display_status,

            pro_show_display_weekday: x.pro_show_display_weekday
              ? JSON.parse(x.pro_show_display_weekday)
              : null,

            pro_show_display_type: x.pro_show_display_type
              ? JSON.parse(x.pro_show_display_type)
              : null,

            pro_show_display_view: x.pro_show_display_view
              ? JSON.parse(x.pro_show_display_view)
              : null,

            pro_show_display_selection: x.pro_show_display_selection
              ? JSON.parse(x.pro_show_display_selection)
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
    let id = event.temp.aux_color_id;

    this.showDisplayService.getRecordById(id).subscribe(
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
    this.selection = new ProShowDisplayModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.query);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new ProShowDisplayModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.query);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new ProShowDisplayModel();
    this.query = "";
    this.getAll_Records(this.query);
  }

  // BUTTON FOR NEW RECORD
  onNewRecord($event?) {
    this.show_datatable = false;
    this.show_selected_button = false;
    this.action.action = "newRecord";
    // this.action.temp = new InvSupervisorModel();
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([new ProShowDisplayModel()])
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
        id: x.aux_color_id,
        nombre: x.aux_color_name,
        color_hexadecimal: x.aux_color_string,
        uso: x.aux_color_use,
        estatus: x.aux_color_status
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }
}
