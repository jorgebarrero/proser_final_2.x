import { Component, OnInit } from "@angular/core";
import { faIdBadge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-system-header-menu-commands",
  templateUrl: "./header-menu-commands.component.html",
  styleUrls: ["./header-menu-commands.component.scss"]
})
export class HeaderMenuCommandsComponent implements OnInit {
  faIdBadge = faIdBadge;
  faSignOutAlt = faSignOutAlt;

  constructor() {}

  ngOnInit() {}
}
