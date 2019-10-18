import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { InvCampaignModel, ActionConfig } from "shared/models";

@Component({
  selector: 'app-crud-inv-campaign-list',
  templateUrl: './crud-inv-campaign-list.component.html',
  styleUrls: ['./crud-inv-campaign-list.component.scss']
})
export class CrudInvCampaignListComponent implements OnInit {

  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  @Input() rows;
  @Input() numberOfRowsInTable;
  @Input() show_datatable;

  @Input() action;

  selected;
  selection;

  model: InvCampaignModel;
  // INITIALIZATION
  constructor(
  ) {
    this.model = new InvCampaignModel();
    this.selection = new InvCampaignModel();
    this.selected = [{ selected: new InvCampaignModel() }];

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
