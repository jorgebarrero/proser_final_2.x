import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";

import { logout } from "shared/functions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
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
