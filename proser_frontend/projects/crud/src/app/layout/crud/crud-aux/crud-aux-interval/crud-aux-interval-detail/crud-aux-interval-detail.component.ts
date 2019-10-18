import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuxIntervalModel, ActionConfig, AlertModel } from "shared/models";

import { AlertService, EnvService } from "shared/services/";
import { AuxIntervalService } from "shared/services/";

import { minutesToHHMMSS } from "shared/functions/";

import * as moment from "moment";
// import "moment-duration-format";

@Component({
  selector: "app-crud-aux-interval-detail",
  templateUrl: "./crud-aux-interval-detail.component.html",
  styleUrls: ["./crud-aux-interval-detail.component.scss"]
})
export class CrudAuxIntervalDetailComponent implements OnInit {
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

  model: AuxIntervalModel;
  report_title: string;

  constructor(
    private formBuilder: FormBuilder,
    private auxIntervalService: AuxIntervalService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new AuxIntervalModel();
    // console.error('model', this.model.fieldInfo('aux_color_use').text);
  }

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = this.action.temp;
    this.registerForm = this.formBuilder.group({
      aux_interval_id: [this.selection.aux_interval_id, Validators.required],
      aux_interval_status: [
        this.selection.aux_interval_status,
        Validators.required
      ],
      aux_interval_name: [
        this.selection.aux_interval_name,
        Validators.required
      ],
      aux_interval_minutes: [
        this.selection.aux_interval_minutes,
        Validators.required
      ],
      aux_interval_value: [this.selection.aux_interval_value]
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
  createRecord(query: AuxIntervalModel) {
    this.auxIntervalService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.aux_interval_id}, ${data.aux_interval_name}`
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

  // CREATE RECORD
  editRecord(query: AuxIntervalModel) {
    this.auxIntervalService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.aux_interval_id}, ${this.action.temp.aux_interval_name}`
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
  deleteRecord(query: AuxIntervalModel) {
    let id = this.action.temp.aux_interval_id;

    this.auxIntervalService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new AuxIntervalModel();
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
    this.selection.aux_interval_status = "I";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.aux_interval_status = "A";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {
    this.selection = new AuxIntervalModel();
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
        aux_interval_id: 2,
        aux_interval_name: "Supervisor 008",
        aux_interval_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  onChangeIntervalValue(event) {
    this.registerForm.patchValue({
      aux_interval_value: minutesToHHMMSS(
        this.registerForm.value.aux_interval_minutes
      )
    });
    this.selection.aux_interval_value = this.registerForm.value.aux_interval_value;

    this.registerForm.patchValue({
      aux_interval_name: this.registerForm.value.aux_interval_minutes + " min"
    });
    this.selection.aux_interval_name = this.registerForm.value.aux_interval_name;
  }
}
