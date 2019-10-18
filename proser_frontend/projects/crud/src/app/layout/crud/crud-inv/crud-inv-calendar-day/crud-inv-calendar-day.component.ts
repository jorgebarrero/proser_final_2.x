import { InvCalendarService } from "./../../../../../../../../shared/services/crud/inv/inv-calendar.service";
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  InvCalendarDayModel,
  InvCalendarModel,
  ActionConfig
} from "shared/models";
import { InvCalendarDayService, ExcelService } from "shared/services/";
import {
  getUpdateFilter,
  textDateToObjectDate,
  objectDateToTextDate
} from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

import * as moment from "moment";

@Component({
  selector: "app-crud-inv-calendar-day",
  templateUrl: "./crud-inv-calendar-day.component.html",
  styleUrls: ["./crud-inv-calendar-day.component.scss"]
})
export class CrudInvCalendarDayComponent implements OnInit {
  @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: InvCalendarDayModel;
  action: ActionConfig;

  rows;
  rows_original;
  selected: [{ selected: InvCalendarDayModel }];
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

  calendarList;
  selectedCalendar;

  // INITIALIZATION
  constructor(
    private invCalendarDayService: InvCalendarDayService,
    private invCalendarService: InvCalendarService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = true;
    this.show_selected_button = false;

    this.selection = new InvCalendarDayModel();
    this.action = new ActionConfig();
    this.status_field = "inv_calendarday_status";
    this.excel_subtitle = "calendario";

    this.selected = [{ selected: new InvCalendarDayModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {
      field_name: "inv_calendarday_name",
      name: "nombre",
      text: "nombre"
    };

    this.calendarList = [
      { id: 1, name: 1 },
      { id: 10, name: 10 },
      { id: 15, name: 15 }
    ];
  }

  ngOnInit() {
    this.getAll_CalendarRecords();
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
  getAll_Records(selectedCalendar) {
    let query = null;

    let filter_id = selectedCalendar.id;

    this.invCalendarDayService.getAllRecords(query).subscribe(
      (data: InvCalendarDayModel[]) => {
        let data_mapped = data
          .map(x => {
            return {
              inv_calendarday_date_json: JSON.parse(
                x.inv_calendarday_date_json
              ),

              inv_calendarday_id: x.inv_calendarday_id,
              inv_calendar_id: x.inv_calendar_id,
              inv_calendarday_status: x.inv_calendarday_status,
              inv_calendarday_date: objectDateToTextDate(
                x.inv_calendarday_date_json
              ),
              inv_calendarday_name: x.inv_calendarday_name,
              inv_calendarday_type: x.inv_calendarday_type

              // optional,
            };
          })
          .filter(y => {
            return y.inv_calendar_id === filter_id;
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
    let id = event.temp.inv_calendarday_id;

    this.invCalendarDayService.getRecordById(id).subscribe(
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

  // IMPORT DATA FROM SERVICE
  getAll_CalendarRecords(query?) {
    this.invCalendarService.getAllRecords(query).subscribe(
      (data: InvCalendarModel[]) => {
        let data_mapped = data.map(x => {
          return {
            id: x.inv_calendar_id,
            name: x.inv_calendar_name
          };
        });

        this.calendarList = data_mapped;
       ;

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
    this.selection = new InvCalendarDayModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.selectedCalendar);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvCalendarDayModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.selectedCalendar);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvCalendarDayModel();
    this.query = "";
    this.getAll_Records(this.query);
  }

  /********************************** */

  // BUTTON FOR NEW RECORD
  onNewRecord($event?) {
    this.show_datatable = false;
    this.show_selected_button = false;
    this.action.action = "newRecord";
    let record = new InvCalendarDayModel();
    record.inv_calendar_id = this.selectedCalendar.id;

   

    localStorage.setItem("recordSelection", JSON.stringify([record]));
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
        id: x.inv_calendarday_id,
        estatus: x.inv_calendarday_status,
        chk: x.inv_calendarday_chk,
        nombre: x.inv_calendarday_name,
        tipo: x.inv_calendarday_type
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }

  onMainListChange() {
 

    this.onGetActive(this.selectedCalendar);
  }
}
