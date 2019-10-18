import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-datatable-rowsnumber",
  templateUrl: "./datatable-rowsnumber.component.html",
  styleUrls: ["./datatable-rowsnumber.component.scss"]
})
export class DatatableRowsnumberComponent implements OnInit {
  @Input() crudRecord;
  listOfRowsInTable;

  constructor() {
    // variables for number of rows in table
    this.listOfRowsInTable = [
      { id: 1, name: 1, value: 1 },
      { id: 5, name: 5, value: 5 },
      { id: 10, name: 10, value: 10 },
      { id: 15, name: 15, value: 15 },
      { id: 20, name: 20, value: 20 },
      { id: 50, name: 50, value: 50 },
      { id: 100, name: 100, value: 100 },
      { id: 100000, name: "n", value: 100000 }
    ];
  }

  ngOnInit() {}
}
