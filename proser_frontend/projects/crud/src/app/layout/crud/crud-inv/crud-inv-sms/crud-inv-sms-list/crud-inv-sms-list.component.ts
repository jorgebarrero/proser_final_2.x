import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvSmsModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-sms-list',
  templateUrl: './crud-inv-sms-list.component.html',
  styleUrls: ['./crud-inv-sms-list.component.scss']
})
export class CrudInvSmsListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvSmsModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvSmsModel();
    this.selection = new InvSmsModel();
    this.selected = [{ selected: new InvSmsModel() }];

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
