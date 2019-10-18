import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-reports-connection-report-list-detail",
  templateUrl: "./connection-report-list-detail.component.html",
  styleUrls: ["./connection-report-list-detail.component.scss"]
})
export class ConnectionReportListDetailComponent implements OnInit {
  @Input() rows_detail;
  @Input() rows_detail_total;
  @Input() model;
  @Input() selected;

  rows_total;
  
  
  constructor() {}

  ngOnInit() {
    this.rows_total = this.rows_detail_total;
  }

  onActivate(event) {}

  onSelect(event) {}
}
