import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuxLineModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-aux-line-list',
  templateUrl: './crud-aux-line-list.component.html',
  styleUrls: ['./crud-aux-line-list.component.scss']
})
export class CrudAuxLineListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: AuxLineModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new AuxLineModel();
    this.selection = new AuxLineModel();
    this.selected = [{ selected: new AuxLineModel() }];

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
