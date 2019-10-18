import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvAssignationModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-assignation-list',
  templateUrl: './crud-inv-assignation-list.component.html',
  styleUrls: ['./crud-inv-assignation-list.component.scss']
})
export class CrudInvAssignationListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvAssignationModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvAssignationModel();
    this.selection = new InvAssignationModel();
    this.selected = [{ selected: new InvAssignationModel() }];

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
