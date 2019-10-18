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

import { AbstractControl } from "@angular/forms";
import { UserbaseModel } from "shared/models";

@Component({
  selector: "app-login-register",
  templateUrl: "./login-register.component.html",
  styleUrls: ["./login-register.component.scss"]
})
export class LoginRegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  alertMessage = new AlertModel();
  repeatedRecord = false;

  closeResult: string;

  selection: UserbaseModel;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.onFillForm();
  }

  onFillForm() {
    this.selection = new UserbaseModel();

    this.registerForm = this.formBuilder.group(
      {
        id: [this.selection.id],

        firstname: [this.selection.firstname, Validators.required],
        lastname: [this.selection.lastname, Validators.required],

        profile: [this.selection.profile, Validators.required],
        realm: [this.selection.realm, Validators.required],

        username: [
          this.selection.username,
          [Validators.required, Validators.minLength(5)]
        ],

        password: [
          this.selection.password,
          [Validators.required, Validators.minLength(6)]
        ],
        confirmPassword: ["", Validators.required],

        email: [this.selection.email, [Validators.required, Validators.email]],
        emailVerified: [this.selection.emailVerified],

        verificationToken: [this.selection.verificationToken],
        memberId: [this.selection.memberId],

        user_legal_id: [
          "",
          [Validators.required, Validators.pattern("^[0-9]*$")]
        ],
        user_internal_id: [""],

        user_photo_path: [this.selection.user_photo_path]
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

    let user = this.registerForm.value;
    delete user.confirmPassword;

    this.authService.registerUser(user).subscribe(
      registeredUser => {
        this.onRegisterRoleMapping(registeredUser);
        this.onLoginUser(user);
        this.registerForm.reset();
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
  }

  onRegisterRoleMapping(user) {
    this.authService.registerRoleMapping(user).subscribe(
      rolMap => {
        return rolMap;
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
  }

  onLoginUser(user) {
    let username = user.username;
    let password = user.password;

    this.authService.loginUser(username, password).subscribe(
      (logedUser: any) => {
        this.authService.setUser(logedUser.user);
        this.authService.setToken(logedUser.id);
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
    this.onFillForm();
  }

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
          this.repeatedRecord = true;

          this.registerForm.patchValue({
            email: ""
          });
        }

        if (username) {
          alert(
            `El nombre de usuario ${this.registerForm.value.username} ya está registrado`
          );
          this.repeatedRecord = true;
          this.registerForm.patchValue({
            username: ""
          });
        }

        return this.repeatedRecord;
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
  }

  onRecordJsonChange() {
    this.onCheckIfExists();
  }
}
