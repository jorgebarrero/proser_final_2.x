import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";
import { AlertService } from "shared/services/helpers/alert.service";
import { EnvService } from "shared/services/helpers/env.service";
import { Router } from "@angular/router";
import { AlertModel } from "shared/models";

import { logout } from "shared/functions";
@Component({
  selector: "app-login-header",
  templateUrl: "./login-header.component.html",
  styleUrls: ["./login-header.component.scss"]
})
export class LoginHeaderComponent implements OnInit {
  alertMessage: AlertModel;
  currentUser;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService,
    private envService: EnvService
  ) {
    this.alertMessage = new AlertModel();
  }

  ngOnInit() {
    // this.getCurrentUser();
  }

  onLogout() {
    logout(this.authService, "/init/home", "/init/home");
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
