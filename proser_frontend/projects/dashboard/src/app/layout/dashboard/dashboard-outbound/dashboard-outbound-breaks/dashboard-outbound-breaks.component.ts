import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-outbound-breaks",
  templateUrl: "./dashboard-outbound-breaks.component.html",
  styleUrls: ["./dashboard-outbound-breaks.component.scss"]
})
export class DashboardOutboundBreaksComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() {}

  ngOnInit() {}
}
