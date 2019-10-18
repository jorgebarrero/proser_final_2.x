import { UserSelectionModel } from "shared/models";

export class DashboardSelectionModel {
  userSelection: UserSelectionModel;
  modalView: any;

  constructor() {
    this.userSelection = new UserSelectionModel();
    this.modalView = "";
  }
}
