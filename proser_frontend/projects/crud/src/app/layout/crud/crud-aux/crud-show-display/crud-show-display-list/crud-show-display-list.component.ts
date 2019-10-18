import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ProShowDisplayModel, ActionConfig } from "shared/models";

@Component({
  selector: "app-crud-crud-show-display-list",
  templateUrl: "./crud-show-display-list.component.html",
  styleUrls: ["./crud-show-display-list.component.scss"]
})
export class CrudShowDisplayListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: ProShowDisplayModel;

  // INITIALIZATION
  constructor() {
    this.model = new ProShowDisplayModel();
    this.selection = new ProShowDisplayModel();
    this.selected = [{ selected: new ProShowDisplayModel() }];
  }

  ngOnInit() {
    // console.log("action", this.action);
    if (
      (this.action.action =
        "afterCreatedRecord" && Array.isArray(this.action.temp))
    ) {
      let temp = this.action.temp.map(x => {
        return {
          pro_show_display_id: x.pro_show_display_id,

          pro_show_display_name: x.pro_show_display_name,
          pro_show_display_start_time: x.pro_show_display_start_time,
          pro_show_display_end_time: x.pro_show_display_end_time,
          pro_show_display_status: x.pro_show_display_status,

          pro_show_display_weekday: x.pro_show_display_weekday
            ? JSON.parse(x.pro_show_display_weekday)
            : null,

          pro_show_display_type: x.pro_show_display_type
            ? JSON.parse(x.pro_show_display_type)
            : null,

          pro_show_display_view: x.pro_show_display_view
            ? JSON.parse(x.pro_show_display_view)
            : null,

          pro_show_display_selection: x.pro_show_display_selection
            ? JSON.parse(x.pro_show_display_selection)
            : null
        };
      });

      this.rows = temp;
    }
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
