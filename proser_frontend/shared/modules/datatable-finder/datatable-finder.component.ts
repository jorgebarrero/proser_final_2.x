import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-datatable-finder",
  templateUrl: "./datatable-finder.component.html",
  styleUrls: ["./datatable-finder.component.scss"]
})
export class DatatableFinderComponent implements OnInit {
  @Input() crudRecord;
  findInList;

  constructor() {}

  ngOnInit() {}

  onUpdateFilter(event) {
    this.crudRecord.rows = this.getUpdateFilter(
      event,
      this.crudRecord.rows,
      this.crudRecord.rows_original,
      this.crudRecord.selectedFilterField.field_name
    );
  }

  getUpdateFilter(string, rows, rows_original, field) {
    let result = null;
    const val = string.toLowerCase();
    result = rows_original.filter(function(d) {
      typeof d[field] !== "string"
        ? (d[field] = String(d[field]))
        : (d[field] = d[field]);
      return d[field] ? d[field].toLowerCase().indexOf(val) !== -1 || !val : "";
    });
    return result;
  }
}
