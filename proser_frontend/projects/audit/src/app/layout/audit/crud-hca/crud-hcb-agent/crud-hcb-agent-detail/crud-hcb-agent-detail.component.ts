import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HcbAgentModel, ActionConfig, AlertModel } from 'shared/models';

import { AlertService, EnvService } from 'shared/services/';
import { HcbAgentService } from 'shared/services/';
import {
  onJsonParseToObject,
  onJsonParseToArray,
} from 'shared/functions';

@Component({
  selector: 'app-crud-hcb-agent-detail',
  templateUrl: './crud-hcb-agent-detail.component.html',
  styleUrls: ['./crud-hcb-agent-detail.component.scss']
})
export class CrudHcbAgentDetailComponent implements OnInit {
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

  model: HcbAgentModel
  report_title: string

  typeList

  supervisorList
  roleList
  scheduleList

  clientList
  queueList
  serviceList
  camapaignList

  constructor(
    private formBuilder: FormBuilder,
    private hcbAgentService: HcbAgentService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new HcbAgentModel();

    this.typeList = [
      { id: 1, name: 'Activo' },
      { id: 2, name: 'Esporádico' },
      { id: 3, name: 'Orientado' },
    ];
    this.getAll_Supervisors();
    this.getAll_Roles();

    this.getAll_Schedules();
    this.getAll_Clients();
    this.getAll_Queues();
    this.getAll_Services();
    this.getAll_Campaigns();
  }

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = this.action.temp;

    this.selection.hcb_agent_supervisor_json = onJsonParseToObject(
      this.action.temp.hcb_agent_supervisor_json
    );

    this.selection.hcb_agent_role_json = onJsonParseToObject(
      this.action.temp.hcb_agent_role_json
    );

    this.selection.hcb_agent_schedule_json = onJsonParseToObject(
      this.action.temp.hcb_agent_schedule_json
    );

    this.selection.hcb_agent_client_json = onJsonParseToArray(
      this.action.temp.hcb_agent_client_json
    );

    this.selection.hcb_agent_queue_json = onJsonParseToArray(
      this.action.temp.hcb_agent_queue_json
    );

    this.selection.hcb_agent_service_json = onJsonParseToArray(
      this.action.temp.hcb_agent_service_json
    );

    this.selection.hcb_agent_campaign_json = onJsonParseToArray(
      this.action.temp.hcb_agent_campaign_json
    );

    this.registerForm = this.formBuilder.group({
      hcb_agent_id: [this.selection.hcb_agent_id, Validators.required],

      hcb_agent_serial: [this.selection.hcb_agent_serial, Validators.required],

      hcb_agent_date: [this.selection.hcb_agent_date],

      hcb_agent_agent_id: [this.selection.hcb_agent_agent_id, Validators.required],

      hcb_agent_name: [
        this.selection.hcb_agent_name,
        Validators.required,
      ],

      hcb_agent_extension: [
        this.selection.hcb_agent_extension,
        Validators.required,
      ],

      hcb_agent_supervisor_id: [
        this.selection.hcb_agent_supervisor_id,
        Validators.required,
      ],

      hcb_agent_supervisor_name: [
        this.selection.hcb_agent_supervisor_name,
        Validators.required,
      ],

      hcb_agent_schedule_id: [this.selection.hcb_agent_schedule_id],
      hcb_agent_schedule_name: [this.selection.hcb_agent_schedule_name],
      hcb_agent_calendarday_name: [this.selection.hcb_agent_calendarday_name],
      hcb_agent_schedule_plan: [this.selection.hcb_agent_schedule_plan],
      hcb_agent_schedule_start: [this.selection.hcb_agent_schedule_start],
      hcb_agent_schedule_end: [this.selection.hcb_agent_schedule_end],
      hcb_agent_schedule_break: [this.selection.hcb_agent_schedule_break],
      hcb_agent_schedule_duration: [this.selection.hcb_agent_schedule_duration],
      hcb_agent_status: [this.selection.hcb_agent_status],
      hcb_agent_laborday: [this.selection.hcb_agent_laborday],

      hcb_agent_supervisor_json: [this.selection.hcb_agent_supervisor_json],
      hcb_agent_schedule_json: [this.selection.hcb_agent_schedule_json],
      hcb_agent_client_json: [this.selection.hcb_agent_client_json],
      hcb_agent_queue_json: [this.selection.hcb_agent_queue_json],
      hcb_agent_service_json: [this.selection.hcb_agent_service_json],
      hcb_agent_campaign_json: [this.selection.hcb_agent_campaign_json],
      hcb_agent_role_json: [this.selection.hcb_agent_role_json],
      hcb_agent_scheduleday_json: [this.selection.hcb_agent_scheduleday_json],
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
  createRecord(temp: HcbAgentModel) {
    let query = temp;

    query.hcb_agent_supervisor_json = JSON.stringify([
      temp.hcb_agent_supervisor_json,
    ]);
    query.hcb_agent_schedule_json = JSON.stringify([
      temp.hcb_agent_schedule_json,
    ]);
    query.hcb_agent_role_json = JSON.stringify([temp.hcb_agent_role_json]);

    query.hcb_agent_client_json = JSON.stringify(temp.hcb_agent_client_json);
    query.hcb_agent_queue_json = JSON.stringify(temp.hcb_agent_queue_json);
    query.hcb_agent_service_json = JSON.stringify(temp.hcb_agent_service_json);
    query.hcb_agent_campaign_json = JSON.stringify(temp.hcb_agent_campaign_json);

    console.error('createRecord', query);

    this.hcbAgentService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.hcb_agent_id}, ${data.hcb_agent_name}`
        );
        this.action.temp = [data];
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
  editRecord(temp: HcbAgentModel) {
    let query = temp;

    query.hcb_agent_supervisor_json = JSON.stringify([
      temp.hcb_agent_supervisor_json,
    ]);
    query.hcb_agent_role_json = JSON.stringify([temp.hcb_agent_role_json]);
    query.hcb_agent_schedule_json = JSON.stringify([
      temp.hcb_agent_schedule_json,
    ]);

    query.hcb_agent_client_json = JSON.stringify(temp.hcb_agent_client_json);
    query.hcb_agent_queue_json = JSON.stringify(temp.hcb_agent_queue_json);
    query.hcb_agent_service_json = JSON.stringify(temp.hcb_agent_service_json);
    query.hcb_agent_campaign_json = JSON.stringify(temp.hcb_agent_campaign_json);

    this.hcbAgentService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.hcb_agent_id}, ${this.action.temp.hcb_agent_name}`
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
  deleteRecord(query: HcbAgentModel) {
    let id = this.action.temp.hcb_agent_id;

    this.hcbAgentService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new HcbAgentModel();
        alert(`Registro ${id} eliminado satisfactoriamente`);
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
    this.selection.hcb_agent_status = 'I';
    this.registerForm.value.hcb_agent_status = 'I';
    this.show_submit_button = true;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.hcb_agent_status = 'A';
    this.registerForm.value.hcb_agent_status = 'A';
    console.error('onReactivate', this.registerForm.value);
    this.show_submit_button = true;
  }

  onReset() {
    this.selection = new HcbAgentModel();
    this.action.temp = this.selection;
    this.onFillForm();
  }

  afterCreatedRecord(register) {}

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
        hcb_agent_id: 2,
        hcb_agent_name: 'Supervisor 008',
        hcb_agent_status: 'A',
      },
    ];

