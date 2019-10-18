import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  InvQueueModel,
  ActionConfig,
  AlertModel,
  PeopleJsonModel,
  OperationJsonModel,
  SystemJsonModel
} from "shared/models";

import { AlertService, EnvService } from "shared/services/";
import { InvQueueService } from "shared/services/";

@Component({
  selector: "app-crud-inv-queue-detail",
  templateUrl: "./crud-inv-queue-detail.component.html",
  styleUrls: ["./crud-inv-queue-detail.component.scss"]
})
export class CrudInvQueueDetailComponent implements OnInit {
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

  model: InvQueueModel;
  report_title: string;

  scaleList;
  scheduleList;
  clientList;
  queueList;
  serviceList;
  camapaignList;

  constructor(
    private formBuilder: FormBuilder,
    private invQueueService: InvQueueService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new InvQueueModel();

    this.scaleList = [
      { id: 1, name: "Activo" },
      { id: 2, name: "Esporádico" },
      { id: 3, name: "Orientado" }
    ];

    this.getAll_Scales();
    // this.getAll_Schedules();
    this.getAll_Clients();
    // this.getAll_Queues();
    this.getAll_Services();
    // this.getAll_Campaigns();
  }

  ngOnInit() {
    this.selection = JSON.parse(localStorage.getItem("recordSelection"))[0];
    this.onFillForm();
  }

  onFillForm() {
    /******** NEW RECORD ********* */
    if (this.action.action === "newRecord") {
      this.selection = new InvQueueModel();
    }

    /******** REGISTER FORM ********* */

    // REGISTER FORM
    this.registerForm = this.formBuilder.group({
      inv_queue_id: [this.selection.inv_queue_id, Validators.required],

      inv_queue_status: [this.selection.inv_queue_status, Validators.required],
      inv_queue_chk: [this.selection.inv_queue_chk],
      inv_queue_name: [this.selection.inv_queue_name],
      inv_queue_shortname: [this.selection.inv_queue_shortname],
      inv_queue_sms_name: [this.selection.inv_queue_sms_name],
      inv_queue_number: [this.selection.inv_queue_number],
      inv_queue_type: [this.selection.inv_queue_type],

      inv_queue_operation_json: [this.selection.inv_queue_operation_json],
      inv_queue_system_json: [this.selection.inv_queue_system_json],

      inv_queue_scale_json: [this.selection.inv_queue_scale_json],
      inv_queue_client_json: [this.selection.inv_queue_client_json],
      inv_queue_service_json: [this.selection.inv_queue_service_json]
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
    let query;

    this.invQueueService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.inv_queue_id}, ${data.inv_queue_name}`
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

  // CREATE RECORD
  editRecord(temp) {
    this.selection = this.registerForm.value;
    localStorage.setItem(
      "recordSelection",
      JSON.stringify([this.registerForm.value])
    );
    let query = this.registerForm.value;

    let temp2 = this.registerForm.value.inv_queue_operation_json;
    temp2.queue = [
      {
        id: this.selection.inv_queue_id,
        name: this.selection.inv_queue_name,
        number: this.selection.inv_queue_number
      }
    ];

    // this.registerForm.value.inv_queue_operation_json
    query.inv_queue_operation_json = JSON.stringify(temp2);
    query.inv_queue_system_json = JSON.stringify(
      this.registerForm.value.inv_queue_system_json
    );

    delete query.inv_queue_scale_json;
    delete query.inv_queue_client_json;
    delete query.inv_queue_service_json;
    delete query.inv_queue_type_json;
    delete query.inv_queue_type;

    this.invQueueService.putRecord(query).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.inv_queue_id}, ${this.action.temp.inv_queue_name}`
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
  deleteRecord(query: InvQueueModel) {
    let id = this.action.temp.inv_queue_id;

    this.invQueueService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new InvQueueModel();
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
    this.selection.inv_queue_status = "I";
    this.registerForm.value.inv_queue_status = "I";
    this.show_submit_button = true;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.inv_queue_status = "A";
    this.registerForm.value.inv_queue_status = "A";
    this.show_submit_button = true;
  }

  onReset() {
    this.selection = new InvQueueModel();
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
        inv_queue_id: 2,
        inv_queue_name: "Supervisor 008",
        inv_queue_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  // Get all lists

  // IMPORT DATA FROM SERVICE
  getAll_Scales(query?) {
    this.invQueueService.getScales(query).subscribe(
      data => {
        this.scaleList = data.map(x => {
          return { id: x.inv_scale_id, name: x.inv_scale_name };
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

  getAll_Schedules(query?) {
    this.invQueueService.getSchedules(query).subscribe(
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
    this.invQueueService.getClients(query).subscribe(
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
    this.invQueueService.getQueues(query).subscribe(
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
    this.invQueueService.getServices(query).subscribe(
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
    this.invQueueService.getCampaigns(query).subscribe(
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

  /***************** */

  onRecordJsonChange() {
    this.registerForm.patchValue({
      inv_queue_operation_json: {
        client: this.registerForm.value.inv_queue_client_json,
        service: this.registerForm.value.inv_queue_service_json
      }
    });

    this.registerForm.patchValue({
      inv_queue_system_json: {
        scale: this.registerForm.value.inv_queue_scale_json
      }
    });
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
