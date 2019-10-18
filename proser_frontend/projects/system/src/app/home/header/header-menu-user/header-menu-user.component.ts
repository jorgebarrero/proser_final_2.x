import { Component, OnInit } from "@angular/core";
import { faIdBadge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-system-header-menu-user",
  templateUrl: "./header-menu-user.component.html",
  styleUrls: ["./header-menu-user.component.scss"]
})
export class HeaderMenuUserComponent implements OnInit {
  faIdBadge = faIdBadge;
  faSignOutAlt = faSignOutAlt;

  constructor() {}

  ngOnInit() {}
}
