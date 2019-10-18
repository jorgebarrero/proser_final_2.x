import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import {
  InvScheduleDayModel,
  InvScheduleModel,
  ActionConfig
} from "shared/models";
import {
  InvScheduleDayService,
  InvScheduleService,
  ExcelService
} from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

import { scheduleDaysRecords } from "projects/crud/src/app/shared/functions";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-crud-inv-schedule-day",
  templateUrl: "./crud-inv-schedule-day.component.html",
  styleUrls: ["./crud-inv-schedule-day.component.scss"]
})
export class CrudInvScheduleDayComponent implements OnInit, OnDestroy {
  @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: InvScheduleDayModel;
  action: ActionConfig;

  rows;
  rows_original;
  rows_count;
  selected: [{ selected: InvScheduleDayModel }];
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

  scheduleList;
  selectedSchedule;

  theRecord;

  // INITIALIZATION
  constructor(
    private invScheduleDayService: InvScheduleDayService,
    private invScheduleService: InvScheduleService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService,
    private _route: ActivatedRoute
  ) {
    this.alertMessage = new AlertModel();

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = false;
    this.show_selected_button = false;

    this.selection = new InvScheduleDayModel();
    this.action = new ActionConfig();
    this.status_field = "inv_scheduleday_status";
    this.excel_subtitle = "turnos";

    this.selected = [{ selected: new InvScheduleDayModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {
      field_name: "inv_scheduleday_name",
      name: "nombre",
      text: "nombre"
    };
  }

  ngOnInit() {
    let record;
    let id;
    let temp = localStorage.getItem("recordSelection");
    if (temp) {
      record = JSON.parse(temp)[0];
      let selectedSchedule = {
        id: record.inv_schedule_id,
        name: record.inv_schedule_name
      };
      this.selectedSchedule = selectedSchedule;
      this.getAll_Records(selectedSchedule);
    }

    this.getAll_ScheduleRecords();

    // this.onGetActive();
  }

  ngOnDestroy() {
    localStorage.setItem("recordSelection", "");
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
  getAll_Records(selectedSchedule) {
    console.log("selectedSchedule", selectedSchedule.inv_schedule_id);

    let query = null;

    let filter_id = selectedSchedule.id;

    this.invScheduleDayService.getAllRecords(query).subscribe(
      (data: InvScheduleDayModel[]) => {
        let data_mapped = data
          .map(x => {
            return {
              inv_scheduleday_id: x.inv_scheduleday_id,
              inv_schedule_id: x.inv_schedule_id,
              inv_scheduleday_weekday: x.inv_scheduleday_weekday,
              inv_scheduleday_name: x.inv_scheduleday_name,
              inv_scheduleday_start_time: x.inv_scheduleday_start_time,
              inv_scheduleday_end_time: x.inv_scheduleday_end_time,
              inv_scheduleday_legal_break: x.inv_scheduleday_legal_break,
              inv_scheduleday_laborday: x.inv_scheduleday_laborday,
              inv_scheduleday_duration: x.inv_scheduleday_duration

              // optional,
            };
          })
          .filter(y => {
            return y.inv_schedule_id === filter_id;
          });

        this.rows_count = data_mapped.reduce(x => {
          return (x += 1);
        }, 0);

        this.show_new_button = this.rows_count === 0 ? true : false;

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
  getAll_ScheduleRecords(query?) {
    this.invScheduleService.getAllRecords(query).subscribe(
      (data: InvScheduleModel[]) => {
        let data_mapped = data.map(x => {
          return {
            id: x.inv_schedule_id,
            name: x.inv_schedule_name
          };
        });

        this.scheduleList = data_mapped;

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
    let id = event.temp.inv_scheduleday_id;

    this.invScheduleDayService.getRecordById(id).subscribe(
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
    this.selection = new InvScheduleDayModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.selectedSchedule);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvScheduleDayModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.query);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvScheduleDayModel();
    this.query = "";
    this.getAll_Records(this.query);
  }

  onNewRecord($event?) {
    let newDaysData = {
      scheduleId: this.selectedSchedule.inv_schedule_id,
      daysData: {
        start: "08:00:00",
        finish: "17:00:00",
        legalBreak: "01:00:00"
      },
      workingDays: [
        { id: 1, name: "lunes", value: true },
        { id: 1, name: "martes", value: true },
        { id: 1, name: "miércoles", value: true },
        { id: 1, name: "jueves", value: true },
        { id: 1, name: "viernes", value: true },
        { id: 1, name: "sábado", value: true },
        { id: 1, name: "domingo", value: true }
      ]
    };

    this.invScheduleDayService
      .postAllDaysRecord(this.selectedSchedule)
      .subscribe(
        data => {
          this.getAll_Records(this.selectedSchedule);
          this.show_datatable = true;

          this.alertMessage = new AlertModel();
        },
        error => {
          this.show_data = false;
          this.onError(error);
        }
      );
  }

  onAfterCreatedRecord(event?) {
    // console.error("event");
    this.rows = event.temp;
    this.show_datatable = true;
  }
  onEditRecord($event?) {
    this.show_datatable = false;
    this.action.action = "editRecord";
  }

  onAfterEditedRecord(event?) {
    // console.error("event");
    this.rows = event.temp;
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
        id: x.inv_scheduleday_id,
        estatus: x.inv_scheduleday_status,
        chk: x.inv_scheduleday_chk,
        tipo_turno: x.inv_scheduleday_type,
        nombre_turno: x.inv_scheduleday_name,
        nombre_corto: x.inv_scheduleday_shortname,
        descripcion: x.inv_scheduleday_description
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }

  onMainListChange() {
    this.onGetActive(this.selectedSchedule);
  }
}
