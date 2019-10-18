import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InvCalendarDayModel, ActionConfig, AlertModel } from "shared/models";

import { objectDateToTextDate } from "shared/functions";

import { AlertService, EnvService } from "shared/services/";
import { InvCalendarDayService } from "shared/services/";

@Component({
  selector: "app-crud-inv-calendar-day-detail",
  templateUrl: "./crud-inv-calendar-day-detail.component.html",
  styleUrls: ["./crud-inv-calendar-day-detail.component.scss"]
})
export class CrudInvCalendarDayDetailComponent implements OnInit {
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

  model: InvCalendarDayModel;
  report_title: string;

  constructor(
    private formBuilder: FormBuilder,
    private invCalendarDayService: InvCalendarDayService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new InvCalendarDayModel();
    // console.error('model', this.model.fieldInfo('aux_color_use').text);
  }

  ngOnInit() {
    this.selection = JSON.parse(localStorage.getItem("recordSelection"))[0];
   

    this.onFillForm();
  }

  onFillForm() {
    /******** NEW RECORD ********* */
    // if (this.action.action === "newRecord") {
    //   this.selection = new InvCalendarDayModel();
    // }

    /******** REGISTER FORM ********* */

    this.registerForm = this.formBuilder.group({
      inv_calendarday_id: [
        this.selection.inv_calendarday_id,
        Validators.required
      ],
      inv_calendar_id: [this.selection.inv_calendar_id],
      inv_calendarday_status: [
        this.selection.inv_calendarday_status,
        Validators.required
      ],

      inv_calendarday_date: [
        this.selection.inv_calendarday_date,
        Validators.required
      ],
      inv_calendarday_name: [
        this.selection.inv_calendarday_name,
        Validators.required
      ],
      inv_calendarday_type: [
        this.selection.inv_calendarday_type,
        Validators.required
      ],

      // Optional
      inv_calendarday_date_json: [
        this.selection.inv_calendarday_date_json,
        Validators.required
      ]
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
  createRecord(temp) {
    this.selection = this.registerForm.value;
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([this.registerForm.value])
    );
    let query = this.registerForm.value;

    query.inv_calendarday_date_json = JSON.stringify(
      this.registerForm.value.inv_calendarday_date_json
    );

    this.invCalendarDayService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.inv_calendarday_id}, ${data.inv_calendarday_name}`
        );
        this.action.temp = [data];
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

    query.inv_calendarday_date_json = JSON.stringify(
      this.registerForm.value.inv_calendarday_date_json
    );



   

    this.invCalendarDayService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.inv_calendarday_id}, ${this.action.temp.inv_calendarday_name}`
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
  deleteRecord(query: InvCalendarDayModel) {
    let id = this.action.temp.inv_calendarday_id;

    this.invCalendarDayService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new InvCalendarDayModel();
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
    this.selection.inv_calendarday_status = "I";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.inv_calendarday_status = "A";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {
    this.selection = new InvCalendarDayModel();
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

  /***************** */

  onRecordJsonChange() {
    this.registerForm.patchValue({
      inv_calendarday_date: objectDateToTextDate(
        this.registerForm.value.inv_calendarday_date_json
      )
    });

    localStorage.setItem(
      "recordSelection",
      JSON.stringify([this.registerForm.value])
    );


  }

  /*********************** */

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
        inv_calendarday_id: 2,
        inv_calendarday_name: "Supervisor 008",
        inv_calendarday_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  onNewDate() {}
}
