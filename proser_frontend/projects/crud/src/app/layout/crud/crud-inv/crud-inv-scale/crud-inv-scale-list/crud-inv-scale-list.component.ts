import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvScaleModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-scale-list',
  templateUrl: './crud-inv-scale-list.component.html',
  styleUrls: ['./crud-inv-scale-list.component.scss']
})
export class CrudInvScaleListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvScaleModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvScaleModel();
    this.selection = new InvScaleModel();
    this.selected = [{ selected: new InvScaleModel() }];

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
