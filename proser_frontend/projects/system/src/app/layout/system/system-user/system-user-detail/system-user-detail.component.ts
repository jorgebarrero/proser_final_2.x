import { AuthService } from "./../../../../../../../../shared/services/helpers/auth.service";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  UserbaseModel,
  ActionConfig,
  AlertModel,
  PeopleJsonModel,
  OperationJsonModel,
  TimeJsonModel,
  RoleMappingModel
} from "shared/models";

import { AlertService, EnvService } from "shared/services/";
import { UserbaseService, RoleMappingService } from "shared/services/";
import {
  onJsonParseToObject,
  onJsonParseToArray,
  onJsonDoubleParse
} from "shared/functions";

@Component({
  selector: "app-system-system-user-detail",
  templateUrl: "./system-user-detail.component.html",
  styleUrls: ["./system-user-detail.component.scss"]
})
export class SystemUserDetailComponent implements OnInit {
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

  model: UserbaseModel;

  user;
  role;
  roles;
  roleCode;

  typeList;

  constructor(
    private formBuilder: FormBuilder,
    private userbaseService: UserbaseService,
    private roleMappingService: RoleMappingService,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new UserbaseModel();

    // [
    //   { id: 1, name: "admin", value: 10 },
    //   { id: 2, name: "system", value: 7 },
    //   { id: 3, name: "config", value: 5 },
    //   { id: 3, name: "user", value: 0 }
    // ];
  }

  ngOnInit() {
    this.getRoles();
    this.selection = JSON.parse(localStorage.getItem("recordSelection"))[0];
    this.onFillForm();
  }

  onFillForm() {
    /******** NEW RECORD ********* */
    if (this.action.action === "newRecord") {
      this.selection = new UserbaseModel();
    }

    /******** REGISTER FORM ********* */

    this.registerForm = this.formBuilder.group({
      id: [this.selection.id],
      firstname: [this.selection.firstname],
      lastname: [this.selection.lastname],
      profile: [this.selection.profile],
      realm: [this.selection.realm],
      username: [this.selection.username, Validators.required],
      password: [this.selection.password, Validators.required],
      email: [this.selection.email, Validators.required],
      emailVerified: [this.selection.emailVerified],
      verificationToken: [this.selection.verificationToken],
      memberId: [this.selection.memberId],
      user_legal_id: [this.selection.user_legal_id],
      user_internal_id: [this.selection.user_internal_id],
      user_photo_path: [this.selection.user_photo_path],
      // optional
      profile_json: [this.selection.profile_json],
      roles: [this.selection.roles],
      emailVerified_json: [this.selection.emailVerified_json]
    });

    // console.error("registerForm", this.registerForm.value);
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
    // localStorage.setItem(
    //   "recordSelection",
    //   JSON.stringify([this.registerForm.value])
    // );
    let query = this.registerForm.value;

    delete query.id;
    this.userbaseService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.id}, ${data.username}`
        );
        this.action.temp = [data];
        this.user = data.id;
        this.role = data.profile;
        this.roleCode = this.roleAssignation(this.role);
        this.createRoleMapping(this.roleCode, this.user);
        this.action.action = "afterCreatedRecord";
        this.editAnswer.emit(this.action);
        this.registerForm.value.password = "********";
        localStorage.setItem(
          "recordSelection",
          JSON.stringify([this.registerForm.value])
        );
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // EDIT RECORD
  editRecord(register) {
    this.selection = this.registerForm.value;

    let query = this.registerForm.value;

    if (query.password === "********") {
      query.password = null;
    }

    this.userbaseService.patchRecord(query).subscribe(
      user => {
        this.selection = user;
        this.action.temp = user;
        let roleId = this.roleAssignation(user.profile);

        console.log("user patchRecord", user, user.profile, roleId);

        this.roleMappingService.findOneRecord(user).subscribe(rolMap => {
          console.log("rolMap", rolMap);
          let id = rolMap.id;
          let record = {
            roleId: roleId
          };

          this.roleMappingService
            .patchRecord(this.selection)
            .subscribe(x => {});
        });

        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.id}, ${this.action.temp.username}`
        );

        this.registerForm.value.password = "*******";
        localStorage.setItem(
          "recordSelection",
          JSON.stringify([this.registerForm.value])
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
  deleteRecord(query: UserbaseModel) {
    let id = this.action.temp.id;

    this.userbaseService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new UserbaseModel();
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

    this.deleteRoleMapping(id);
  }

  onFindRoleMapping(user) {
    this.roleMappingService.findOneRecord(user).subscribe(rolMap => {
      console.log("rolMap", rolMap);
    });
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
    this.selection = new UserbaseModel();
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

  onRecordJsonChange() {
    let temp = this.registerForm.value;
    this.registerForm.patchValue({
      profile: this.registerForm.value.profile_json.name
    });

    temp.password = "********";
    localStorage.setItem("recordSelection", JSON.stringify([temp]));
  }

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

  createRoleMapping(role, user) {
    let query = {
      principalType: "USER",
      principalId: user,
      roleId: role
    };
    this.roleMappingService.postRecord(query).subscribe(data => data);
  }

  editRoleMapping(user) {
    // this.authService.registerRoleMapping(query).subscribe(data => data);
  }

  deleteRoleMapping(id) {
    this.roleMappingService.findOneRecord(id).subscribe(
      data => {
        id = data.id;
        this.roleMappingService.deleteRecord(id).subscribe(data => data);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getRoles() {
    this.roleMappingService.getRoles().subscribe(
      data => {
        this.roles = data;
        this.typeList = data;
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  getExistingRoleMapping(item) {
    this.roleMappingService.getExistingRoleMapping(item).subscribe(
      data => {
        return data;
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  roleAssignation(role) {
    let result = null;

    if (role && this.roles) {
      result = this.roles
        .filter(x => {
          return (x.name = role);
        })
        .map(y => {
          return y.id;
        });
    }

    return result;
  }
}
