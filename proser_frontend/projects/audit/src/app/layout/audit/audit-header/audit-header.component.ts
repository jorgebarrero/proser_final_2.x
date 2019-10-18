import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-audit-audit-header",
  templateUrl: "./audit-header.component.html",
  styleUrls: ["./audit-header.component.scss"]
})
export class AuditHeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser;

  ngOnInit() {
    this.getCurrentUser();
  }

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      // console.error("LOGOUT");
      this.router.navigate(["/main/header"]);
    });
  }

  getCurrentUser() {
    this.currentUser = this.authService.getCurrentUser();
  }
}
