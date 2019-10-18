import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-dashboard-outbound-agents-historic',
  templateUrl: './dashboard-outbound-agents-historic.component.html',
  styleUrls: ['./dashboard-outbound-agents-historic.component.scss']
})
export class DashboardOutboundAgentsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;
  constructor() { }

  ngOnInit() {
  }

}
