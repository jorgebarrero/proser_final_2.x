import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuxIntervalModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-aux-interval-list',
  templateUrl: './crud-aux-interval-list.component.html',
  styleUrls: ['./crud-aux-interval-list.component.scss']
})
export class CrudAuxIntervalListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: AuxIntervalModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new AuxIntervalModel();
    this.selection = new AuxIntervalModel();
    this.selected = [{ selected: new AuxIntervalModel() }];

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
