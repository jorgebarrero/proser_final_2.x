import { AuthService } from "./../../../../../../../shared/services/helpers/auth.service";
import { Component, OnInit } from "@angular/core";

import { faIdBadge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-header-menu-user",
  templateUrl: "./header-menu-user.component.html",
  styleUrls: ["./header-menu-user.component.scss"]
})
export class HeaderMenuUserComponent implements OnInit {
  faIdBadge = faIdBadge;
  faSignOutAlt = faSignOutAlt;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      this.router.navigate(["/init/home"]);
    });
  }
}
