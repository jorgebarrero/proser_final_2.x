import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvScheduleDayModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-inv-schedule-day-list",
  templateUrl: "./crud-inv-schedule-day-list.component.html",
  styleUrls: ["./crud-inv-schedule-day-list.component.scss"]
})
export class CrudInvScheduleDayListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvScheduleDayModel;
  // INITIALIZATION
  constructor() {
    this.model = new InvScheduleDayModel();
    this.selection = new InvScheduleDayModel();
    this.selected = [{ selected: new InvScheduleDayModel() }];
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
