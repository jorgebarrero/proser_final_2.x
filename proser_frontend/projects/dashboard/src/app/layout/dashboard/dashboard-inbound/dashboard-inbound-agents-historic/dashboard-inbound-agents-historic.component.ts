import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-dashboard-inbound-agents-historic',
  templateUrl: './dashboard-inbound-agents-historic.component.html',
  styleUrls: ['./dashboard-inbound-agents-historic.component.scss']
})
export class DashboardInboundAgentsHistoricComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;
  constructor() { }

  ngOnInit() {
  }

}
