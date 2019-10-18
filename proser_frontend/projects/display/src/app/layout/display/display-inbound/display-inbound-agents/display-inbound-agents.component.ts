import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-display-inbound-agents",
  templateUrl: "./display-inbound-agents.component.html",
  styleUrls: ["./display-inbound-agents.component.scss"]
})
export class DisplayInboundAgentsComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;

  constructor() {}

  ngOnInit() {}
}
