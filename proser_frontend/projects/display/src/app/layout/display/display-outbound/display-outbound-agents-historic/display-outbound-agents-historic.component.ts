import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-display-outbound-agents-historic',
  templateUrl: './display-outbound-agents-historic.component.html',
  styleUrls: ['./display-outbound-agents-historic.component.scss']
})
export class DisplayOutboundAgentsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;
  constructor() { }

  ngOnInit() {
  }

}
