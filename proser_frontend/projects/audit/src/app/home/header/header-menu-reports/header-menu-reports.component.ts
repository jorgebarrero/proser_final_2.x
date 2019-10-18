import { Component, OnInit } from "@angular/core";
import { faIdBadge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-audit-header-menu-reports",
  templateUrl: "./header-menu-reports.component.html",
  styleUrls: ["./header-menu-reports.component.scss"]
})
export class HeaderMenuReportsComponent implements OnInit {
  faIdBadge = faIdBadge;
  faSignOutAlt = faSignOutAlt;
  constructor() {}

  ngOnInit() {}
}
