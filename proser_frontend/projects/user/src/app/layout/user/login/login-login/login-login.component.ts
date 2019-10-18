import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";
import { UserInterface } from "shared/models/pages/user-interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AlertModel } from "shared/models/helpers/Alert";

import { Router } from "@angular/router";
import { AlertService } from "shared/services/helpers/alert.service";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-login-login",
  templateUrl: "./login-login.component.html",
  styleUrls: ["./login-login.component.scss"]
})
export class LoginLoginComponent implements OnInit {
  option = "other";
  env;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private envService: EnvService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.env = this.envService;
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  loginForm: FormGroup;
  submitted = false;
  alertMessage = new AlertModel();

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onLogin() {
    this.submitted = true;

    // console.error('data', this.loginForm.value);

    return this.authService
      .loginUser(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(
        data => {
          let temp = this.userCheck(data, this.option);
          this.authService.setUser(temp);
          this.authService.setToken(temp.accessToken);
          this.router.navigate(["/init/home"]);
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

  userCheck(incommingUser, option) {
    let result;
    if (option === "jwt") {
      result = incommingUser;
    } else {
      result = {
        firstname: incommingUser.user.firstname,
        lastname: incommingUser.user.lastname,
        user_legal_id: incommingUser.user.user_legal_id,
        user_internal_id: incommingUser.user.user_internal_id,
        user_photo_path: incommingUser.user.user_photo_path,
        profile: incommingUser.user.profile,
        realm: incommingUser.user.realm,
        username: incommingUser.user.username,
        email: incommingUser.user.email,
        emailVerified: incommingUser.user.emailVerified,
        id: incommingUser.user.id,
        accessToken: incommingUser.id
      };
    }
    return result;
  }
}
