import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-dashboard-dashboard-inbound-modal-text",
  templateUrl: "./dashboard-inbound-modal-text.component.html",
  styleUrls: ["./dashboard-inbound-modal-text.component.scss"]
})
export class DashboardInboundModalTextComponent implements OnInit {
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
    if (argument === "inboundServiceLevel") {
      this.title = "Cálculo del nivel de servicio";
      this.description = `${
        this.rows.dashboardInboundCallsIndicators[0].inboundBeforeTime
      } llamadas atendidas antes de ${
        this.rows.dashboardInboundCallsIndicators[0].idealResponseTime
      } segundos de un total de ${
        this.rows.dashboardInboundCallsIndicators[0].inboundReceived
      } llamadas recibidas

      Fórmula: ${
        this.rows.dashboardInboundCallsIndicators[0].inboundBeforeTime
      } / ${this.rows.dashboardInboundCallsIndicators[0].inboundReceived} = ${(
        this.rows.dashboardInboundCallsIndicators[0].inboundServiceLevel * 100
      ).toFixed(2)}%`;

      this.rows.dashboardInboundCallsIndicators[0].inboundServiceLevel;
    }

    if (argument === "inboundAttentionLevel") {
      this.title = "Calculo del nivel de atención";
      this.description = `${
        this.rows.dashboardInboundCallsIndicators[0].inboundReceived
      } llamadas atendidas de un total de ${
        this.rows.dashboardInboundCallsIndicators[0].inboundAttended
      } llamadas recibidas

      Fórmula: ${
        this.rows.dashboardInboundCallsIndicators[0].inboundAttended
      }  / ${this.rows.dashboardInboundCallsIndicators[0].inboundReceived} = ${(
        this.rows.dashboardInboundCallsIndicators[0].inboundAttentionLevel * 100
      ).toFixed(2)}%`;
    }

    if (argument === "inboundAbandonLevel") {
      this.title = "Cálculo nivel de abandono";
      this.description = ` ${
        this.rows.dashboardInboundCallsIndicators[0].inboundAbandoned
      }  llamadas abandonadas de un total de ${
        this.rows.dashboardInboundCallsIndicators[0].inboundReceived
      } llamadas recibidas

      Fórmula: ${
        this.rows.dashboardInboundCallsIndicators[0].inboundAbandoned
      }  / ${this.rows.dashboardInboundCallsIndicators[0].inboundReceived} = ${(
        100 * this.rows.dashboardInboundCallsIndicators[0].inboundAbandonLevel
      ).toFixed(2)}%`;
    }

    if (argument === "inboundTmo") {
      this.title = "Tiempo medio de operación (TMO)";
      this.description = `${
        this.rows.dashboardInboundCallsIndicators[0].operation_seconds
      } segundos de tiempo total de atención ${
        this.rows.dashboardInboundCallsIndicators[0].operation_time
      }  de un total de ${
        this.rows.dashboardInboundCallsIndicators[0].inboundReceived
      }  llamadas recibidas

Fórmula: ${this.rows.dashboardInboundCallsIndicators[0].operation_seconds} / ${
        this.rows.dashboardInboundCallsIndicators[0].inboundReceived
      }  = ${this.rows.dashboardInboundCallsIndicators[0].inboundTmo.toFixed(
        2
      )}  segundos`;
    }

    if (argument === "inboundAsa") {
      this.title = "Tiempo medio de espera en la cola (ASA)";
      this.description = ` ${
        this.rows.dashboardInboundCallsIndicators[0].wait_seconds
      }  segundos de tiempo total de espera  ${
        this.rows.dashboardInboundCallsIndicators[0].wait_time
      } de un total de ${
        this.rows.dashboardInboundCallsIndicators[0].inboundAttended
      } llamadas atendidas

      Fórmula: ${this.rows.dashboardInboundCallsIndicators[0].wait_seconds} / ${
        this.rows.dashboardInboundCallsIndicators[0].inboundAttended
      }  = ${this.rows.dashboardInboundCallsIndicators[0].inboundAsa.toFixed(
        2
      )}  segundos`;
    }

    if (argument === "maxWaitTime") {
      this.title = "Tiempo maximo de espera";
      this.description = ` ${this.rows.dashboardInboundCallsIndicators[0].maxWaitTime} segundos para ser atendido`;
    }

    if (argument === "maxWaitTimeOnQue") {
      this.title = "Tiempo de espera en cola";
      this.description = ` ${this.rows.dashboardInboundCurrentCallsInicators[0].maxWaitTimeOnQue} segundos en cola para ser atendido`;
    }

    return this.title;
  }
}
