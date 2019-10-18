import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvQueueModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-inv-queue-list",
  templateUrl: "./crud-inv-queue-list.component.html",
  styleUrls: ["./crud-inv-queue-list.component.scss"]
})
export class CrudInvQueueListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvQueueModel;
  // INITIALIZATION
  constructor() {
    this.model = new InvQueueModel();
    this.selection = new InvQueueModel();
    this.selected = [{ selected: new InvQueueModel() }];
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
