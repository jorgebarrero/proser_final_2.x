import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";
import { AuthService } from "shared/services/helpers/auth.service";
import { Router } from "@angular/router";

import { logout } from "shared/functions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HomeHeaderComponent implements OnInit {
  title = "Proser";
  env;
  currentUser;
  show_init_header;
  showInMenu;

  /****************************** */
  isCollapsed = false;
  /***************************** */

  constructor(
    private envService: EnvService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.env = this.envService;
    this.getCurrentUser();
    this.show_init_header = true;
    this.showInMenu = this.authService.getCurrentUserValue();
  }

  ngOnDestroy() {
    this.show_init_header = false;
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      this.router.navigate(["/"]);
    });
  }

  /******************* */

  /************** */
}
