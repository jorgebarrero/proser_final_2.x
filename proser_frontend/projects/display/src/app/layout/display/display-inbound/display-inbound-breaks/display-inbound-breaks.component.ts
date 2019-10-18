import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-display-inbound-breaks",
  templateUrl: "./display-inbound-breaks.component.html",
  styleUrls: ["./display-inbound-breaks.component.scss"]
})
export class DisplayInboundBreaksComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() {}

  ngOnInit() {}
}
