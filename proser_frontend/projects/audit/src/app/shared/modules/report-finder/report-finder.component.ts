import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { getUpdateFilter } from "shared/functions";
import { MainAuditReportModel } from "../../models/reports/data/MainAuditReport.model";
import { NgModel } from "@angular/forms";

@Component({
  selector: "app-reports-report-finder",
  templateUrl: "./report-finder.component.html",
  styleUrls: ["./report-finder.component.scss"]
})
export class ReportFinderComponent implements OnInit {
  @Output() returnResult = new EventEmitter();

  // Number of lines in table
  @Output() returnNumberOfRowsInTable = new EventEmitter();
  numberOfRowsInTable;
  listOfRowsInTable;

  // Filter table
  @Output() returnRowsForTable = new EventEmitter();
  @Input() rows;
  @Input() rows_original;
  @Input() initialSelectedFilterField;
  @Input() filterFieldList;
  
  findInList;

  selectedFilterField;

  // Complementary
  userSelection;
  // action;
  mainAuditReport;

  constructor() {
    // variables for number of rows in table
    this.listOfRowsInTable = [
      { id: 1, name: 1, value: 1 },
      { id: 5, name: 5, value: 5 },
      { id: 10, name: 10, value: 10 },
      { id: 15, name: 15, value: 15 },
      { id: 20, name: 20, value: 20 },
      { id: 1000, name: "n", value: 1000 }
    ];

    this.numberOfRowsInTable = { id: 10, name: 10, value: 10 };

    // this.filterFieldList = this.model.fieldList();
  }

  ngOnInit() {
    this.selectedFilterField = this.initialSelectedFilterField;
  }

  // Number of lines in table
  onChangeNumberOfRowsInTable(event) {
    this.returnNumberOfRowsInTable.emit(this.numberOfRowsInTable);
  }

  ///////////////////////////////////////////////////////////////////
  onUpdateFilter(event) {
    let temp = getUpdateFilter(
      event,
      this.rows,
      this.rows_original,
      this.selectedFilterField.field_name
    );
    this.returnRowsForTable.emit(temp);
  }
}
