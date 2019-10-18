import { Component, OnInit } from "@angular/core";
import { UserInterface } from "shared/models";
import { AuthService } from "shared/services/helpers/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-show-header",
  templateUrl: "./show-header.component.html",
  styleUrls: ["./show-header.component.scss"]
})
export class ShowHeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser;
  userName;

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userName = `${this.currentUser.firstname} ${
      this.currentUser.lastname
    }`;
  }

  onLogout() {
    this.authService.logoutUser().subscribe(data => {
      console.error("LOGOUT", data);
      this.router.navigate(["/login"]);
    });
  }
}
