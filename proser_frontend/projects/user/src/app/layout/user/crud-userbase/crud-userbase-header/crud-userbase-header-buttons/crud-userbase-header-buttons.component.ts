import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { AlertModel, UserbaseModel } from "shared/models";

// Component imports
import { CrudUserbaseModel } from "./../../CrudUserbase.model";

@Component({
  selector: "app-user-crud-userbase-header-buttons",
  templateUrl: "./crud-userbase-header-buttons.component.html",
  styleUrls: ["./crud-userbase-header-buttons.component.scss"]
})
export class CrudUserbaseHeaderButtonsComponent implements OnInit {
  @Input() crudRecord: CrudUserbaseModel;
  title;
  constructor() {}

  ngOnInit() {}

  onGetAll() {
    this.crudRecord.showDatatable = true;
    this.crudRecord.showDetail = false;
    this.crudRecord.showDatatableFinder = true;
    this.crudRecord.action = "view";
    this.crudRecord.buttonNewRecord.value = true;
    this.crudRecord.buttonEditRecord.value = true;
    this.crudRecord.buttonViewDetailRecord.value = true;

    this.crudRecord.currentRecord = new UserbaseModel();
    this.crudRecord.title = null;
    localStorage.setItem("currentCrud", JSON.stringify(this.crudRecord));
  }

  onNewRecord() {
    this.crudRecord.currentRecord = new UserbaseModel();
    this.crudRecord.showDatatable = false;
    this.crudRecord.showDatatableFinder = false;
    this.crudRecord.showDetail = true;
    this.crudRecord.action = "new";
    this.crudRecord.buttonNewRecord.value = false;
    this.crudRecord.buttonEditRecord.value = false;
    this.crudRecord.buttonViewDetailRecord.value = false;
    this.title = this.crudRecord.buttonNewRecord.name;
    this.crudRecord.title = "Nuevo registro";
    localStorage.setItem("currentCrud", JSON.stringify(this.crudRecord));
  }

  onEditRecord() {
    this.crudRecord.showDatatable = false;
    this.crudRecord.showDetail = true;
    this.crudRecord.showDatatableFinder = false;
    this.crudRecord.action = "edit";
    this.crudRecord.buttonNewRecord.value = false;
    this.crudRecord.buttonEditRecord.value = false;
    this.crudRecord.buttonViewDetailRecord.value = false;
    this.title = this.crudRecord.buttonEditRecord.name;
    this.crudRecord.title = "Editar el registro";
    localStorage.setItem("currentCrud", JSON.stringify(this.crudRecord));
  }

  onShowDetail() {
    this.crudRecord.showDatatable = false;
    this.crudRecord.showDetail = true;
    this.crudRecord.showDatatableFinder = false;
    this.crudRecord.action = "view";
    this.crudRecord.buttonNewRecord.value = false;
    this.crudRecord.buttonEditRecord.value = true;
    this.crudRecord.buttonViewDetailRecord.value = false;
    this.title = this.crudRecord.buttonEditRecord.name;
    this.crudRecord.title = "Visualizar detalle del registro";
    localStorage.setItem("currentCrud", JSON.stringify(this.crudRecord));
  }
}
