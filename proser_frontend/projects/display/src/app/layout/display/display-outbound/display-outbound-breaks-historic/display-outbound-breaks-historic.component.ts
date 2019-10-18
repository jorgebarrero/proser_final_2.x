import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-display-display-outbound-breaks-historic",
  templateUrl: "./display-outbound-breaks-historic.component.html",
  styleUrls: ["./display-outbound-breaks-historic.component.scss"]
})
export class DisplayOutboundBreaksHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() {}

  ngOnInit() {}
}