    this.editAnswer.emit(this.action);
  }

  // Get all lists

  // IMPORT DATA FROM SERVICE
  getAll_Schedules(query?) {
    this.hcbAgentService.getSchedules(query).subscribe(
      data => {
        this.scheduleList = data.map(x => {
          return { id: x.inv_schedule_id, name: x.inv_schedule_name };
        });

        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getAll_Clients(query?) {
    this.hcbAgentService.getClients(query).subscribe(
      data => {
        this.clientList = data.map(x => {
          return { id: x.inv_client_id, name: x.inv_client_name };
        });
        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getAll_Queues(query?) {
    this.hcbAgentService.getQueues(query).subscribe(
      data => {
        this.queueList = data.map(x => {
          return {
            id: x.inv_queue_id,
            name: `${x.inv_queue_number} - ${x.inv_queue_name}`,
          };
        });
        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getAll_Services(query?) {
    this.hcbAgentService.getServices(query).subscribe(
      data => {
        this.serviceList = data.map(x => {
          return { id: x.inv_service_id, name: x.inv_service_name };
        });
        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getAll_Campaigns(query?) {
    this.hcbAgentService.getCampaigns(query).subscribe(
      data => {
        this.camapaignList = data.map(x => {
          return { id: x.inv_campaign_id, name: x.inv_campaign_name };
        });
        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getAll_Supervisors(query?) {
    this.hcbAgentService.getSupervisors(query).subscribe(
      data => {
        this.supervisorList = data.map(x => {
          return { id: x.inv_supervisor_id, name: x.inv_supervisor_name };
        });
        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getAll_Roles(query?) {
    this.hcbAgentService.getRoles(query).subscribe(
      data => {
        this.roleList = data.map(x => {
          return { id: x.inv_agentrole_id, name: x.inv_agentrole_name };
        });
        this.alertMessage = new AlertModel();
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  /*********************** */

  onSubmit(register) {
    if (this.action.action === 'newRecord') {
      this.createRecord(register);
    }

    if (this.action.action === 'editRecord') {
      this.selection = register;
      this.editRecord(register);
      this.afterEditedRecord(register);
    }

    if (this.action.action === 'deleteRecord') {
      this.selection = register;
      this.deleteRecord(register);
      // this.action.temp = register;
      this.editAnswer.emit(this.action);
    }

    if (this.action.action === 'showRecord') {
      this.selection = register;
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }
  }
}

/*

onJsonParseToArray(data) {
    

    if (data) {
      try {
        a = JSON.parse(data);
        return a;
        console.error('data', a);
      } catch (error) {
        console.error(
          'err on JsonParse',
          error,
          'error in the above string (in this case, yes)!'
        );
      }
    } else {
      return data;
    }
  }

  */
