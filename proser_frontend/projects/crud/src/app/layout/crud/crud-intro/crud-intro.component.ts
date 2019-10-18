import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-crud-intro",
  templateUrl: "./crud-intro.component.html",
  styleUrls: ["./crud-intro.component.scss"]
})
export class CrudIntroComponent implements OnInit {
  constructor(private envService: EnvService) {}

  env;

  ngOnInit() {
    this.env = this.envService;
  }
}
