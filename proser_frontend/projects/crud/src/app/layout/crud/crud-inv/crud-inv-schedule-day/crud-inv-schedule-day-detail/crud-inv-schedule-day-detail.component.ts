import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvScheduleDayModel, ActionConfig, AlertModel } from "shared/models";

import { AlertService, EnvService } from "shared/services/";
import { InvScheduleDayService } from "shared/services/";

@Component({
  selector: "app-crud-inv-schedule-day-detail",
  templateUrl: "./crud-inv-schedule-day-detail.component.html",
  styleUrls: ["./crud-inv-schedule-day-detail.component.scss"]
})
export class CrudInvScheduleDayDetailComponent implements OnInit {
  @Output() editAnswer: EventEmitter<any> = new EventEmitter();

  @Input() action: ActionConfig;

  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  registerForm: FormGroup;

  show_submit_button;
  show_data;

  selection;

  model: InvScheduleDayModel;
  report_title: string;

  constructor(
    private formBuilder: FormBuilder,
    private invScheduleDayService: InvScheduleDayService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new InvScheduleDayModel();
    // console.error('model', this.model.fieldInfo('aux_color_use').text);
  }

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = this.action.temp;

    this.selection.inv_scheduleday_start_time === null
      ? (this.selection.inv_scheduleday_start_time = "08:00:00")
      : this.selection.inv_scheduleday_start_time;

    this.selection.inv_scheduleday_end_time === null
      ? (this.selection.inv_scheduleday_end_time = "17:00:00")
      : this.selection.inv_scheduleday_end_time;

    this.selection.inv_scheduleday_legal_break === null
      ? (this.selection.inv_scheduleday_legal_break = "01:00:00")
      : this.selection.inv_scheduleday_legal_break;

    this.selection.inv_scheduleday_legal_break === null
      ? (this.selection.inv_scheduleday_legal_break = "01:00:00")
      : this.selection.inv_scheduleday_legal_break;

    this.selection.inv_scheduleday_start_time !== null &&
    this.selection.inv_scheduleday_end_time !== null
      ? (this.selection.inv_scheduleday_laborday = 1)
      : this.selection.inv_scheduleday_laborday;

    this.selection.inv_scheduleday_duration === null
      ? (this.selection.inv_scheduleday_duration = "08:00:00")
      : this.selection.inv_scheduleday_duration;

