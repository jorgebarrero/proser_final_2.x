import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-audit-audit-intro",
  templateUrl: "./audit-intro.component.html",
  styleUrls: ["./audit-intro.component.scss"]
})
export class AuditIntroComponent implements OnInit {
  constructor(private envService: EnvService) {}

  env;

  ngOnInit() {
    this.env = this.envService;
  }
}
