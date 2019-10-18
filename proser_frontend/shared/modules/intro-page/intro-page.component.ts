import { Component, OnInit, Input } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { EnvService } from "shared/services/helpers/env.service";
import { AuthService } from "shared/services/helpers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "intro-page",
  templateUrl: "./intro-page.component.html",
  styleUrls: ["./intro-page.component.scss"]
})
export class IntroPageComponent implements OnInit {
  @Input() title;
  env;
  currentUser;
  currentConfig;

  constructor(
    private envService: EnvService,
    private authService: AuthService,
    private router: Router
  ) {
    this.env = this.envService;
    this.currentConfig = 1;
  }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogin() {
    this.router.navigate(["/user/layout/login/"]);
  }
  onRegister() {
    this.router.navigate(["/user/layout/login/login-register/"]);
  }
}
