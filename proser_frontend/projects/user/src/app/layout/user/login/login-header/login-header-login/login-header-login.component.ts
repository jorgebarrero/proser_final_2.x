import { Component, OnInit } from "@angular/core";
import { EnvService } from "shared/services/helpers/env.service";
@Component({
  selector: "app-user-login-header-login",
  templateUrl: "./login-header-login.component.html",
  styleUrls: ["./login-header-login.component.scss"]
})
export class LoginHeaderLoginComponent implements OnInit {
  env;
  constructor(private envService: EnvService) {
    this.env = this.envService;
  }

  ngOnInit() {}
}
