import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-login-intro",
  templateUrl: "./login-intro.component.html",
  styleUrls: ["./login-intro.component.scss"]
})
export class LoginIntroComponent implements OnInit {
  constructor(private envService: EnvService) {}

  env;

  ngOnInit() {
    this.env = this.envService;
  }
}
