import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-system-intro",
  templateUrl: "./system-intro.component.html",
  styleUrls: ["./system-intro.component.scss"]
})
export class SystemIntroComponent implements OnInit {
  constructor(private envService: EnvService) {}

  env;

  ngOnInit() {
    this.env = this.envService;
  }
}
