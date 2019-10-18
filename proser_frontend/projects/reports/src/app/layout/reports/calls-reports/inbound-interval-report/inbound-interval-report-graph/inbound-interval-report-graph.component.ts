import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";

import { Observable, Subscription, timer } from "rxjs";

import { UserSelectionModel } from "shared/models";

import { CallsInboundDailyModel } from "projects/reports/src/app/shared/models/reports/calls/CallsInboundDaily.model";

@Component({
  selector: "app-reports-inbound-interval-report-graph",
  templateUrl: "./inbound-interval-report-graph.component.html",
  styleUrls: ["./inbound-interval-report-graph.component.scss"]
})
export class InboundIntervalReportGraphComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() userSelection: UserSelectionModel;
  @Input() rows;

  @Output() valueChange = new EventEmitter();

  show = false;
  stepinterval;

  interval = new Observable();

  barChartOptions;
  barChartLabels: string[];
  barChartColors: string[];
  barChartType: string = "bar";
  barChartLegend: boolean;
  barChartData: any[];

  timerConnected = 0;

  constructor() {}

  ngOnInit() {
    this.generateGraph("Internal", this.rows);
    const timerClock = timer(1000, 20000);

    this.subscription.add(
      timerClock.subscribe(() => {
        // this.generateGraph();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reDrawGraph() {
    this.rows = this.rows;
    this.generateGraph();
  }

  extractIndicators(rows) {
    return rows.map(x => {
      return {
        llamadas_atendidas: x.inboundAttended,
        llamadas_abandonadas: x.inboundAbandoned,
        llamadas_atendidas_antes_de: x.inboundBeforeTime,
        llamadas_atendidas_despues_de: x.inboundAfterTime,
        nivel_servicio: x.inboundServiceLevel,
        nivel_atencion: x.inboundAttentionLevel,
        graphLabel: x.interval_start
      };
    });
  }

  generateGraph(msg?: string, rows?) {
    let graphIndicators = this.extractIndicators(rows);

    if (graphIndicators) {
      let nivel_de_servicio = graphIndicators.map(x => {
        return x.nivel_servicio * 100;
      });
      let nivel_de_atencion = graphIndicators.map(x => {
        return x.nivel_atencion * 100;
      });
      let llamadas_atendidas = graphIndicators.map(x => {
        return x.llamadas_atendidas;
      });
      let llamadas_abandonadas = graphIndicators.map(x => {
        return x.llamadas_abandonadas;
      });
      let llamadas_atendidas_antes_de = graphIndicators.map(x => {
        return x.llamadas_atendidas_antes_de;
      });
      let llamadas_atendidas_despues_de = graphIndicators.map(x => {
        return x.llamadas_atendidas_despues_de;
      });

      let barChartLabels = graphIndicators.map(x => {
        return x.graphLabel;
      });

      this.barChartLabels = barChartLabels;

      this.barChartOptions = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              position: "top",
              scaleFontSize: 40,
              ticks: {
                fontSize: 16
              },
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: `Linea temporal por intervalos`
              }
            }
          ],
          yAxes: [
            {
              id: "A",
              type: "linear",
              position: "left",
              scalePositionLeft: true,
              scaleFontSize: 40,
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Cantidad de llamadas",
                fontSize: 20
              },
              ticks: {
                min: 0,
                stepSize: this.stepinterval,
                fontSize: 16
              }
            },
            {
              id: "B",
              type: "linear",
              position: "right",
              scalePositionLeft: false,
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Porcentaje",
                fontSize: 20
              },
              ticks: {
                min: 0,
                max: 100,
                fontSize: 16,
                stepSize: 10
              }
            },
            {
              id: "C",
              type: "linear",
              position: "right",
              scalePositionLeft: false,
              stacked: true,
              scaleLabel: {
                display: false,
                labelString: "Porcentaje",
                fontSize: 20
              },
              ticks: {
                display: false,
                min: 0,
                max: 100,
                fontSize: 16,
                stepSize: 10
              }
            }
          ]
        }
      };

      this.barChartData = [
        {
          data: nivel_de_servicio,
          label: "Nivel de servicio",
          borderColor: "#03741d",
          backgroundColor: "#03741d",
          type: "line",
          yAxesGroup: "C",
          yAxisID: "C",
          fill: false
        },

        {
          data: nivel_de_atencion,
          label: "Nivel de atencion",
          borderColor: "#555",
          backgroundColor: "#555",
          type: "line",
          yAxesGroup: "B",
          yAxisID: "B",
          fill: false
        },

        {
          data: llamadas_atendidas_antes_de,
          label: `Atendidas antes de ${
            this.rows[0].idealResponseTime ? this.rows[0].idealResponseTime : ""
          }"`,
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd",
          yAxisID: "A"
        },
        {
          data: llamadas_atendidas_despues_de,
          label: `Atendidas después de  ${
            this.rows[0].idealResponseTime ? this.rows[0].idealResponseTime : ""
          }"`,
          borderColor: "#e9a321",
          backgroundColor: "#e9a321",
          yAxisID: "A"
        },
        {
          data: llamadas_abandonadas,
          label: "Abandonadas",
          borderColor: "#e9061d",
          backgroundColor: "#e9061d",
          yAxisID: "A"
        }
      ];

      this.show = true;
    }
  }
}
