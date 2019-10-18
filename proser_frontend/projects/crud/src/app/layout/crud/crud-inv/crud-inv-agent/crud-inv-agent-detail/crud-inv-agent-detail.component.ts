import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  InvAgentModel,
  ActionConfig,
  AlertModel,
  PeopleJsonModel,
  OperationJsonModel,
  TimeJsonModel
} from "shared/models";

import { AlertService, EnvService } from "shared/services/";
import { InvAgentService } from "shared/services/";
import {
  onJsonParseToObject,
  onJsonParseToArray,
  onJsonDoubleParse
} from "shared/functions";

@Component({
  selector: "app-crud-inv-agent-detail",
  templateUrl: "./crud-inv-agent-detail.component.html",
  styleUrls: ["./crud-inv-agent-detail.component.scss"]
})
export class CrudInvAgentDetailComponent implements OnInit {
  @Output() editAnswer: EventEmitter<any> = new EventEmitter();
  @Output() sendAnswer: EventEmitter<any> = new EventEmitter();

  @Input() action: ActionConfig;

  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  registerForm: FormGroup;

  show_submit_button;
  show_data;

  selection;

  model: InvAgentModel;
  report_title: string;

  typeList;

  supervisorList;
  calendarList;
  roleList;
  scheduleList;

  clientList;
  queueList;
  serviceList;
  camapaignList;

  constructor(
    private formBuilder: FormBuilder,
    private invAgentService: InvAgentService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new InvAgentModel();

    this.typeList = [
      { id: 1, name: "Activo" },
      { id: 2, name: "Esporádico" },
      { id: 3, name: "Orientado" }
    ];
    this.getAll_Supervisors();
    this.getAll_Roles();

    this.getAll_Schedules();
    this.getAll_Calendars();
    this.getAll_Clients();
    this.getAll_Queues();
    this.getAll_Services();
    this.getAll_Campaigns();
  }

  ngOnInit() {
    this.selection = JSON.parse(localStorage.getItem("recordSelection"))[0];
    this.onFillForm();
  }

