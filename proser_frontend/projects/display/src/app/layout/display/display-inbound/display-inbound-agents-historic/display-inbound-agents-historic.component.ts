import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-display-inbound-agents-historic',
  templateUrl: './display-inbound-agents-historic.component.html',
  styleUrls: ['./display-inbound-agents-historic.component.scss']
})
export class DisplayInboundAgentsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;
  constructor() { }

  ngOnInit() {
  }

}
