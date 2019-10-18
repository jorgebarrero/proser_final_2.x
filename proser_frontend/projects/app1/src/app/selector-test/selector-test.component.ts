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
  selector: "app-selector-test",
  templateUrl: "./selector-test.component.html",
  styleUrls: ["./selector-test.component.css"]
})
export class SelectorTestComponent implements OnInit, OnDestroy {
  @Output() listAnswer: EventEmitter<any> = new EventEmitter();

  show: boolean;
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;

  // INITIALIZATION
  constructor(private userSelectionService: UserSelectionService) {
    this.userSelection = new UserSelectionModel("standard");
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.show = true;
  }

  ngOnInit() {
    this.userSelection = this.userSelectionService.readUserSelection();
  }

  ngOnDestroy(){

  };
  
  updateSelection(event) {
    this.userSelection = event;
  }

  toogleShow() {
    this.show = !this.show;
  }
}