  onFillForm() {
    /******** NEW RECORD ********* */
    if (this.action.action === "newRecord") {
      this.selection = new InvAgentModel();
    }

    /******** REGISTER FORM ********* */

    this.registerForm = this.formBuilder.group({
      inv_agent_id: [this.selection.inv_agent_id, Validators.required],
      inv_agent_status: [this.selection.inv_agent_status, Validators.required],
      inv_agent_chk: [this.selection.inv_agent_chk],
      inv_agent_name: [this.selection.inv_agent_name, Validators.required],
      inv_agent_shortname: [
        this.selection.inv_agent_shortname,
        Validators.required
      ],

      inv_agent_extension: [
        this.selection.inv_agent_extension,
        Validators.required
      ],

      inv_agent_legal_id: [this.selection.inv_agent_legal_id],

      inv_agent_internal_id: [this.selection.inv_agent_internal_id],

      inv_agent_type: [this.selection.inv_agent_type],

      inv_agent_people_json: [this.selection.inv_agent_people_json],
      inv_agent_operation_json: [this.selection.inv_agent_operation_json],
      inv_agent_time_json: [this.selection.inv_agent_time_json],

      // Optional
      inv_agent_role_json: [this.selection.inv_agent_role_json],
      inv_agent_supervisor_json: [this.selection.inv_agent_supervisor_json],

      inv_agent_schedule_json: [this.selection.inv_agent_schedule_json],
      inv_agent_calendar_json: [this.selection.inv_agent_calendar_json],
      inv_agent_client_json: [this.selection.inv_agent_client_json],
      inv_agent_queue_json: [this.selection.inv_agent_queue_json],
      inv_agent_service_json: [this.selection.inv_agent_service_json],
      inv_agent_campaign_json: [this.selection.inv_agent_campaign_json]
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
    let record = this.registerForm.value;

    record.inv_agent_people_json = JSON.stringify(
      this.registerForm.value.inv_agent_people_json
    );
    record.inv_agent_operation_json = JSON.stringify(
      this.registerForm.value.inv_agent_operation_json
    );
    record.inv_agent_time_json = JSON.stringify(
      this.registerForm.value.inv_agent_time_json
    );

    delete record.inv_agent_id;

    delete record.inv_agent_role_json;
    delete record.inv_agent_supervisor_json;
    delete record.inv_agent_schedule_json;
    delete record.inv_agent_client_json;
    delete record.inv_agent_queue_json;
    delete record.inv_agent_service_json;
    delete record.inv_agent_campaign_json;

    record;

    // BACKEND CALL
    this.invAgentService.postRecord(record).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.inv_agent_id}, ${data.inv_agent_name}`
        );

        this.action.temp = [data];

        this.action.action = "afterCreatedRecord";
        this.sendAnswer.emit(this.action);
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

    query.inv_agent_people_json = JSON.stringify(
      this.selection.inv_agent_people_json
    );
    query.inv_agent_operation_json = JSON.stringify(
      this.selection.inv_agent_operation_json
    );
    query.inv_agent_time_json = JSON.stringify(
      this.selection.inv_agent_time_json
    );

    delete query.inv_agent_role_json;
    delete query.inv_agent_supervisor_json;
    delete query.inv_agent_schedule_json;
    delete query.inv_agent_client_json;
    delete query.inv_agent_queue_json;
    delete query.inv_agent_service_json;
    delete query.inv_agent_campaign_json;

    

    this.invAgentService.putRecord(query).subscribe(
      (data: InvAgentModel) => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.inv_agent_id}, ${this.action.temp.inv_agent_name}`
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
    return;
  }

  // DELETE RECORD
  deleteRecord(record: InvAgentModel) {
    let id = this.action.temp.inv_agent_id;

    this.invAgentService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new InvAgentModel();
        alert(`Registro ${id} eliminado satisfactoriamente`);
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
    this.selection.inv_agent_status = "I";
    this.registerForm.value.inv_agent_status = "I";
    this.show_submit_button = true;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.inv_agent_status = "A";
    this.registerForm.value.inv_agent_status = "A";
    console.error("onReactivate", this.registerForm.value);
    this.show_submit_button = true;
  }

  onReset() {
    this.selection = new InvAgentModel();
    this.action.temp = this.selection;
    this.onFillForm();
  }

  afterCreatedRecord(register) {}

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
        inv_agent_id: 2,
        inv_agent_name: "Supervisor 008",
        inv_agent_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  // Get all lists

  // IMPORT DATA FROM SERVICE
  getAll_Schedules(record?) {
    this.invAgentService.getSchedules(record).subscribe(
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

  getAll_Calendars(record?) {
    this.invAgentService.getCalendars(record).subscribe(
      data => {
        this.calendarList = data.map(x => {
       

          return { id: x.inv_calendar_id, name: x.inv_calendar_name };
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

  getAll_Clients(record?) {
    this.invAgentService.getClients(record).subscribe(
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

  getAll_Queues(record?) {
    this.invAgentService.getQueues(record).subscribe(
      data => {
        this.queueList = data.map(x => {
          return {
            id: x.inv_queue_id,
            name: `${x.inv_queue_number} - ${x.inv_queue_name}`
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

  getAll_Services(record?) {
    this.invAgentService.getServices(record).subscribe(
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

  getAll_Campaigns(record?) {
    this.invAgentService.getCampaigns(record).subscribe(
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

  getAll_Supervisors(record?) {
    this.invAgentService.getSupervisors(record).subscribe(
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

  getAll_Roles(record?) {
    this.invAgentService.getRoles(record).subscribe(
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

  /*********************** 

    // OPTIONAL
    inv_agent_role_json: any;
    inv_agent_supervisor_json: any;
    inv_agent_schedule_json: any;
  
    inv_agent_client_json: any;
    inv_agent_queue_json: any;
    inv_agent_service_json: any;
    inv_agent_campaign_json: any;

*/

  onRecordJsonChange() {
    this.registerForm.patchValue({
      inv_agent_people_json: {
        supervisor: this.registerForm.value.inv_agent_supervisor_json,
        agent: [
          {
            id: this.registerForm.value.inv_agent_id,
            name: this.registerForm.value.inv_agent_name
          }
        ],
        role: this.registerForm.value.inv_agent_role_json,
        type: this.registerForm.value.inv_agent_type_json
      }
    });

    this.registerForm.patchValue({
      inv_agent_operation_json: {
        campaign: this.registerForm.value.inv_agent_campaign_json,
        client: this.registerForm.value.inv_agent_client_json,
        queue: this.registerForm.value.inv_agent_queue_json,
        service: this.registerForm.value.inv_agent_service_json
      }
    });

    this.registerForm.patchValue({
      inv_agent_time_json: {
        calendar: this.registerForm.value.inv_agent_calendar_json,
        schedule: this.registerForm.value.inv_agent_schedule_json,
        scheduledays: [],
        schedulehours: []
      }
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
    }

    if (this.action.action === "editRecord") {
      this.editRecord(register);
      this.afterEditedRecord(register);
    }

    if (this.action.action === "deleteRecord") {
      this.selection = register;
      this.deleteRecord(register);
      // this.action.temp = register;
      this.editAnswer.emit(this.action);
    }

    if (this.action.action === "showRecord") {
      this.selection = register;
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }
  }
}
