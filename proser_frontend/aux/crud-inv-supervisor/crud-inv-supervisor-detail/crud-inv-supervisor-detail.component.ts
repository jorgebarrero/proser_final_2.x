import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  InvSupervisorModel,
  ActionConfig,
  AlertModel,
  PeopleJsonModel,
  OperationJsonModel,
  TimeJsonModel
} from "shared/models";

import { AlertService, EnvService } from "shared/services/";
import { InvSupervisorService } from "shared/services/";

import {
  onJsonParseToObject,
  onJsonParseToArray,
  onJsonDoubleParse
} from "shared/functions";

@Component({
  selector: "app-crud-inv-supervisor-detail",
  templateUrl: "./crud-inv-supervisor-detail.component.html",
  styleUrls: ["./crud-inv-supervisor-detail.component.scss"]
})
export class CrudInvSupervisorDetailComponent implements OnInit {
  @Output() editAnswer: EventEmitter<any> = new EventEmitter();

  @Input() action: ActionConfig;

  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  registerForm: FormGroup;

  show_submit_button;
  show_data;

  selection: InvSupervisorModel;

  model: InvSupervisorModel;
  report_title: string;

  typeList;
  scheduleList;
  clientList;
  queueList;
  serviceList;
  camapaignList;

  constructor(
    private formBuilder: FormBuilder,
    private invSupervisorService: InvSupervisorService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new InvSupervisorModel();

    this.typeList = [
      { id: 1, name: "Activo" },
      { id: 2, name: "Esporádico" },
      { id: 3, name: "Orientado" }
    ];

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

    /******** NEW RECORD ********* */
    if (this.action.action === "newRecord") {
      this.selection = new InvSupervisorModel();
    }

    // /******** EDIT RECORD ********* */
    // if (
    //   this.action.action === "editRecord" ||
    //   this.action.action === "showRecord"
    // ) {
    //   // PEOPLE
    //   this.selection.inv_supervisor_people_json !== null
    //     ? (this.selection.inv_supervisor_people_json = JSON.parse(
    //         JSON.parse(
    //           JSON.stringify(this.selection.inv_supervisor_people_json)
    //         )
    //       ))
    //     : (this.selection.inv_supervisor_people_json = new PeopleJsonModel());
    //   // OPERATION
    //   this.selection.inv_supervisor_operation_json !== null
    //     ? (this.selection.inv_supervisor_operation_json = JSON.parse(
    //         JSON.parse(
    //           JSON.stringify(this.selection.inv_supervisor_operation_json)
    //         )
    //       ))
    //     : (this.selection.inv_supervisor_operation_json = new OperationJsonModel());
    //   // TIME
    //   this.selection.inv_supervisor_time_json !== null
    //     ? (this.selection.inv_supervisor_time_json = JSON.parse(
    //         JSON.parse(JSON.stringify(this.selection.inv_supervisor_time_json))
    //       ))
    //     : (this.selection.inv_supervisor_time_json = new TimeJsonModel());
    // }

    /******** REGISTER FORM ********* */

    this.registerForm = this.formBuilder.group({
      inv_supervisor_id: [
        this.selection.inv_supervisor_id,
        Validators.required
      ],
      inv_supervisor_status: [
        this.selection.inv_supervisor_status,
        Validators.required
      ],
      inv_supervisor_chk: [this.selection.inv_supervisor_chk],

      inv_supervisor_name: [
        this.selection.inv_supervisor_name,
        Validators.required
      ],
      inv_supervisor_shortname: [
        this.selection.inv_supervisor_shortname,
        Validators.required
      ],
      inv_supervisor_legal_id: [
        this.selection.inv_supervisor_legal_id,
        Validators.required
      ],
      inv_supervisor_internal_id: [
        this.selection.inv_supervisor_internal_id,
        Validators.required
      ],

      inv_supervisor_people_json: [this.selection.inv_supervisor_people_json],

      inv_supervisor_operation_json: [
        this.selection.inv_supervisor_operation_json
      ],
      inv_supervisor_time_json: [this.selection.inv_supervisor_time_json],

      inv_supervisor_type_json: [this.selection.inv_supervisor_type_json],
      inv_supervisor_schedule_json: [
        this.selection.inv_supervisor_schedule_json
      ],
      inv_supervisor_client_json: [this.selection.inv_supervisor_client_json],
      inv_supervisor_queue_json: [this.selection.inv_supervisor_queue_json],
      inv_supervisor_service_json: [this.selection.inv_supervisor_service_json],
      inv_supervisor_campaign_json: [
        this.selection.inv_supervisor_campaign_json
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
  createRecord(register) {
    this.selection = this.registerForm.value;
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([this.registerForm.value])
    );
    let query = this.registerForm.value;

    query.inv_supervisor_people_json = JSON.stringify(
      this.registerForm.value.inv_supervisor_people_json
    );
    query.inv_supervisor_operation_json = JSON.stringify(
      this.registerForm.value.inv_supervisor_operation_json
    );
    query.inv_supervisor_time_json = JSON.stringify(
      this.registerForm.value.inv_supervisor_time_json
    );

    delete query.inv_supervisor_id;

    delete query.inv_supervisor_type_json;
    delete query.inv_supervisor_schedule_json;
    delete query.inv_supervisor_client_json;
    delete query.inv_supervisor_queue_json;
    delete query.inv_supervisor_service_json;
    delete query.inv_supervisor_campaign_json;

    query;

    // BACKEND CALL
    this.invSupervisorService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.inv_supervisor_id}, ${data.inv_supervisor_name}`
        );
        this.action.temp = [data];
        this.action.action = "afterCreatedRecord";
        this.editAnswer.emit(this.action);
      },
      error => {
        console.log("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // EDIT RECORD
  editRecord(register): InvSupervisorModel {
    this.selection = this.registerForm.value;
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([this.registerForm.value])
    );
    let query = this.registerForm.value;

    query.inv_supervisor_people_json = JSON.stringify(
      this.registerForm.value.inv_supervisor_people_json
    );
    query.inv_supervisor_operation_json = JSON.stringify(
      this.registerForm.value.inv_supervisor_operation_json
    );
    query.inv_supervisor_time_json = JSON.stringify(
      this.registerForm.value.inv_supervisor_time_json
    );

    delete query.inv_supervisor_type_json;
    delete query.inv_supervisor_schedule_json;
    delete query.inv_supervisor_client_json;
    delete query.inv_supervisor_queue_json;
    delete query.inv_supervisor_service_json;
    delete query.inv_supervisor_campaign_json;

    this.invSupervisorService.putRecord(query).subscribe(
      (data: InvSupervisorModel) => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.inv_supervisor_id}, ${this.action.temp.inv_supervisor_name}`
        );
        this.action.action = "selectedRecord";
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.log("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
    return;
  }

  // DELETE RECORD
  deleteRecord(query: InvSupervisorModel) {
    let id = this.action.temp.inv_supervisor_id;

    this.invSupervisorService.deleteRecord(id).subscribe(
      data => {
        // this.selection = data;
        this.action.temp = data;
        this.selection = new InvSupervisorModel();
        alert(`Registro ${id} eliminado satisfactoriamente`);
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.log("Error", error);
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
    this.selection.inv_supervisor_status = "I";
    this.registerForm.value.inv_supervisor_status = "I";
    this.show_submit_button = true;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.inv_supervisor_status = "A";
    this.registerForm.value.inv_supervisor_status = "A";
    this.show_submit_button = true;
  }

  onReset() {
    this.selection = new InvSupervisorModel();
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
    this.action.temp = [];
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
        inv_supervisor_id: 2,
        inv_supervisor_name: "Supervisor 008",
        inv_supervisor_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  // Get all lists

  // IMPORT DATA FROM SERVICE
  getAll_Schedules(query?) {
    this.invSupervisorService.getSchedules(query).subscribe(
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
    this.invSupervisorService.getClients(query).subscribe(
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
    this.invSupervisorService.getQueues(query).subscribe(
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

  getAll_Services(query?) {
    this.invSupervisorService.getServices(query).subscribe(
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
    this.invSupervisorService.getCampaigns(query).subscribe(
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

  onRecordJsonChange() {
    this.registerForm.patchValue({
      inv_supervisor_people_json: {
        supervisor: [
          {
            id: this.registerForm.value.inv_supervisor_id,
            name: this.registerForm.value.inv_supervisor_name
          }
        ],
        agent: [],
        role: [],
        type: this.registerForm.value.inv_supervisor_type_json
      }
    });

    this.registerForm.patchValue({
      inv_supervisor_operation_json: {
        campaign: this.registerForm.value.inv_supervisor_campaign_json,
        client: this.registerForm.value.inv_supervisor_client_json,
        queue: this.registerForm.value.inv_supervisor_queue_json,
        service: this.registerForm.value.inv_supervisor_service_json
      }
    });

    this.registerForm.patchValue({
      inv_supervisor_time_json: {
        calendar: [],
        schedule: this.registerForm.value.inv_supervisor_schedule_json,
        scheduledays: [],
        schedulehours: []
      }
    });
    // this.selection.inv_supervisor_people_json = this.registerForm.value.inv_supervisor_people_json;
  }

  onFormRecord() {
    console.log("registerForm", this.registerForm.value);
  }

  /*********************** */

  onSubmit(register) {
    if (this.action.action === "newRecord") {
      this.createRecord(register);
    }

    if (this.action.action === "editRecord") {
      this.selection = register;
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
