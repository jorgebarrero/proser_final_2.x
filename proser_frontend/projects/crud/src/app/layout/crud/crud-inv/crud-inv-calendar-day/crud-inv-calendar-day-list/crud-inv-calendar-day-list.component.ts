import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvCalendarDayModel, ActionConfig } from "shared/models";

import * as moment from "moment";

@Component({
  selector: "app-crud-inv-calendar-day-list",
  templateUrl: "./crud-inv-calendar-day-list.component.html",
  styleUrls: ["./crud-inv-calendar-day-list.component.scss"]
})
export class CrudInvCalendarDayListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvCalendarDayModel;
  // INITIALIZATION
  constructor() {
    this.model = new InvCalendarDayModel();
    this.selection = new InvCalendarDayModel();
    this.selected = [{ selected: new InvCalendarDayModel() }];
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

  onMoment(date) {
    return moment(date).format("YYYY-DD-MM");
  }
}
