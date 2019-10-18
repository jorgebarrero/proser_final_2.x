import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-display-outbound-breaks",
  templateUrl: "./display-outbound-breaks.component.html",
  styleUrls: ["./display-outbound-breaks.component.scss"]
})
export class DisplayOutboundBreaksComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() {}

  ngOnInit() {}
}
