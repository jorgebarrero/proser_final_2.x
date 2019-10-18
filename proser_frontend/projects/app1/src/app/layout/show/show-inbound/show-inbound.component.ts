import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { UserSelectionModel, ActionConfig } from "shared/models";

import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

@Component({
  selector: "app-show-inbound",
  templateUrl: "./show-inbound.component.html",
  styleUrls: ["./show-inbound.component.scss"]
})
export class ShowInboundComponent implements OnInit {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  show: boolean;
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;

  // INITIALIZATION
  constructor(private userSelectionService: UserSelectionService) {}

  ngOnInit() {
    this.userSelection = new UserSelectionModel("standard");
    this.selectorVisibleFields = new UserSelectionModel("visible");
    // this.selectorVisibleFields.groupBy = true;
    // this.selectorVisibleFields.auxiliar = true;
    // this.selectorVisibleFields.assignation = true;
    

    this.show = true;
    this.userSelection = this.userSelectionService.readUserSelection();
  }

  ngOnDestroy() {}

  updateSelection(event) {
    this.userSelection = event;
  }

  toogleShow() {
    this.show = !this.show;
  }
}
