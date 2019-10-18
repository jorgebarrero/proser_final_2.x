import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuxColorModel, ActionConfig } from "shared/models";


@Component({
  selector: 'app-crud-aux-color-list',
  templateUrl: './crud-aux-color-list.component.html',
  styleUrls: ['./crud-aux-color-list.component.scss']
})
export class CrudAuxColorListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: AuxColorModel;


  // INITIALIZATION
  constructor(
  ) {
    this.model = new AuxColorModel();
    this.selection = new AuxColorModel();
    this.selected = [{ selected: new AuxColorModel() }];

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
