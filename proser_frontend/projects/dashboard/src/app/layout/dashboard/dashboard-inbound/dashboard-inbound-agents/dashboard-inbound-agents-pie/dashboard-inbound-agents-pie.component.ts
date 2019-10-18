import { Component, OnInit, Input } from "@angular/core";
import { ChartType, ChartOptions } from "chart.js";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Label } from "ng2-charts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

@Component({
  selector: "app-dashboard-inbound-agents-pie",
  templateUrl: "./dashboard-inbound-agents-pie.component.html",
  styleUrls: ["./dashboard-inbound-agents-pie.component.scss"]
})
export class DashboardInboundAgentsPieComponent implements OnInit {
  @Input() userSelection;
  @Input() rows;
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: false,
    legend: {
      position: "top"
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        }
      }
    }
  };
  public pieChartLabels: Label[] = [
    "Disponible",
    "Ocupado",
    "Auxiliar",
    "Asignado"
  ];
  public pieChartData: number[] = [300, 500, 100, 200];
  public pieChartType: ChartType = "doughnut";
  public pieChartLegend = false;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ["#dc3545", "#28a745", "#6f42c1", "#ffc107"]
    }
  ];

  data = [
    { name: "Ocupado", value: 0, color: "#dc3545" },
    { name: "Disponible", value: 0, color: "#28a745" },
    { name: "Asignado", value: 0, color: "#6f42c1" },
    { name: "Auxiliar", value: 0, color: "#ffc107" }
  ];

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  // events
  public chartClicked({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.error(event, active);
  }

  public chartHovered({
    event,
    active
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.error(event, active);
  }

  getColor(data) {
    let temp = data.map(x => {
      return x.color;
    });

    let pieChartColors = [
      {
        backgroundColor: temp
      }
    ];

    return pieChartColors;
  }

  getValues(data) {
    return data.map(x => {
      return x.value;
    });
  }

  getLabels(data) {
    return data.map(x => {
      return x.name;
    });
  }

  openModal(content) {
    this.modalService.open(content, {
      size: "lg",
      ariaLabelledBy: "modal-basic-title"
    });
  }
}
