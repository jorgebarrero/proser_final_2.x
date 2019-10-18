import { UserbaseModel, AlertModel } from "shared/models";
import { NgModel } from "@angular/forms";

export class CrudUserbaseModel {
  // PROPERTIES
  currentRecord: UserbaseModel;
  model: UserbaseModel;
  // datatable
  rows;
  rows_original;
  rowsInDatatable;
  // filter
  filterFieldList;
  selectedFilterField;
  // others
  alertMessage: AlertModel;
  action;
  profileList;
  title;
  // list
  customLists;
  // sections
  showAll;
  showHeader;
  showDatatable;
  showDetail;
  showDatatableFinder;
  // buttons header
  buttonMain;
  buttonViewAllRecords;
  buttonViewDetailRecord;
  buttonEditRecord;
  buttonNewRecord;
  buttonActiveRecords;
  buttonInactiveRecords;
  buttonExportExcel;
  buttonExportCsv;

  // buttons detail
  buttonCancel;
  buttonReset;
  buttonDelete;
  buttonDeactivate;
  buttonReactivate;
  buttonSubmit;
  buttonTest;

  // INITIALIZE PROPERTIES
  constructor() {
    // sections & views
    this.title = null;
    this.action = "view";
    this.alertMessage = new AlertModel();
    this.showAll = true;
    this.showHeader = true;
    this.showDatatable = true;
    this.showDatatableFinder = true;
    this.showDetail = false;

    // data
    this.currentRecord = new UserbaseModel();
    this.model = new UserbaseModel();
    this.rows = [new UserbaseModel()];
    this.rows_original = [new UserbaseModel()];
    this.filterFieldList = new UserbaseModel().fieldList();
    this.selectedFilterField = {
      field_name: "username",
      name: "nombre_usuario",
      text: "Usuario"
    };
    this.rowsInDatatable = { id: 10, name: 10, value: 10 };
    this.profileList = [{ id: 4, name: "user" }];

    // buttons header
    this.buttonMain = { id: 1, name: "Usuarios", value: true };
    this.buttonViewAllRecords = { id: 1, name: "Todos", value: true };
    this.buttonActiveRecords = { id: 1, name: "Activos", value: false };
    this.buttonInactiveRecords = { id: 1, name: "inactivos", value: false };
    this.buttonNewRecord = { id: 1, name: "Nuevo", value: true };

    this.buttonViewDetailRecord = { id: 1, name: "Detalle", value: true };
    this.buttonNewRecord = { id: 1, name: "nuevo", value: true };
    this.buttonEditRecord = { id: 1, name: "Editar", value: true };
    this.buttonExportExcel = { id: 1, name: "Exportar Excel", value: true };
    this.buttonExportCsv = { id: 1, name: "Exportar csv", value: true };

    // buttons detail

    this.buttonCancel = { id: 1, name: "Cancelar", value: true };
    this.buttonReset = { id: 2, name: "Recargar", value: true };
    this.buttonDelete = { id: 3, name: "Eliminar", value: false };
    this.buttonDeactivate = { id: 4, name: "Desactivar", value: false };
    this.buttonReactivate = { id: 5, name: "Reactivar", value: false };
    this.buttonSubmit = { id: 6, name: "Guardar", value: false };
    this.buttonTest = { id: 6, name: "Probar", value: true };
  }
}
