import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProShowDisplayModel, ActionConfig, AlertModel } from "shared/models";

import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  EnvService,
  UserSelectionService,
  AlertService
} from "shared/services";

import { UserSelectionModel } from "shared/models";

import { ProShowDisplayService } from "shared/services/";
// import { UserSelectionService } from "projects/system/src/app/shared/services/crud/system";

@Component({
  selector: "app-crud-crud-show-display-detail",
  templateUrl: "./crud-show-display-detail.component.html",
  styleUrls: ["./crud-show-display-detail.component.scss"]
})
export class CrudShowDisplayDetailComponent implements OnInit {
  @Output() returnResult = new EventEmitter();
  @Output() editAnswer: EventEmitter<any> = new EventEmitter();

  @Input() action: ActionConfig;

  alertMessage: AlertModel;

  env;
  error_detected = false;
  error_message;

  registerForm: FormGroup;

  show_submit_button;
  show_data;

  selection;

  model: ProShowDisplayModel;

  weekDayList;
  displayTypeList;
  viewTypeList;

  userSelection;
  selectorVisibleFields;
  local_store;
  activeModal;

  rows_original;
  rows;

  constructor(
    private formBuilder: FormBuilder,
    private showDisplayService: ProShowDisplayService,
    private alertService: AlertService,
    private envService: EnvService,
    private userSelectionService: UserSelectionService,
    private modalService: NgbModal
  ) {
    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = true;
    this.model = new ProShowDisplayModel();

    this.env = this.envService;
    this.userSelection = new UserSelectionModel("standard");
    this.selectorVisibleFields = new UserSelectionModel("visible");

    this.weekDayList = [
      { id: 1, name: "lunes", value: 1 },
      { id: 2, name: "martes", value: 2 },
      { id: 3, name: "miércoles", value: 3 },
      { id: 4, name: "jueves", value: 4 },
      { id: 5, name: "viernes", value: 5 },
      { id: 6, name: "sábado", value: 6 },
      { id: 7, name: "domingo", value: 7 }
    ];

    this.displayTypeList = [
      { id: 1, name: "Llamadas entrantes", value: "inbound" },
      { id: 2, name: "Llamadas salientes", value: "outbound" },
      { id: 3, name: "Llamadas automáticas", value: "automatic" },
      { id: 4, name: "Agentes", value: "agents" }
    ];

    this.viewTypeList = [
      { id: 1, name: "standard", value: 1 },
      { id: 2, name: "historic", value: 2 },
      { id: 3, name: "graph", value: 3 },
      { id: 4, name: "group", value: 4 }
    ];
  }

  ngOnInit() {
    this.userSelection = JSON.parse(
      localStorage.getItem("proser_store")
    ).userSelection;
    this.selection = JSON.parse(localStorage.getItem("recordSelection"))[0];
    this.onFillForm();
  }

