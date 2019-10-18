import { Component, OnInit } from "@angular/core";

import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-audit-audit-config-env",
  templateUrl: "./audit-config-env.component.html",
  styleUrls: ["./audit-config-env.component.scss"]
})
export class AuditConfigEnvComponent implements OnInit {
  env;
  constructor(private envService: EnvService) {}

  ngOnInit() {
    this.env = this.envService;
  }
}
