import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvAgentRoleModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-agent-role-list',
  templateUrl: './crud-inv-agent-role-list.component.html',
  styleUrls: ['./crud-inv-agent-role-list.component.scss']
})
export class CrudInvAgentRoleListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvAgentRoleModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvAgentRoleModel();
    this.selection = new InvAgentRoleModel();
    this.selected = [{ selected: new InvAgentRoleModel() }];

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
