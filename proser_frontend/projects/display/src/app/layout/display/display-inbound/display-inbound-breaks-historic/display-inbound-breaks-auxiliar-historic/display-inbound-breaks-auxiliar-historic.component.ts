import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-display-inbound-breaks-auxiliar-historic',
  templateUrl: './display-inbound-breaks-auxiliar-historic.component.html',
  styleUrls: ['./display-inbound-breaks-auxiliar-historic.component.scss']
})
export class DisplayInboundBreaksAuxiliarHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() { }

  ngOnInit() {
  }

}
