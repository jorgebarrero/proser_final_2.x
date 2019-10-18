import { Component, OnInit } from "@angular/core";
import { environment } from "shared/environments/environment.prod";
import { EnvService } from "shared/services/helpers/env.service";

@Component({
  selector: "app-show-intro",
  templateUrl: "./show-intro.component.html",
  styleUrls: ["./show-intro.component.scss"]
})
export class ShowIntroComponent implements OnInit {
  constructor(private envService: EnvService) {}

  env;

  ngOnInit() {
    this.env = this.envService;
  }
}
