import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";

import { logout } from "shared/functions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  currentUser;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogout() {
    logout(this.authService, "/reports/home", "/reports/home");
  }
}
