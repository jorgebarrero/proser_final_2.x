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
  selector: "app-reports-wait-time-report-graph",
  templateUrl: "./wait-time-report-graph.component.html",
  styleUrls: ["./wait-time-report-graph.component.scss"]
})
export class WaitTimeReportGraphComponent implements OnInit {
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
    // console.error("rows", this.rows);

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

  extractIndicators(rows) {
    let data = rows[0];

    return [
      { id: 1, name: "0-5", value: data.afterFive },
      { id: 2, name: "6-10", value: data.afterTen },
      { id: 3, name: "11-15", value: data.afterFifteen },
      { id: 4, name: "16-20", value: data.afterTwenty },
      { id: 5, name: "21-25", value: data.afterTwentyfive },
      { id: 5, name: "26-30", value: data.afterThirty },

      { id: 6, name: "31-60", value: data.afterSixty },
      {
        id: 7,
        name: "61-120",
        value: data.afterTwoMinutes
      },
      {
        id: 7,
        name: "121-180",
        value: data.afterThreeMinutes
      },
      {
        id: 8,
        name: "181-240",
        value: data.afterFourMinutes
      },
      { id: 9, name: "240->", value: data.afterMoreFourMinutes }
    ];
  }

  generateGraph(msg?: string, rows?, barChartData?) {
    let graphIndicators = this.extractIndicators(rows);

    // console.error("rows", this.rows);
    // console.error("graphIndicators", msg, graphIndicators);

    if (graphIndicators) {
      let dataGraph = graphIndicators.map(x => {
        return x.value;
      });

      this.barChartLabels = graphIndicators.map(x => {
        return x.name;
      });

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
            }
          ]
        }
      };

      this.barChartData = [
        {
          data: dataGraph,
          label: "Intervalos",
          borderColor: "#3e95cd",
          backgroundColor: "#3e95cd",
          yAxisID: "A"
        }
      ];

      this.show = true;
    }
  }
}
