import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvScheduleModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-inv-schedule-list",
  templateUrl: "./crud-inv-schedule-list.component.html",
  styleUrls: ["./crud-inv-schedule-list.component.scss"]
})
export class CrudInvScheduleListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvScheduleModel;
  // INITIALIZATION
  constructor() {
    this.model = new InvScheduleModel();
    this.selection = new InvScheduleModel();
    this.selected = [{ selected: new InvScheduleModel() }];
  }
  ngOnInit() {}

  // DETECT EVENTS ON DATATABLE
  onActivate(event) {}

  onSelect(event) {
    this.selection = event.selected[0];
    this.action.action = "selectedRecord";
    this.action.temp = this.selection;

    localStorage.setItem("recordSelection", JSON.stringify([this.selection]));

    this.listAnswer.emit(this.action);
  }
}
