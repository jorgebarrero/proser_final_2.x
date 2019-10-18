import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-inbound-breaks",
  templateUrl: "./dashboard-inbound-breaks.component.html",
  styleUrls: ["./dashboard-inbound-breaks.component.scss"]
})
export class DashboardInboundBreaksComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() {}

  ngOnInit() {}
}
