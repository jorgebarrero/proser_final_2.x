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
  constructor(private userSelectionService: UserSelectionService) {
    this.selectorVisibleFields = new UserSelectionModel();

    this.selectorVisibleFields.orderBy = false;
    this.selectorVisibleFields.groupBy = false;
    this.selectorVisibleFields.limitBy = false;

    this.selectorVisibleFields.end_date = false;
    this.selectorVisibleFields.role = false;

    this.selectorVisibleFields.auxiliar = false;
    this.selectorVisibleFields.assignation = false;

    this.show = true;
  }

  ngOnInit() {
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
