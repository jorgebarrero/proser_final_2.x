import { Component, OnInit } from "@angular/core";
import { AuthService } from "shared/services/helpers/auth.service";

@Component({
  selector: "app-now-user",
  templateUrl: "./now-user.component.html",
  styleUrls: ["./now-user.component.scss"]
})
export class NowUserComponent implements OnInit {
  constructor(private authService: AuthService) {}

  currentuserName;

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.currentuserName = `${currentUser.firstname} ${currentUser.lastname}`;
  }
}