    this.registerForm = this.formBuilder.group({
      inv_scheduleday_id: [
        this.selection.inv_scheduleday_id,
        Validators.required
      ],
      inv_schedule_id: [this.selection.inv_schedule_id, Validators.required],
      inv_scheduleday_weekday: [this.selection.inv_scheduleday_weekday],
      inv_scheduleday_name: [this.selection.inv_scheduleday_name],
      inv_scheduleday_start_time: [
        this.selection.inv_scheduleday_start_time,
        [
          Validators.required
          // Validators.pattern("/^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/")
        ]
      ],
      inv_scheduleday_end_time: [
        this.selection.inv_scheduleday_end_time,
        [
          Validators.required
          // Validators.pattern("/^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/")
        ]
      ],
      inv_scheduleday_legal_break: [
        this.selection.inv_scheduleday_legal_break,
        [
          Validators.required
          // Validators.pattern("/^(?:2[0-3]|[01]?[0-9]):[0-5][0-9]:[0-5][0-9]$/")
        ]
      ],
      inv_scheduleday_laborday: [this.selection.inv_scheduleday_laborday],
      inv_scheduleday_duration: [this.selection.inv_scheduleday_duration]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onAnswer(event) {
    this.action = event;
    this.selection = this.action.temp;
    this.action.action === "showRecord" ? this.onShowDetail() : "";
    this.action.action === "editRecord" ? this.onEditRecord() : "";
  }

  // CREATE RECORD
  createRecord(query: InvScheduleDayModel) {
    this.invScheduleDayService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.inv_scheduleday_id}, ${data.inv_scheduleday_name}`
        );
        this.action.temp = [data];
        // this.selection = new AuxHourModel;
        // this.onFillForm();
        // this.show_data = true;
        this.action.action = "afterCreatedRecord";
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // EDIT RECORD
  editRecord(temp) {
    this.selection = this.registerForm.value;
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([this.registerForm.value])
    );
    let query = this.registerForm.value;

   

    // delete query.inv_scheduleday_duration;

    this.invScheduleDayService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.inv_scheduleday_id}, ${this.action.temp.inv_scheduleday_name}`
        );
        this.action.action = "selectedRecord";
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // DELETE RECORD
  deleteRecord(query: InvScheduleDayModel) {
    let id = this.action.temp.inv_scheduleday_id;

    this.invScheduleDayService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new InvScheduleDayModel();
        this.onFillForm();
        alert(`Registro eliminado satisfactoriamente`);
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  onDelete() {
    this.action.action = "delete";
    this.deleteRecord(this.action.temp);
  }

  onDeactivate() {
    this.selection = this.action.temp;
    this.selection.inv_scheduleday_status = "I";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.inv_scheduleday_status = "A";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {
    this.selection = new InvScheduleDayModel();
    this.action.temp = this.selection;
    this.onFillForm();
  }

  afterCreatedRecord(register) {
    console.error("afterCreatedRecord - register", register);
    // this.action.action = 'afterCreatedRecord';
    // this.action.temp = [register];
    // this.editAnswer.emit(this.action);
  }

  onShowDetail() {
    this.action.action = "showRecord";
  }

  onEditRecord() {
    this.action.action = "editRecord";
    this.selection = this.action.temp;
    this.onFillForm();
  }

  afterEditedRecord(register) {
    this.action.action = "afterEditedRecord";
    this.action.temp = [register];
    this.editAnswer.emit(this.action);
  }

  onCancel() {
    this.action = { action: "cancel", temp: "" };
    this.editAnswer.emit(this.action);
  }

  onAction() {
    this.action = { action: "edit_box", temp: "" };
    this.editAnswer.emit(this.action);
  }

  onSubmit(register) {
    this.onRecordJsonChange();
    if (this.action.action === "newRecord") {
      this.createRecord(register);
      this.afterCreatedRecord(register);
    }

    if (this.action.action === "editRecord") {
      this.selection = register;
      this.editRecord(register);
      this.afterEditedRecord(register);
    }

    if (this.action.action === "deleteRecord") {
      this.selection = register;
      this.deleteRecord(register);
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }

    if (this.action.action === "showRecord") {
      this.selection = register;
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }
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

  sendTest() {
    this.action.action = "test";
    this.action.temp = [
      {
        inv_scheduleday_id: 2,
        inv_scheduleday_name: "Supervisor 008",
        inv_scheduleday_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  onRecordJsonChange() {
    this.selection.inv_scheduleday_duration = this.calculateDuration(
      this.registerForm.value.inv_scheduleday_start_time,
      this.registerForm.value.inv_scheduleday_end_time,
      this.registerForm.value.inv_scheduleday_legal_break
    );

    this.registerForm.patchValue({
      inv_scheduleday_duration: this.selection.inv_scheduleday_duration
    });
  }

  calculateDuration(start, end, legalBreak) {
    let result = "00:00:00";
    let start_sec = this.hmsToSeconds(start);
    let end_sec = this.hmsToSeconds(end);
    let legalBreak_sec = this.hmsToSeconds(legalBreak);

    if (start && end) {
      let duration_sec = end_sec - start_sec - legalBreak_sec;
      result = this.secondsToHMS(duration_sec);
    }
    return result;
  }

  hmsToSeconds(s) {
    var b = s.split(":");
    return b[0] * 3600 + b[1] * 60 + (+b[2] || 0);
  }

  secondsToHMS(secs) {
    function z(n) {
      return (n < 10 ? "0" : "") + n;
    }
    var sign = secs < 0 ? "-" : "";
    secs = Math.abs(secs);
    return (
      sign +
      z((secs / 3600) | 0) +
      ":" +
      z(((secs % 3600) / 60) | 0) +
      ":" +
      z(secs % 60)
    );
  }
}
