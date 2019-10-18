import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProScheduleChangeModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-crud-inv-shift-change-list",
  templateUrl: "./crud-inv-shift-change-list.component.html",
  styleUrls: ["./crud-inv-shift-change-list.component.scss"]
})
export class CrudInvShiftChangeListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: ProScheduleChangeModel;
  // INITIALIZATION
  constructor() {
    this.model = new ProScheduleChangeModel();
    this.selection = new ProScheduleChangeModel();
    this.selected = [{ selected: new ProScheduleChangeModel() }];
  }

  ngOnInit() {}

  // DETECT EVENTS ON DATATABLE
  onActivate(event) {}

  onSelect(event) {
    this.selection = event.selected[0];
    this.action.action = "selectedRecord";
    this.action.temp = this.selection;
    this.listAnswer.emit(this.action);
  }
}
