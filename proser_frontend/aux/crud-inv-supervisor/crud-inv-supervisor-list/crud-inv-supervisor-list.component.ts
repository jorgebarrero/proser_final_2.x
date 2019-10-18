import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvSupervisorModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-inv-supervisor-list",
  templateUrl: "./crud-inv-supervisor-list.component.html",
  styleUrls: ["./crud-inv-supervisor-list.component.scss"]
})
export class CrudInvSupervisorListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvSupervisorModel;
  // INITIALIZATION
  constructor() {
    this.model = new InvSupervisorModel();
    this.selection = new InvSupervisorModel();
    this.selected = [{ selected: new InvSupervisorModel() }];
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
