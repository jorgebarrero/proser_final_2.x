import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvClientModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-client-list',
  templateUrl: './crud-inv-client-list.component.html',
  styleUrls: ['./crud-inv-client-list.component.scss']
})
export class CrudInvClientListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvClientModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvClientModel();
    this.selection = new InvClientModel();
    this.selected = [{ selected: new InvClientModel() }];

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
