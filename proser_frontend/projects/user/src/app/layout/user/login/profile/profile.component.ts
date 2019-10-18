import { Component, OnInit } from "@angular/core";

import { AuthService } from "shared/services/helpers/auth.service";
import { UserbaseService } from "shared/services/crud/system/userbase.service";

import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModel } from "shared/models/helpers/Alert";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  currentUser;
  currentUserInfo;
  alertMessage = new AlertModel();

  constructor(
    private userbaseService: UserbaseService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
    this.getUserById(this.currentUser.id);
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
    // console.error("currentUser", this.currentUser, this.currentUser.userId);
  }

  getUserById(id) {
    this.userbaseService.getRecordById(id).subscribe(
      registeredUser => {
        this.currentUserInfo = registeredUser;
        // console.error("registered user", registeredUser);
      },
      error => {
        // console.error("Error", error, error.status);
        this.alertService.error(error.status);
        this.alertMessage.alertTitle = "Error del servidor";
        this.alertMessage.alertText = error.statusText;
        this.alertMessage.alertShow = true;
        this.alertMessage.alertClass =
          "alert alert-danger alert-dismissible fade show";
      }
    );
  }
}
