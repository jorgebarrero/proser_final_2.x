import { Component, OnInit, Input } from "@angular/core";

import { faCoffee, faChartArea } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-init-header-menu-develop",
  templateUrl: "./header-menu-develop.component.html",
  styleUrls: ["./header-menu-develop.component.scss"]
})
export class HeaderMenuDevelopComponent implements OnInit {
  @Input() showInMenu;

  // Icons
  faCoffee = faCoffee;
  faChartArea = faChartArea;

  constructor() {}

  ngOnInit() {}
}
