import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HcbAgentModel, ActionConfig } from 'shared/models';

@Component({
  selector: 'app-crud-hcb-agent-list',
  templateUrl: './crud-hcb-agent-list.component.html',
  styleUrls: ['./crud-hcb-agent-list.component.scss']
})
export class CrudHcbAgentListComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter()

  @Input() rows
  @Input() numberOfRowsInTable
  @Input() show_datatable

  @Input() action

  selected
  selection

  model: HcbAgentModel
  // INITIALIZATION
  constructor() {
    this.model = new HcbAgentModel();
    this.selection = new HcbAgentModel();
    this.selected = [{ selected: new HcbAgentModel() }];
  }

  ngOnInit() {}

  // DETECT EVENTS ON DATATABLE
  onActivate(event) {}

  onSelect(event) {
    this.selection = event.selected[0];
    this.action.action = 'selectedRecord';
    this.action.temp = this.selection;
    this.listAnswer.emit(this.action);
  }

  extractName(value) {
    let result;

    if (typeof value === 'string') {
      try {
        let a = JSON.parse(value);

        if (typeof a === 'object') {
          return a[0].name;
        } else {
          return a[0].name;
        }
      } catch (err) {
        // console.error(`Error ${value}`, err);
      }
    }

    return result;
  }
}
