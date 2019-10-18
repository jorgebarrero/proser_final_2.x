import { Component, OnInit, OnDestroy } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";
import { AuthService } from "shared/services/helpers/auth.service";
import { logout } from "shared/functions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnDestroy {
  title = "Proser";
  env;
  currentUser;
  show_init_header;

  constructor(
    private envService: EnvService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.env = this.envService;
    this.getCurrentUser();
    this.show_init_header = true;
  }

  ngOnDestroy() {
    this.show_init_header = false;
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogout() {
    logout(this.authService, "/", "/");
    // logout(this.authService, "/init/home", "/init/home");
  }
}
