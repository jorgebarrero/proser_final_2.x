import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuxColorModel, ActionConfig, AlertModel } from "shared/models";

import { AlertService, EnvService } from 'shared/services/';
import { AuxColorService } from "shared/services/";

@Component({
  selector: 'app-crud-aux-color-detail',
  templateUrl: './crud-aux-color-detail.component.html',
  styleUrls: ['./crud-aux-color-detail.component.scss']
})

@Component({
  selector: 'app-crud-aux-color-detail',
  templateUrl: './crud-aux-color-detail.component.html',
  styleUrls: ['./crud-aux-color-detail.component.scss']
})
export class CrudAuxColorDetailComponent implements OnInit {

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

  model: AuxColorModel;

  constructor(
    private formBuilder: FormBuilder,
    private auxColorService: AuxColorService,
    private alertService: AlertService,
    private envService: EnvService,

  ) {
    this.alertMessage = new AlertModel;
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new AuxColorModel;
    // console.error('model', this.model.fieldInfo('aux_color_use').text);
     
  }

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = this.action.temp;
    this.registerForm = this.formBuilder.group({
      aux_color_id: [this.selection.aux_color_id, Validators.required],
      aux_color_status: [this.selection.aux_color_status, Validators.required],
      aux_color_name: [this.selection.aux_color_name, Validators.required],

      aux_color_string: [this.selection.aux_color_string, Validators.required],
      aux_color_use: [this.selection.aux_color_use, Validators.required],
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
  createRecord(query: AuxColorModel) {

    this.auxColorService.postRecord(query).subscribe(
      data => {
        
          alert(`Registro agregado satisfactoriamente, ${data.aux_color_id}, ${data.aux_color_name}`)
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
  editRecord(query: AuxColorModel) {
    

    this.auxColorService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(`Registro modificado satisfactoriamente, ${this.action.temp.aux_color_id}, ${this.action.temp.aux_color_name}`)
        this.action.action = 'selectedRecord'
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
    deleteRecord(query: AuxColorModel) {

      let id = this.action.temp.aux_color_id

      this.auxColorService.deleteRecord(id).subscribe(
        data => {
            this.selection = data;
            this.action.temp = this.selection;
            this.selection = new AuxColorModel;
            this.onFillForm();
            alert(`Registro eliminado satisfactoriamente`)
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
      this.action.action='delete';
      this.deleteRecord(this.action.temp);
    }

    onDeactivate() {
      this.selection = this.action.temp;
      this.selection.aux_color_status = 'I';
      this.onFillForm();
      this.show_submit_button = true;
      // this.registerForm.pristine = false;
    }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.aux_color_status = 'A';
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {

    this.selection = new AuxColorModel;
    this.action.temp = this.selection;
      this.onFillForm();
  }

  afterCreatedRecord(register){
    // console.error('afterCreatedRecord - register', register);
    // this.action.action = 'afterCreatedRecord';
    // this.action.temp = [register];
    // this.editAnswer.emit(this.action);
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
  this.action.temp = [{aux_color_id: 2, aux_color_name: "Supervisor 008", aux_color_status: "A"}];

  this.editAnswer.emit(this.action)
}

}
