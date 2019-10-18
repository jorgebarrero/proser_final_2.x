import { UserSelectionModel, AlertModel } from "shared/models";
import { NgModel } from "@angular/forms";

export class DisplayInboundSectionsModel {
  // PROPERTIES
  userSelection: UserSelectionModel;
  selectorVisibleFields: UserSelectionModel;
  model: UserSelectionModel;
  serverResponse;
  title;

  fieldList;

  // INITIALIZE PROPERTIES
  constructor() {
    // sections & views
    this.userSelection = new UserSelectionModel("standard");
    this.selectorVisibleFields = new UserSelectionModel("visible");
    this.model = new UserSelectionModel("standard");
    this.title = "Display llamadas entrantes";
    this.serverResponse = null;
  }
}
