import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-display-inbound-breaks-assignations-historic',
  templateUrl: './display-inbound-breaks-assignations-historic.component.html',
  styleUrls: ['./display-inbound-breaks-assignations-historic.component.scss']
})
export class DisplayInboundBreaksAssignationsHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() { }

  ngOnInit() {
  }

}
