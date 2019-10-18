import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private envService: EnvService) {}

  env;
  title;

  ngOnInit() {
    this.env = this.envService;
    this.title = "Gestión del sistema";
  }
}
