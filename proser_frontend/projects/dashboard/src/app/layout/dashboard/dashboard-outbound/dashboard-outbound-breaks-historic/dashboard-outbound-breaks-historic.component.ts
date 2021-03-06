import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-dashboard-outbound-breaks-historic",
  templateUrl: "./dashboard-outbound-breaks-historic.component.html",
  styleUrls: ["./dashboard-outbound-breaks-historic.component.scss"]
})
export class DashboardOutboundBreaksHistoricComponent implements OnInit {
  @Input() rows;
  @Input() userSelection;

  title_main;
  title_breaks;
  title_assignations;

  constructor() {}

  ngOnInit() {
    this.onSetTitles();
  }

  onSetTitles() {
    if (
      this.rows.agentsHistoricAssignationResume == null &&
      this.rows.agentsHistoricBreakResume == null
    ) {
      this.title_main = "Auxiliares";
    }

    if (this.rows.agentsHistoricAssignationResume == null) {
      return;
    } else {
      this.title_assignations = "Historico asignaciones";
    }

    if (this.rows.agentsHistoricBreakResume == null) {
      return null;
    } else {
      this.title_breaks = "Historico auxiliares";
    }
  }
}
