import { Component, OnInit, Input } from "@angular/core";
import { EnvService } from "shared/services/helpers/env.service";
import {
  faCoffee,
  faChartArea,
  faDigitalTachograph,
  faSignInAlt
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-init-header-menu-login",
  templateUrl: "./header-menu-login.component.html",
  styleUrls: ["./header-menu-login.component.scss"]
})
export class HeaderMenuLoginComponent implements OnInit {
  @Input() showInMenu;
  faCoffee = faCoffee;
  faChartArea = faChartArea;
  faDigitalTachograph = faDigitalTachograph;
  faSignInAlt = faSignInAlt;

  env;
  constructor(private envService: EnvService) {
    this.env = this.envService;
  }

  ngOnInit() {}
}
