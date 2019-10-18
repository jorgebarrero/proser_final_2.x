import { Component, OnInit, Input } from "@angular/core";
import { AlertModel } from "../../models/helpers/Alert";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
  @Input() alertMessage: AlertModel;

  constructor() {}

  ngOnInit() {
    if (this.alertMessage.alertText === "Unknown Error") {
      this.alertMessage.alertText = "Servidor desconectado";
    }
    // this.onAlert();
  }

  // onAlert() {
  //   this.alert.alertTitle = 'Holy guacamole!';
  //   this.alert.alertText = 'You should check in on some of those fields below.';
  //   this.alert.alertShow = true;
  //   this.alert.alertClass = 'alert-warning';
  // }
}
