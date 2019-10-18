import { Component, OnInit } from "@angular/core";
import { faIdBadge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-display-header-menu-display",
  templateUrl: "./header-menu-display.component.html",
  styleUrls: ["./header-menu-display.component.scss"]
})
export class HeaderMenuDisplayComponent implements OnInit {
  faIdBadge = faIdBadge;
  faSignOutAlt = faSignOutAlt;
  constructor() {}

  ngOnInit() {}
}
