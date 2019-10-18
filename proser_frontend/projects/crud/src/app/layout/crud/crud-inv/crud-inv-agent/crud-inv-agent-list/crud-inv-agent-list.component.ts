import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvAgentModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-inv-agent-list",
  templateUrl: "./crud-inv-agent-list.component.html",
  styleUrls: ["./crud-inv-agent-list.component.scss"]
})
export class CrudInvAgentListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvAgentModel;
  // INITIALIZATION
  constructor() {
    this.model = new InvAgentModel();
    this.selection = new InvAgentModel();
    this.selected = [{ selected: new InvAgentModel() }];
  }

  ngOnInit() {
    // console.error("rows", this.rows);
  }

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
