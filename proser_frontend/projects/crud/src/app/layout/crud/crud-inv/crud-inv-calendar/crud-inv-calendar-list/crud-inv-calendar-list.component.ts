import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvCalendarModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-calendar-list',
  templateUrl: './crud-inv-calendar-list.component.html',
  styleUrls: ['./crud-inv-calendar-list.component.scss']
})
export class CrudInvCalendarListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvCalendarModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvCalendarModel();
    this.selection = new InvCalendarModel();
    this.selected = [{ selected: new InvCalendarModel() }];

  }
    
  ngOnInit() {
  
  }

    // DETECT EVENTS ON DATATABLE
    onActivate(event) {
      
    }

    onSelect(event) {
      this.selection = event.selected[0];
      this.action.action = 'selectedRecord';
      this.action.temp = this.selection;
      this.listAnswer.emit(this.action);
    }
}
