import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from "shared/functions";

import { AuthService } from "shared/services/helpers/auth.service";
import { AlertService } from "shared/services/helpers/alert.service";

import { UserInterface } from "shared/models/pages/user-interface";

import { Router } from "@angular/router";
import { AlertModel } from "shared/models/helpers/Alert";
import { RoleMappingService } from "shared/services";
import { UserModel, UserbaseModel } from "shared/models";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private roleMappingService: RoleMappingService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  role;
  roles;
  roleCode;

  registerForm: FormGroup;
  submitted = false;
  alertMessage = new AlertModel();

  user = new UserbaseModel();
  newuser;

  closeResult: string;

  show_data;

  ngOnInit() {
    this.getRoles();
    // console.error("alertMessage", this.alertMessage);

    this.registerForm = this.formBuilder.group(
      {
        firstname: ["", Validators.required],
        lastname: ["", Validators.required],
        user_legal_id: [
          "",
          [Validators.required, Validators.pattern("^[0-9]*$")]
        ],
        user_internal_id: [""],
        username: ["", [Validators.required, Validators.minLength(6)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  onSubmit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onRegister(content) {
    this.alertMessage = new AlertModel();

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const user = this.registerForm.value;

    this.authService
      .registerUser(
        user.firstname,
        user.lastname,
        user.username,
        user.email,
        user.password,
        user.user_legal_id,
        user.user_internal_id,
        user.user_photo_path
      )
      .subscribe(
        registeredUser => {
          this.newuser = registeredUser.id;
          this.role = "user";
          // this.roleCode = this.roleAssignation(this.role);
          // this.createRoleMapping(this.roleCode, this.newuser);
          // this.editRoleMapping(this.roleCode, this.newuser);

          this.registerForm.reset();

          this.authService.setUser(registeredUser);
          const token = this.user.id;
          this.authService.setToken(token);
          this.router.navigate(["/"]);
        },
        error => {
          console.error("Error", error, error.status);
          this.alertService.error(error.status);
          this.alertMessage.alertTitle = "Error del servidor";
          this.alertMessage.alertText = error.statusText;
          this.alertMessage.alertShow = true;
          this.alertMessage.alertClass =
            "alert alert-danger alert-dismissible fade show";
        }
      );

    // this.authService.setUser(registeredUser);
    // const token = user.id;
    // this.authService.setToken(token);
    // this.router.navigate(['/login']);
    // )

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(user));
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  onResetForm() {
    this.alertMessage = new AlertModel();
    this.submitted = false;
    this.registerForm.reset();
  }

  createRoleMapping(role, user) {
    let query = {
      principalType: "USER",
      principalId: user,
      roleId: role
    };
    this.roleMappingService.postRecord(query).subscribe(data => data);
  }

  editRoleMapping(role, user) {
    let query = {
      principalType: "USER",
      principalId: `${user}`,
      roleId: role
    };
    this.roleMappingService.updateRecord(query).subscribe(data => data);
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

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = "Error del servidor";
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass =
      "alert alert-danger alert-dismissible fade show";
  }
}
