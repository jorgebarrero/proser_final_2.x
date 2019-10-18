import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-display-outbound-breaks-auxiliar-historic',
  templateUrl: './display-outbound-breaks-auxiliar-historic.component.html',
  styleUrls: ['./display-outbound-breaks-auxiliar-historic.component.scss']
})
export class DisplayOutboundBreaksAuxiliarHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  constructor() { }

  ngOnInit() {
  }

}
