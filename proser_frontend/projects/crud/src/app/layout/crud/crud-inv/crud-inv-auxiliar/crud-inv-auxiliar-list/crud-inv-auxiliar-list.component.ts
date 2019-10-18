import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvAuxiliarModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-auxiliar-list',
  templateUrl: './crud-inv-auxiliar-list.component.html',
  styleUrls: ['./crud-inv-auxiliar-list.component.scss']
})
export class CrudInvAuxiliarListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvAuxiliarModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvAuxiliarModel();
    this.selection = new InvAuxiliarModel();
    this.selected = [{ selected: new InvAuxiliarModel() }];

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
