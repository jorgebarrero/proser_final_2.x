import { Component, OnInit } from "@angular/core";
import { faIdBadge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-dashboard-header-menu-dahsboard",
  templateUrl: "./header-menu-dahsboard.component.html",
  styleUrls: ["./header-menu-dahsboard.component.scss"]
})
export class HeaderMenuDahsboardComponent implements OnInit {
  faIdBadge = faIdBadge;
  faSignOutAlt = faSignOutAlt;

  constructor() {}

  ngOnInit() {}
}
