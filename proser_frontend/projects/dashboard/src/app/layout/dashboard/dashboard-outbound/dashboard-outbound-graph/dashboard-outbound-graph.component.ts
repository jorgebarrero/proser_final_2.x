import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";

import { Observable, Subscription, timer } from "rxjs";
import * as moment from "moment";

// Global shared models
import { AlertModel } from "shared/models/helpers/Alert";
import { UserSelectionModel } from "shared/models";

// Global shared services
import { AlertService, EnvService } from "shared/services";

@Component({
  selector: "app-dashboard-dashboard-outbound-graph",
  templateUrl: "./dashboard-outbound-graph.component.html",
  styleUrls: ["./dashboard-outbound-graph.component.scss"]
})
export class DashboardOutboundGraphComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  // data
  @Input() userSelection: UserSelectionModel;

  @Input() rows;
  @Input() rows_original;
  @Input() rows_valid;
  @Input() rows_total;
  @Input() rows_detail;
  @Input() rows_detail_original;
  @Input() idealResponseTime;

  @Output() valueChange = new EventEmitter();

  // Component variables
  alertMessage = new AlertModel();

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

  constructor(
    private alertService: AlertService,
    private envService: EnvService
  ) {}

  ngOnInit() {
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

  extractIndicators(rows) {
  
    let result = null;
    if (rows) {
      result = rows.map(x => {
        return {
          llamadas_realizadas: x.outboundMade,
          llamadas_fallidas: x.outboundFail,
          llamadas_contestadas: x.outboundAnswered,
          llamadas_efectivas: x.outboundEffective,
          nivel_contactabilidad: x.outboundContactLevel,
          nivel_efectividad: x.outboundEffectiveLevel,
          graphLabel: moment(x.interval_start, "HH:mm:ss").format("HH:mm")
        };
      });
    }
    return result;
  }

  generateGraph(msg?: string, rows?, barChartData?) {
    let graphIndicators = this.extractIndicators(rows);

    if (graphIndicators) {
      let nivel_contactabilidad = graphIndicators.map(x => {
        return x.nivel_contactabilidad * 100;
      });
      let nivel_efectividad = graphIndicators.map(x => {
        return x.nivel_efectividad * 100;
      });
      let llamadas_realizadas = graphIndicators.map(x => {
        return x.llamadas_realizadas;
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
                dashboard: true,
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
                dashboard: true,
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
              display: true,
              scalePositionLeft: false,
              stacked: false,
              scaleLabel: {
                dashboard: false,
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
              display: false,
              scalePositionLeft: false,
              stacked: false,
              scaleLabel: {
                dashboard: false,
                labelString: "Porcentaje",
                fontSize: 20
              },
              ticks: {
                dashboard: false,
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
          data: llamadas_realizadas,
          label: `Llamadas realizadas`,
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
          data: llamadas_fallidas,
          label: "Llamadas fallidas",
          borderColor: "#e9061d",
          backgroundColor: "#e9061d",
          yAxisID: "A"
        }
      ];

      this.show = true;
    }
  }
}
