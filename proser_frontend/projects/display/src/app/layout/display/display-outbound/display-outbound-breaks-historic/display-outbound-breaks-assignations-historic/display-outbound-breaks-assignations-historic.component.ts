import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-display-outbound-breaks-assignations-historic',
  templateUrl: './display-outbound-breaks-assignations-historic.component.html',
  styleUrls: ['./display-outbound-breaks-assignations-historic.component.scss']
})
export class DisplayOutboundBreaksAssignationsHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() { }

  ngOnInit() {
  }

}
