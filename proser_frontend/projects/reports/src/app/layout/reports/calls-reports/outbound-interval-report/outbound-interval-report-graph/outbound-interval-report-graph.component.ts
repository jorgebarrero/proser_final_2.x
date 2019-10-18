import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";

import { Observable, Subscription, timer } from "rxjs";

import {  UserSelectionModel } from "shared/models";

import { CallsInboundDailyModel } from "projects/reports/src/app/shared/models/reports/calls/CallsInboundDaily.model";

@Component({
  selector: 'app-reports-outbound-interval-report-graph',
  templateUrl: './outbound-interval-report-graph.component.html',
  styleUrls: ['./outbound-interval-report-graph.component.scss']
})
export class OutboundIntervalReportGraphComponent implements OnInit {

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
        
        llamadas_fallidas: x.outboundFail,
        llamadas_contestadas: x.outboundAnswered,
        llamadas_efectivas: x.outboundEffective,
        llamadas_colgadas: x.outboundHungout,
        nivel_contactabilidad: x.outboundContactLevel,
        nivel_efectividad: x.outboundEffectiveLevel,
        graphLabel: x.interval_start
      };
    });
  }

  generateGraph(msg?: string, rows?, barChartData?) {
    console.error("this.rows", msg, rows);

    let graphIndicators = this.extractIndicators(rows);

    if (graphIndicators) {
      let nivel_contactabilidad = graphIndicators.map(x => {
        return x.nivel_contactabilidad * 100;
      });
      let nivel_efectividad = graphIndicators.map(x => {
        return x.nivel_efectividad * 100;
      });
      let llamadas_fallidas = graphIndicators.map(x => {
        return x.llamadas_fallidas;
      });
      let llamadas_contestadas = graphIndicators.map(x => {
        return x.llamadas_contestadas;
      });
      let llamadas_efectivas = graphIndicators.map(x => {
        return x.llamadas_efectivas;
      });
      let llamadas_colgadas = graphIndicators.map(x => {
        return x.llamadas_colgadas;
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
          data: nivel_contactabilidad,
          label: "Nivel de contactabilidad",
          borderColor: "#03741d",
          backgroundColor: "#03741d",
          type: "line",
          yAxesGroup: "C",
          yAxisID: "C",
          fill: false
        },

        {
          data: nivel_efectividad,
          label: "Nivel de efectividad",
          borderColor: "#555",
          backgroundColor: "#555",
          type: "line",
          yAxesGroup: "B",
          yAxisID: "B",
          fill: false
        },
        {
          data: llamadas_fallidas,
          label: `Llamadas fallidas`,
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd",
          yAxisID: "A"
        },
        {
          data: llamadas_contestadas,
          label: `Llamadas contestadas`,
          borderColor: "#e9a321",
          backgroundColor: "#e9a321",
          yAxisID: "A"
        },
        {
          data: llamadas_efectivas,
          label: "Llamadas efectivas",
          borderColor: "#e9061d",
          backgroundColor: "#e9061d",
          yAxisID: "A"
        },
        {
          data: llamadas_colgadas,
          label: "Llamadas colgadas",
          borderColor: "#E200FF",
          backgroundColor: "#E200FF",
          yAxisID: "A"
        }
      ];

      this.show = true;
    }
  }
}
