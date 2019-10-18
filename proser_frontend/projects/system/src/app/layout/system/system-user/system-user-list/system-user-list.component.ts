import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserbaseModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-system-system-user-list",
  templateUrl: "./system-user-list.component.html",
  styleUrls: ["./system-user-list.component.scss"]
})
export class SystemUserListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() rowsInTableSelected;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: UserbaseModel;
  // INITIALIZATION
  constructor() {
    this.model = new UserbaseModel();
    this.selection = new UserbaseModel();
    this.selected = [{ selected: new UserbaseModel() }];
  }

  ngOnInit() {

    // console.error("text", this.model.fieldList());
    // console.error("text", this.model.fieldInfo("firstname").text);
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
