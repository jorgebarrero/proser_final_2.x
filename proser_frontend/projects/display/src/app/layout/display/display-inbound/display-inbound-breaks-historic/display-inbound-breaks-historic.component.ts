import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-display-display-inbound-breaks-historic",
  templateUrl: "./display-inbound-breaks-historic.component.html",
  styleUrls: ["./display-inbound-breaks-historic.component.scss"]
})
export class DisplayInboundBreaksHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() {}

  ngOnInit() {}
}