  onFillForm() {
    /******** NEW RECORD ********* */
    if (this.action.action === "newRecord") {
      this.selection = new ProShowDisplayModel();
      this.selection.pro_show_display_selection = new UserSelectionModel(
        "standard"
      );
      // localStorage.setItem(
      //   "proser_store",
      //   JSON.stringify(this.selection.pro_show_display_selection)
      // );

      this.selection.pro_show_display_name = "Test";
      this.selection.pro_show_display_type = {
        id: 1,
        name: "Llamadas entrantes",
        value: "inbound"
      };
      this.selection.pro_show_display_weekday = [
        { id: 1, name: "lunes", value: 1 },
        { id: 2, name: "martes", value: 2 },
        { id: 3, name: "miércoles", value: 3 },
        { id: 4, name: "jueves", value: 4 },
        { id: 5, name: "viernes", value: 5 }
      ];
      this.selection.pro_show_display_view = [
        { id: 1, name: "standard", value: 1 }
      ];
    }

    this.registerForm = this.formBuilder.group({
      pro_show_display_id: [this.selection.pro_show_display_id],
      pro_show_display_name: [this.selection.pro_show_display_name],
      pro_show_display_weekday: [this.selection.pro_show_display_weekday],

      pro_show_display_start_time: [this.selection.pro_show_display_start_time],
      pro_show_display_end_time: [this.selection.pro_show_display_end_time],

      pro_show_display_type: [this.selection.pro_show_display_type],
      pro_show_display_selection: [this.selection.pro_show_display_selection],
      pro_show_display_view: [this.selection.pro_show_display_view],
      pro_show_display_status: [this.selection.pro_show_display_status]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onAnswer(event) {
    this.action = event;
    this.selection = this.action.temp;
    this.action.action === "showRecord" ? this.onShowDetail() : "";
    this.action.action === "editRecord" ? this.onEditRecord() : "";
  }

  // CREATE RECORD
  createRecord(query) {
    let record = this.registerForm.value;

    record.pro_show_display_weekday = JSON.stringify(
      this.registerForm.value.pro_show_display_weekday
    );
    record.pro_show_display_type = JSON.stringify(
      this.registerForm.value.pro_show_display_type
    );
    record.pro_show_display_view = JSON.stringify(
      this.registerForm.value.pro_show_display_view
    );

    record.pro_show_display_selection = JSON.stringify(
      this.registerForm.value.pro_show_display_selection
    );

    this.showDisplayService.postRecord(record).subscribe(
      data => {
        alert(
          `Registro agregado satisfactoriamente, ${data.pro_show_display_id}, ${data.pro_show_display_name}`
        );
        this.action.temp = [data];
        // this.selection = new AuxHourModel;
        // this.onFillForm();
        // this.show_data = true;
        this.action.action = "afterCreatedRecord";
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // CREATE RECORD
  editRecord(query) {
    let record = this.registerForm.value;

    record.pro_show_display_weekday = JSON.stringify(
      this.registerForm.value.pro_show_display_weekday
    );
    record.pro_show_display_type = JSON.stringify(
      this.registerForm.value.pro_show_display_type
    );
    record.pro_show_display_view = JSON.stringify(
      this.registerForm.value.pro_show_display_view
    );

    record.pro_show_display_selection = JSON.stringify(
      this.registerForm.value.pro_show_display_selection
    );

    this.showDisplayService.putRecord(record).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        alert(
          `Registro modificado satisfactoriamente, ${this.action.temp.aux_color_id}, ${this.action.temp.aux_color_name}`
        );
        this.action.action = "selectedRecord";
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  // DELETE RECORD
  deleteRecord(query: ProShowDisplayModel) {
    let id = this.action.temp.pro_show_display_id;

    this.showDisplayService.deleteRecord(id).subscribe(
      data => {
        this.selection = data;
        this.action.temp = this.selection;
        this.selection = new ProShowDisplayModel();
        this.onFillForm();
        alert(`Registro eliminado satisfactoriamente`);
        this.show_data = true;
        this.editAnswer.emit(this.action);
      },
      error => {
        console.error("Error", error);
        this.show_data = false;
        this.onError(error);
      }
    );
  }

  onDelete() {
    this.action.action = "delete";
    this.deleteRecord(this.action.temp);
  }

  onDeactivate() {
    this.selection = this.action.temp;
    this.selection.pro_show_display_status = "I";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReactivate() {
    this.selection = this.action.temp;
    this.selection.pro_show_display_status = "A";
    this.onFillForm();
    this.show_submit_button = true;
    // this.registerForm.pristine = false;
  }

  onReset() {
    this.selection = new ProShowDisplayModel();
    this.action.temp = this.selection;
    this.onFillForm();
  }

  afterCreatedRecord(register) {
    // console.error("afterCreatedRecord - register", register);
    this.action.action = "afterCreatedRecord";
    this.action.temp = [register];
    this.editAnswer.emit(this.action);
  }

  onShowDetail() {
    this.action.action = "showRecord";
  }

  onEditRecord() {
    this.action.action = "editRecord";
    this.selection = this.action.temp;
    this.onFillForm();
  }

  afterEditedRecord(register) {
    this.action.action = "afterEditedRecord";
    this.action.temp = [register];
    this.editAnswer.emit(this.action);
  }

  onCancel() {
    this.action = { action: "cancel", temp: "" };
    this.editAnswer.emit(this.action);
  }

  onAction() {
    this.action = { action: "edit_box", temp: "" };
    this.editAnswer.emit(this.action);
  }

  onSubmit(register) {
    if (this.action.action === "newRecord") {
      this.createRecord(register);
      this.afterCreatedRecord(register);
    }

    if (this.action.action === "editRecord") {
      this.selection = register;
      this.editRecord(register);
      this.afterEditedRecord(register);
    }

    if (this.action.action === "deleteRecord") {
      this.selection = register;
      this.deleteRecord(register);
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }

    if (this.action.action === "showRecord") {
      this.selection = register;
      this.action.temp = register;
      this.editAnswer.emit(this.action);
    }
  }

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = "Error del servidor";
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass =
      "alert alert-danger alert-dismissible fade show";
  }

  sendTest() {
    this.action.action = "test";
    this.action.temp = [
      {
        aux_color_id: 2,
        aux_color_name: "Supervisor 008",
        aux_color_status: "A"
      }
    ];

    this.editAnswer.emit(this.action);
  }

  onRecordJsonChange() {}

  copyUserSelection() {
    let temp = localStorage.getItem("proser_store");

    // console.log("temp", temp);

    this.registerForm.patchValue({
      pro_show_display_selection: temp
    });
    // this.selection.pro_show_display_selection = localStorage.getItem('proser_store')
  }

  // newUserSelection(content) {
  //   let newUserSelection = new UserSelectionModel("standard");

  //   this.registerForm.patchValue({
  //     pro_show_display_selection: newUserSelection
  //   });

  //   this.userSelectionService.writeUserSelection(
  //     this.registerForm.value.pro_show_display_selection
  //   );
  //   this.openModal(content);
  // }

  editUserSelection(content) {
    this.userSelectionService.writeUserSelection(
      this.registerForm.value.pro_show_display_selection
    );

    this.userSelection = JSON.parse(
      localStorage.getItem("proser_store")
    ).userSelection;

    this.registerForm.patchValue({
      pro_show_display_selection: this.userSelection
    });

    this.openDetailModal(content);
  }

  // MODAL
  // openModal(content) {
  //   this.activeModal = this.modalService.open(content, {
  //     windowClass: "my-class",
  //     keyboard: false
  //   });
  // }

  // closeSelector($event) {
  //   console.log("cerrando");

  //   console.log("value", this.registerForm.value.pro_show_display_selection);

  //   this.userSelectionService.writeUserSelection(
  //     this.registerForm.value.pro_show_display_selection
  //   );

  //   this.userSelection = this.userSelectionService.readUserSelection(
  //     this.local_store
  //   );

  //   // console.error("CLOSED", this.userSelection);
  //   this.returnResult.emit({
  //     userSelection: this.userSelection
  //     // rows: this.rows,
  //     // rows_original: this.rows_original
  //   });

  //   this.ngOnInit();
  // }

  // updateSelection($event) {
  //   this.userSelection = this.userSelectionService.readUserSelection(
  //     this.local_store
  //   );
  //   // console.error("RETURN", this.userSelection);
  // }

  /****************************** */

  openDetailModal(content) {
    this.activeModal = this.modalService.open(content, {
      windowClass: "my-class",
      keyboard: false
    });
  }

  onCloseModal(event, closeModal) {
    this.activeModal.close();
  }

  updateSelection(event, userSelectionBack) {
    console.log("userSelectionBack", userSelectionBack);

    // closeDetailModal()

    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    // console.error("RETURN", this.userSelection);
  }

  closeSelector($event) {
    this.userSelection = this.userSelectionService.readUserSelection(
      this.local_store
    );
    // console.error("CLOSED", this.userSelection);
    this.returnResult.emit({
      userSelection: this.userSelection
      // rows: this.rows,
      // rows_original: this.rows_original
    });
    this.ngOnInit();
  }
}
