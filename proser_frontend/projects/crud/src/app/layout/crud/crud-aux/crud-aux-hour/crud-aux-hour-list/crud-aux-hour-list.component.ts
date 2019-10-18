import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuxHourModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-aux-hour-list',
  templateUrl: './crud-aux-hour-list.component.html',
  styleUrls: ['./crud-aux-hour-list.component.scss']
})
export class CrudAuxHourListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: AuxHourModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new AuxHourModel();
    this.selection = new AuxHourModel();
    this.selected = [{ selected: new AuxHourModel() }];

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
