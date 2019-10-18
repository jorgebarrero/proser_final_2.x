import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertModel, UserbaseModel } from "shared/models";
import { MustMatch } from "shared/functions";

// Component imports
import { CrudUserbaseModel } from "../CrudUserbase.model";
import {
  UserbaseService,
  RoleMappingService,
  AlertService,
  AuthService
} from "shared/services";

@Component({
  selector: "app-user-crud-userbase-detail",
  templateUrl: "./crud-userbase-detail.component.html",
  styleUrls: ["./crud-userbase-detail.component.scss"]
})
export class CrudUserbaseDetailComponent implements OnInit {
  @Input() crudRecord: CrudUserbaseModel;

  registerForm;

  role;
  roles;
  roleCode;
  typeList;

  profile_json;
  roleItem;

  constructor(
    private formBuilder: FormBuilder,
    private userbaseService: UserbaseService,
    private roleMappingService: RoleMappingService,
    private alertService: AlertService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.onFillForm();
    // this.crudRecord.currentRecord.roleMapping = this.getExistingRoleMapping(
    //   this.crudRecord.currentRecord
    // );
  }

  onFillForm() {
    /******** REGISTER FORM ********* */

    this.registerForm = this.formBuilder.group(
      {
        id: [this.crudRecord.currentRecord.id],

        firstname: [
          this.crudRecord.currentRecord.firstname,
          Validators.required
        ],
        lastname: [this.crudRecord.currentRecord.lastname, Validators.required],
        profile: [this.crudRecord.currentRecord.profile, Validators.required],
        realm: [this.crudRecord.currentRecord.realm, Validators.required],

        username: [
          this.crudRecord.currentRecord.username,
          [Validators.required, Validators.minLength(5)]
        ],

        password: [
          this.crudRecord.currentRecord.password,
          [Validators.required, Validators.minLength(6)]
        ],

        confirmPassword: ["", Validators.required],

        email: [
          this.crudRecord.currentRecord.email,
          [Validators.required, Validators.email]
        ],

        emailVerified: [this.crudRecord.currentRecord.emailVerified],
        verificationToken: [this.crudRecord.currentRecord.verificationToken],
        memberId: [this.crudRecord.currentRecord.memberId],

        user_legal_id: [
          this.crudRecord.currentRecord.user_legal_id,
          [Validators.pattern("^[0-9]*$")]
        ],

        user_internal_id: [this.crudRecord.currentRecord.user_internal_id],
        user_photo_path: [this.crudRecord.currentRecord.user_photo_path],
        // optional
        profile_json: [this.crudRecord.currentRecord.profile_json],
        emailVerified_json: [this.crudRecord.currentRecord.emailVerified_json]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onRecordChange() {
    this.registerForm.patchValue({
      profile: this.registerForm.value.profile_json.name
    });

    this.crudRecord.action === "new" ? this.onCheckIfExists() : "";
  }

  onButton() {}

  /***************************************** */

  // CREATE RECORD
  createRecord() {
    // put form values into variable
    let query = this.registerForm.value;
    this.profile_json = this.registerForm.value.profile_json;

    // remove optinal fields not present in database
    delete query.id;
    delete query.profile_json;
    delete query.emailVerified_json;
    delete query.confirmPassword;

    // sent data to service
    this.userbaseService.postRecord(query).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.id}, ${data.username}`
        );

        let data_mapped = [data].map(x => {
          return {
            id: x.id,
            firstname: x.firstname,
            lastname: x.lastname,
            profile: x.profile,
            realm: x.realm,
            username: x.username,
            password: x.password,
            email: x.email,
            emailVerified: x.emailVerified,
            verificationToken: x.verificationToken,
            memberId: x.memberId,
            user_legal_id: x.user_legal_id,
            user_internal_id: x.user_internal_id,
            user_photo_path: x.user_photo_path,
            // Optional
            profile_json: { id: 0, name: x.profile },
            emailVerified_json: { id: 0, name: x.emailVerified }
          };
        });

        this.crudRecord.currentRecord = data_mapped[0];

        // console.log("this.roleCode", this.roleCode);

        this.createRoleMapping(
          this.profile_json,
          this.crudRecord.currentRecord.id
        );

        this.crudRecord.action = "view";
      },
      error => {
        console.error("Error", error);
        this.onError(error);
      }
    );
  }

  // EDIT RECORD
  editRecord() {
    console.log("EDIT");

    // put form values into variable
    let query = this.registerForm.value;
    query.profile_json = JSON.stringify(this.registerForm.value.profile_json);
    let profile_json = JSON.parse(this.registerForm.value.profile_json);

    // remove optinal fields not present in database
    delete profile_json.created;
    delete profile_json.modified;

    delete query.emailVerified_json;
    delete query.confirmPassword;
    delete query.roleMapping;

    delete query.roles;

    // sent data to service
    this.userbaseService.patchRecord(query).subscribe(
      data => {
        alert(
          `Registro modificado satisfactoriamente, ${data.id}, ${data.username}`
        );

        let data_mapped = [data].map(x => {
          return {
            id: x.id,
            firstname: x.firstname,
            lastname: x.lastname,
            profile: x.profile,
            realm: x.realm,
            username: x.username,
            password: x.password,
            email: x.email,
            emailVerified: x.emailVerified,
            verificationToken: x.verificationToken,
            memberId: x.memberId,
            user_legal_id: x.user_legal_id,
            user_internal_id: x.user_internal_id,
            user_photo_path: x.user_photo_path,
            // Optional
            roles: x.roles,
            // roleMapping: x.roles,
            profile_json: x.profile_json
            // emailVerified_json: { id: 0, name: x.emailVerified }
          };
        });

        this.roleMappingService.getExistingRoleMapping(query.id).subscribe(
          data => {
            this.roleItem = data;
            this.crudRecord.currentRecord.roleMapping = data;

            let temp = {
              id: this.roleItem.id,
              principalType: "USER",
              principalId: this.crudRecord.currentRecord.id,
              roleId: profile_json.id
            };

            this.roleMappingService.patchRecord(temp).subscribe(
              data => {
                return data;
              },
              error => {
                console.error("Error", error);
                this.onError(error);
              }
            );

            return data;
          },
          error => {
            this.roleItem = null;
            // console.error("Error", error);
            // this.onError(error);
          }
        );

        this.crudRecord.currentRecord = data_mapped[0];
        this.crudRecord.currentRecord.profile_json = profile_json;

        this.crudRecord.action = "view";
      },
      error => {
        console.error("Error", error);
        this.onError(error);
      }
    );
  }

  // DELETE RECORD
  deleteRecord() {
    let currentRecord = this.crudRecord.currentRecord;
    let userId = this.crudRecord.currentRecord.id;
    let roleId;
    this.crudRecord.currentRecord.roleMapping
      ? (roleId = this.crudRecord.currentRecord.roleMapping.id)
      : (roleId = null);

    this.userbaseService.deleteRecord(userId).subscribe(
      data => {
        this.roleMappingService.getExistingRoleMapping(userId).subscribe(
          data => {
            this.roleItem = data;
            let id = this.roleItem.id;

            this.roleMappingService.deleteRecord(id).subscribe(
              data => {
                return data;
              },
              error => {
                console.error("Error", error);
                this.onError(error);
              }
            );

            return data;
          },
          error => {
            this.roleItem = null;
            // console.error("Error", error);
            // this.onError(error);
          }
        );

        this.onFillForm();
        this.crudRecord.showDetail = false;
        this.crudRecord.showDatatable = true;
        this.crudRecord.buttonNewRecord.value = true;

        alert(`Registro eliminado satisfactoriamente`);
      },
      error => {
        console.error("Error", error);
        this.onError(error);
      }
    );

    roleId ? this.deleteRoleMapping(roleId) : "";
  }

  /***********************************
   * BUTTONS
   *************************************/

  onTest() {
    console.log("testing...");
  }

  onCancel() {
    this.crudRecord.showDatatable = true;
    this.crudRecord.showDetail = false;
    this.crudRecord.showDatatableFinder = true;
    this.crudRecord.action = "view";
    this.crudRecord.buttonNewRecord.value = true;
    this.crudRecord.buttonEditRecord.value = true;
    this.crudRecord.buttonViewDetailRecord.value = true;
    this.crudRecord.title = null;
  }

  onReset() {
    this.crudRecord = new CrudUserbaseModel();
    this.onFillForm();
    this.crudRecord.action = "edit";
    this.crudRecord.buttonNewRecord.value = false;
    this.crudRecord.buttonEditRecord.value = false;
    this.crudRecord.buttonViewDetailRecord.value = false;
    this.crudRecord.title = "Nuevo registro";
  }

  onDelete() {
    this.deleteRecord();
  }

  onDeactivate() {
    console.log("onDeactivate");
  }

  onReactivate() {
    console.log("onReactivate");
  }

  onSubmit() {
    this.crudRecord.action === "new" ? this.createRecord() : "";
    this.crudRecord.action === "edit" ? this.editRecord() : "";
  }

  /*********************************
   * Roles & Role Mapping
   */

  createRoleMapping(profile_json, user) {
    let query = {
      principalType: profile_json.name,
      principalId: user,
      roleId: profile_json.id
    };
    this.roleMappingService.postRecord(query).subscribe(data => data);
  }

  editRoleMapping(currentRecord) {
    this.roleMappingService
      .getExistingRoleMapping(this.crudRecord.currentRecord)
      .subscribe(
        data => {
          this.roleItem = data;
          this.crudRecord.currentRecord.roleMapping = data;

          console.log("editRoleMapping - this.roleItem", this.roleItem);

          let temp = {
            id: this.roleItem.id,
            principalType: this.crudRecord.currentRecord.profile,
            principalId: this.crudRecord.currentRecord.id,
            roleId: this.crudRecord.currentRecord.profile_json.id
          };

          let query = JSON.stringify(temp);

          this.roleMappingService.patchRecord(query).subscribe(
            data => {
              return data;
            },
            error => {
              console.error("Error", error);
              this.onError(error);
            }
          );

          console.log("roleMapping", this.crudRecord.currentRecord.roleMapping);
          return data;
        },
        error => {
          this.roleItem = null;
          // console.error("Error", error);
          // this.onError(error);
        }
      );
  }

  deleteRoleMapping(id) {
    this.roleMappingService.deleteRecord(id).subscribe(
      data => {
        return data;
      },
      error => {
        // console.error("Error", error);
        // this.onError(error);
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
        this.onError(error);
      }
    );
  }

  getExistingRoleMapping(item) {
    this.roleMappingService.getExistingRoleMapping(item).subscribe(
      data => {
        this.roleItem = data;
        this.crudRecord.currentRecord.roleMapping = data;

        console.log("roleMapping", this.crudRecord.currentRecord.roleMapping);
        return data;
      },
      error => {
        this.roleItem = null;
        // console.error("Error", error);
        // this.onError(error);
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

  /*****************************
   * CHECK IF EXISTS
   */

  onCheckIfExists() {
    let myUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email
    };

    this.authService.checkIfExists(myUser).subscribe(
      user => {
        let email = user.email[0];
        let username = user.username[0];

        if (email) {
          alert(`El email ${this.registerForm.value.email} ya está registrado`);
          this.registerForm.patchValue({
            email: ""
          });
        }

        if (username) {
          alert(
            `El nombre de usuario ${this.registerForm.value.username} ya está registrado`
          );

          this.registerForm.patchValue({
            username: ""
          });
        }
      },
      error => {
        console.error("Error", error, error.status);
        this.onError(error);
      }
    );
  }

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.crudRecord.alertMessage.alertTitle = "Error del servidor";
    this.crudRecord.alertMessage.alertText = error.statusText;
    this.crudRecord.alertMessage.alertShow = true;
    this.crudRecord.alertMessage.alertClass =
      "alert alert-danger alert-dismissible fade show";
  }
}
