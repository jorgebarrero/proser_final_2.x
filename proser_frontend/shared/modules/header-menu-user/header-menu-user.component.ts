import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";
import { Router } from "@angular/router";

import {
  faIdBadge,
  faSignOutAlt,
  faUser
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "header-menu-user",
  templateUrl: "./header-menu-user.component.html",
  styleUrls: ["./header-menu-user.component.scss"]
})
export class HeaderMenuUserComponent implements OnInit {
  // Icons
  faSignOutAlt = faSignOutAlt;
  faIdBadge = faIdBadge;
  faUser = faUser;

  currentUser;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      this.router.navigate(["/init/home"]);
    });
  }

  onProfile() {
    this.router.navigate(["/user/layout/login/login-profile"]);
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
