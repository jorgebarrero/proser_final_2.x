import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  InvAuxiliarModel,
  ActionConfig,
  AlertModel,
} from 'shared/models';

import { AlertService, EnvService } from 'shared/services/';
import { InvAuxiliarService } from 'shared/services/';

@Component({
  selector: 'app-crud-inv-auxiliar-detail',
  templateUrl: './crud-inv-auxiliar-detail.component.html',
  styleUrls: ['./crud-inv-auxiliar-detail.component.scss'],
  })
export class CrudInvAuxiliarDetailComponent implements OnInit {
  @Output() editAnswer: EventEmitter<any> = new EventEmitter()

  @Input() action: ActionConfig

  alertMessage: AlertModel
  env
  error_detected = false
  error_message

  registerForm: FormGroup

  show_submit_button
  show_data

  selection

  model: InvAuxiliarModel
  report_title: string

  constructor(
    private formBuilder: FormBuilder,
    private invAuxiliarService: InvAuxiliarService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new InvAuxiliarModel();
    // console.error('model', this.model.fieldInfo('aux_color_use').text);
  }

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = this.action.temp;
    this.registerForm = this.formBuilder.group({
      inv_break_id: [this.selection.inv_break_id, Validators.required],
      inv_break_status: [this.selection.inv_break_status, Validators.required],
      inv_break_chk: [this.selection.inv_break_chk],
      inv_break_name: [this.selection.inv_break_name, Validators.required],
      inv_break_shortname: [
        this.selection.inv_break_shortname,
        Validators.required,
      ],
      inv_break_description: [
        this.selection.inv_break_description,
        Validators.required,
      ],
      inv_break_type: [this.selection.inv_break_type, Validators.required],
      inv_break_productivity: [
        this.selection.inv_break_productivity,
        Validators.required,
      ],
      inv_break_class: [this.selection.inv_break_class, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onAnswer(event) {
    this.action = event;
    this.selection = this.action.temp;
    this.action.action === 'showRecord' ? this.onShowDetail() : '';
    this.action.action === 'editRecord' ? this.onEditRecord() : '';
  }

  // CREATE RECORD
  createRecord(query: InvAuxiliarModel) {
    delete query.inv_break_class;

    this.invAuxiliarService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.inv_break_id}, ${data.inv_break_name}`
        );
        this.action.temp = [data];
        // this.selection = new AuxHourModel;
        // this.onFillForm();
        // this.show_data = true;
        this.action.action = 'afterCreatedRecord';
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error('Error', error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // CREATE RECORD
  editRecord(query: InvAuxiliarModel) {
    delete query.inv_break_class;

    this.invAuxiliarService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.inv_break_id}, ${this.action.temp.inv_break_name}`
        );
        this.action.action = 'selectedRecord';
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error('Error', error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // DELETE RECORD
  deleteRecord(query: InvAuxiliarModel) {
    let id = this.action.temp.inv_break_id;

    this.invAuxiliarService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new InvAuxiliarModel();
        this.onFillForm();
        alert(`Registro eliminado satisfactoriamente`);
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error('Error', error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  onDelete() {
    this.action.action = 'delete';
    this.deleteRecord(this.action.temp);
  }

  onDeactivate() {
    this.selection = this.action.temp;
    this.selection.inv_break_status = 'I';
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.inv_break_status = 'A';
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {
    this.selection = new InvAuxiliarModel();
    this.action.temp = this.selection;
    this.onFillForm();
  }

  afterCreatedRecord(register) {
    console.error('afterCreatedRecord - register', register);
    // this.action.action = 'afterCreatedRecord';
    // this.action.temp = [register];
    // this.editAnswer.emit(this.action);
  }

  onShowDetail() {
    this.action.action = 'showRecord';
  }

  onEditRecord() {
    this.action.action = 'editRecord';
    this.selection = this.action.temp;
    this.onFillForm();
  }

  afterEditedRecord(register) {
    this.action.action = 'afterEditedRecord';
    this.action.temp = [register];
    this.editAnswer.emit(this.action);
  }

  onCancel() {
    this.action = { action: 'cancel', temp: '' };
    this.editAnswer.emit(this.action);
  }

  onAction() {
    this.action = { action: 'edit_box', temp: '' };
    this.editAnswer.emit(this.action);
  }

  onChangeToAssignation() {
    this.selection = this.action.temp;
    this.selection.inv_break_productivity = 1;
    this.selection.inv_break_class = 'Assignation';
    this.onFillForm();
    this.show_submit_button = true;

    // this.registerForm.value.inv_break_productivity = 1;
    // console.error('change ', this.registerForm.value);
  }

  onSubmit(register) {
    if (this.action.action === 'newRecord') {
      this.createRecord(register);
      this.afterCreatedRecord(register);
    }

    if (this.action.action === 'editRecord') {
      this.selection = register;
      this.editRecord(register);
      this.afterEditedRecord(register);
    }

    if (this.action.action === 'deleteRecord') {
      this.selection = register;
      this.deleteRecord(register);
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }

    if (this.action.action === 'showRecord') {
      this.selection = register;
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }
  }

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = 'Error del servidor';
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass =
      'alert alert-danger alert-dismissible fade show';
  }

  sendTest() {
    this.action.action = 'test';
    this.action.temp = [
      {
        inv_break_id: 2,
        inv_break_name: 'Supervisor 008',
        inv_break_status: 'A',
      },
    ];

    this.editAnswer.emit(this.action);
  }
}
