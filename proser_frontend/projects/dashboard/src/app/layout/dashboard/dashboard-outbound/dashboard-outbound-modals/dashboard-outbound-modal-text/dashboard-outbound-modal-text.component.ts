import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dashboard-dashboard-outbound-modal-text",
  templateUrl: "./dashboard-outbound-modal-text.component.html",
  styleUrls: ["./dashboard-outbound-modal-text.component.scss"]
})
export class DashboardOutboundModalTextComponent implements OnInit {
  @Output() closeModal = new EventEmitter();
  @Input() argument;
  @Input() rows;

  title;
  description;

  constructor() {}

  ngOnInit() {
    this.onAddTitle(this.argument);
  }

  onCloseModal() {
    this.closeModal.emit("close");
  }

  onAddTitle(argument) {
    if (argument === "outboundContactLevel") {
      this.title = "Cálculo del nivel de contactabilidad";
      this.description = `${
        this.rows.dashboardOutboundCallsIndicators[0].outboundAnswered
      } llamadas contestadas de un total de ${
        this.rows.dashboardOutboundCallsIndicators[0].outboundMade
      } llamadas realizadas

      Fórmula: ${
        this.rows.dashboardOutboundCallsIndicators[0].outboundAnswered
      } / ${this.rows.dashboardOutboundCallsIndicators[0].outboundMade} = ${(
        this.rows.dashboardOutboundCallsIndicators[0].outboundContactLevel * 100
      ).toFixed(2)}%`;

      this.rows.dashboardOutboundCallsIndicators[0].outboundContactLevel;
    }

    if (argument === "outboundEffectiveLevel") {
      this.title = "Cálculo del nivel de efectividad";
      this.description = `${
        this.rows.dashboardOutboundCallsIndicators[0].outboundEffective
      } llamadas efectivas de un total de ${
        this.rows.dashboardOutboundCallsIndicators[0].outboundMade
      } llamadas realizadas

      Fórmula: ${
        this.rows.dashboardOutboundCallsIndicators[0].outboundEffective
      } / ${this.rows.dashboardOutboundCallsIndicators[0].outboundMade} = ${(
        this.rows.dashboardOutboundCallsIndicators[0].outboundEffectiveLevel * 100
      ).toFixed(2)}%`;

      this.rows.dashboardOutboundCallsIndicators[0].outboundEffectiveLevel;
    }


    if (argument === "outboundTMO") {
      this.title = "Tiempo medio de operación (TMO)";
      this.description = `${
        this.rows.dashboardOutboundCallsIndicators[0].operation_seconds
      } segundos de tiempo total de atención ${
        this.rows.dashboardOutboundCallsIndicators[0].operation_time
      }  de un total de ${
        this.rows.dashboardOutboundCallsIndicators[0].outboundMade
      }  llamadas recibidas

Fórmula: ${this.rows.dashboardOutboundCallsIndicators[0].operation_seconds} / ${
        this.rows.dashboardOutboundCallsIndicators[0].outboundMade
      }  = ${this.rows.dashboardOutboundCallsIndicators[0].outboundTMO.toFixed(
        2
      )}  segundos`;
    }


    if (argument === "operation_time") {
      this.title = "Tiempo de operación";
      this.description = `${
        this.rows.dashboardOutboundCallsIndicators[0].operation_seconds
      } segundos de tiempo total de operación, que equivale en tiempo a ${
        this.rows.dashboardOutboundCallsIndicators[0].operation_time
      }`;
    }

    return this.title;
  }
}
