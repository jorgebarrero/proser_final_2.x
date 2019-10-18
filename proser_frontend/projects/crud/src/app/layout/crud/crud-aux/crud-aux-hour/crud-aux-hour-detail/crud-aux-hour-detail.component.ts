import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuxHourModel, ActionConfig, AlertModel } from "shared/models";

import { AlertService, EnvService } from 'shared/services/';
import { AuxHourService } from "shared/services/";

@Component({
  selector: 'app-crud-aux-hour-detail',
  templateUrl: './crud-aux-hour-detail.component.html',
  styleUrls: ['./crud-aux-hour-detail.component.scss']
})
export class CrudAuxHourDetailComponent implements OnInit {

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

  model: AuxHourModel;

  constructor(
    private formBuilder: FormBuilder,
    private auxHourService: AuxHourService,
    private alertService: AlertService,
    private envService: EnvService,

  ) {
    this.alertMessage = new AlertModel;
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new AuxHourModel;
    // console.error('model', this.model.fieldInfo('aux_color_use').text);
  }

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = this.action.temp;
    this.registerForm = this.formBuilder.group({
      aux_hour_id: [this.selection.aux_hour_id, Validators.required],
      aux_hour_status: [this.selection.aux_hour_status, Validators.required],
      aux_hour_name: [this.selection.aux_hour_name, Validators.required],
      aux_hour_value: [this.selection.aux_hour_value, Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onAnswer(event){
    this.action = event;
    this.selection = this.action.temp;
    this.action.action === 'showRecord'? this.onShowDetail(): '';
    this.action.action === 'editRecord'? this.onEditRecord(): '';
  }


  // CREATE RECORD
  createRecord(query: AuxHourModel) {

    this.auxHourService.postRecord(query).subscribe(
      data => {
        
          alert(`Registro agregado satisfactoriamente, ${data.aux_hour_id}, ${data.aux_hour_name}`)
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

  afterCreatedRecord(register){
    let temp = [this.action.temp]
    // this.action.action = 'afterCreatedRecord';
    // this.action.temp = temp;
    // console.error('afterCreatedRecord - register', this.action);
    // this.editAnswer.emit(this.action);
  }

// CREATE RECORD
  editRecord(query: AuxHourModel) {

    this.auxHourService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(`Registro modificado satisfactoriamente, ${this.action.temp.aux_hour_id}, ${this.action.temp.aux_hour_name}`)
        this.action.action = 'selectedRecord'
        // this.show_data = true;
        // this.editAnswer.emit(this.action);
      },
      error => {
        console.error('Error', error);
        this.show_data = false;
        this.onError(error);
        
      }
    );
  }

    // DELETE RECORD
    deleteRecord(query: AuxHourModel) {

      let id = this.action.temp.aux_hour_id

      this.auxHourService.deleteRecord(id).subscribe(
        data => {
            this.selection = data;
            this.action.temp = this.selection;
            this.selection = new AuxHourModel;
            this.onFillForm();
            alert(`Registro eliminado satisfactoriamente`)
            // this.show_data = true;
            // this.editAnswer.emit(this.action);
        },
        error => {
          console.error('Error', error);
          this.show_data = false;
          this.onError(error);
          
        }
      );
    }

    onDelete() {
      this.action.action='delete';
      this.deleteRecord(this.action.temp);
    }

    onDeactivate() {
      this.selection = this.action.temp;
      this.selection.aux_hour_status = 'I';
      this.onFillForm();
      this.show_submit_button = true;
      // this.registerForm.pristine = false;
    }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.aux_hour_status = 'A';
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {

    this.selection = new AuxHourModel;
    this.action.temp = this.selection;
      this.onFillForm();
  }



  onShowDetail(){
    this.action.action = 'showRecord';
  }

  onEditRecord(){
    this.action.action = 'editRecord';
    this.selection = this.action.temp;
    this.onFillForm();
  }

  afterEditedRecord(register){
    this.action.action = 'afterEditedRecord';
    this.action.temp = [register];
    this.editAnswer.emit(this.action);
  }

  onCancel() {
    this.action = { "action": "cancel", temp: '' }
    this.editAnswer.emit(this.action);
  }

  onAction() {
    this.action = { "action": "edit_box", temp: ''  }
    this.editAnswer.emit(this.action);
  }


onSubmit(register){

  if(this.action.action === 'newRecord') {
    this.createRecord(register);
    this.afterCreatedRecord(register);
  };

  if(this.action.action === 'editRecord') {
    this.selection = register;
    this.editRecord(register);
    this.afterEditedRecord(register);
  };

  if(this.action.action === 'deleteRecord') {
    this.selection = register;
    this.deleteRecord(register);
    this.action.temp = register;
    this.editAnswer.emit(this.action);
  };

  if(this.action.action === 'showRecord') {
    this.selection = register;
    this.action.temp = register;
    this.editAnswer.emit(this.action);
  };

}

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = 'Error del servidor';
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass = 'alert alert-danger alert-dismissible fade show';
}


sendTest() {

  this.action.action = 'test';
  this.action.temp = [{aux_hour_id: 2, aux_hour_name: "Supervisor 008", aux_hour_status: "A"}];

  this.editAnswer.emit(this.action)
}

}
