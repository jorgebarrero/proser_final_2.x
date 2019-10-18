import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvServiceModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-service-list',
  templateUrl: './crud-inv-service-list.component.html',
  styleUrls: ['./crud-inv-service-list.component.scss']
})
export class CrudInvServiceListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvServiceModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvServiceModel();
    this.selection = new InvServiceModel();
    this.selected = [{ selected: new InvServiceModel() }];

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
