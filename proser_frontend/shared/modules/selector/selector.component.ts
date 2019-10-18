import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserSelectionModel, AlertModel } from "shared/models";

import { AlertService } from "shared/services/helpers/alert.service";
// import { EnvService } from "shared/services/helpers/env.service";
import { UserSelectionService } from "shared/services/crud/system/user-selection.service";

import {
  selectionToText,
  optionsToText,
  dateToDatePicker,
  textTimeToObjectTime,
  objectTimeToTextTime,
  objectDateToTextDate,
  selectorOptionSubtitles,
  selectorLegendSubtitles
} from "shared/functions";

import { AuthService } from "shared/services";
import * as moment from "moment";

import groupList from "shared/data/selector-group-list.data";

@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"]
})
export class SelectorComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter();
  @Output() userSelectionBack: EventEmitter<any> = new EventEmitter();
  @Output() closeSelector: EventEmitter<any> = new EventEmitter();

  @Input() userSelection: UserSelectionModel;
  @Input() selectorVisibleFields: UserSelectionModel;

  // time
  start_time_text = "00:00:00";
  end_time_text = "23:59:59";

  action;

  alertMessage: AlertModel;
  // env;
  error_detected = false;
  error_message;

  selectorForm: FormGroup;

  show_submit_button;
  show_data = false;

  selection;
  previousUserSelection;

  model: UserSelectionModel; // Used for field labels
  report_title: string;

  incomingUserSelection: UserSelectionModel;

  // list;
  menuOptions: UserSelectionModel;

  groupList;

  constructor(
    private formBuilder: FormBuilder,
    private userSelectionService: UserSelectionService,
    private alertService: AlertService,
    // private envService: EnvService,
    private authService: AuthService
  ) {
    this.selection = new UserSelectionModel("standard");

    this.menuOptions = new UserSelectionModel("menuOptions");

    this.incomingUserSelection = new UserSelectionModel();

    this.alertMessage = new AlertModel();
    this.show_submit_button = false;
    this.show_data = false;

    this.model = new UserSelectionModel();
    this.groupList = groupList;
  }

  ngOnInit() {
    this.menuOptions = JSON.parse(localStorage.getItem("menuOptions"));
    if (this.menuOptions === null || this.menuOptions === undefined) {
      this.getUserSelectionMenus();
    }

    this.previousUserSelection = this.userSelection;
    this.onFillForm(this.userSelection);
  }

  onAccept() {
    this.closeModal.emit("close");
  }

  onCloseModal() {
    this.closeModal.emit("close");
  }

  onReset() {
    let proser_store = {
      userSelection: new UserSelectionModel()
    };
    proser_store.userSelection = this.resetSelector(this.userSelection);
    this.onChange();
    localStorage.setItem("proser_store", JSON.stringify(proser_store));
    this.ngOnInit();
  }

  onCancel() {
    let proser_store = {
      userSelection: new UserSelectionModel()
    };
    proser_store.userSelection = this.previousUserSelection;
    this.onChange();
    localStorage.setItem("proser_store", JSON.stringify(proser_store));
    this.closeModal.emit("close");
  }

  onAllDay() {
    this.start_time_text = "00:00:00";
    this.end_time_text = "23:59:59";

    this.selectorForm.patchValue({
      start_time_hour: {
        hour: 0,
        minute: 0,
        second: 0,
        value: "00:00:00"
      }
    });

    this.selectorForm.patchValue({
      end_time_hour: {
        hour: 23,
        minute: 59,
        second: 59,
        value: "23:59:59"
      }
    });

    this.selectorForm.patchValue({
      groupBy: this.groupList[0]
    });

    this.onChange();
  }

  ngOnDestroy() {
    this.closeSelector.emit("redraw");
  }

  onFillForm(currentSelection) {
    if (currentSelection) {
      this.start_time_text = objectTimeToTextTime(
        currentSelection.start_time_hour
      );

      this.end_time_text = objectTimeToTextTime(currentSelection.end_time_hour);

      this.selectorForm = this.formBuilder.group({
        title: [currentSelection.title],
        entity_selection: [currentSelection.entity_selection],
        options: [currentSelection.options],
        legend: [currentSelection.legend],
        login: [currentSelection.login],

        mode: [currentSelection.mode],
        type: [currentSelection.type],

        start_date: [currentSelection.start_date],
        end_date: [currentSelection.end_date],
        start_time: [currentSelection.start_time],
        end_time: [currentSelection.end_time],

        auxiliar: [currentSelection.auxiliar],
        assignation: [currentSelection.assignation],

        client: [currentSelection.client],
        queue: [currentSelection.queue],
        service: [currentSelection.service],
        campaign: [currentSelection.campaign],

        supervisor: [currentSelection.supervisor],
        agent: [currentSelection.agent],
        role: [currentSelection.role],
        schedule: [currentSelection.schedule],

        status: [currentSelection.status],

        last_minutes: [currentSelection.last_minutes],
        interval: [currentSelection.interval],

        groupBy: [currentSelection.groupBy],
        orderBy: [currentSelection.orderBy],
        limitBy: [currentSelection.limitBy],

        start_time_hour: [currentSelection.start_time_hour],
        end_time_hour: [currentSelection.end_time_hour]
      });
    }

    this.show_data = true;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.selectorForm.controls;
  }

  onRechargeForm() {
    // this.selectorForm.patchValue = this.incomingUserSelection;
  }

  onSubmit(currentSelection) {
    this.selection = currentSelection;
    this.userSelectionService.writeUserSelection(currentSelection);
    this.userSelectionBack.emit(currentSelection);
  }

  onChange() {
    this.selectorForm.patchValue({
      options: selectorOptionSubtitles(this.selectorForm.value)
    });
    this.selectorForm.patchValue({
      legend: selectorLegendSubtitles(this.selectorForm.value)
    });

    this.getUserSelectionMenus();
    this.userSelectionBack.emit(this.selectorForm.value);
    this.userSelectionService.writeUserSelection(this.selectorForm.value);
  }

  onNewStartDate() {
    this.selectorForm.patchValue({
      end_date: this.selectorForm.value.start_date
    });

    if (
      objectDateToTextDate(this.selectorForm.value.end_date) ===
      moment().format("YYYY-MM-DD")
    ) {
      this.selectorForm.patchValue({
        mode: { id: 0, name: "Actual", value: true }
      });
    } else {
      this.selectorForm.patchValue({
        mode: { id: 0, name: "Histórico", value: false }
      });
    }

    this.userSelection.start_date = this.selectorForm.value.start_date;
    this.userSelection.end_date = this.selectorForm.value.end_date;
    this.userSelectionService.writeUserSelection(this.selectorForm.value);
    this.onChange();
  }

  // Updates selection when new end date is selected
  onNewEndDate() {
    this.userSelection.start_date = this.selectorForm.value.start_date;
    this.userSelection.end_date = this.selectorForm.value.end_date;

    if (
      objectDateToTextDate(this.selectorForm.value.end_date) ===
      moment().format("YYYY-MM-DD")
    ) {
      this.selectorForm.patchValue({
        mode: { id: 0, name: "Actual" }
      });
    } else {
      this.selectorForm.patchValue({
        mode: { id: 0, name: "Historic" }
      });
    }

    this.userSelectionBack.emit(this.selectorForm.value);
    this.userSelectionService.writeUserSelection(this.selectorForm.value);
    this.onChange();
  }

  onChangeStartTime() {
    this.start_time_text = objectTimeToTextTime(
      this.selectorForm.value.start_time_hour
    );

    this.selectorForm.patchValue({
      start_time: {
        id: 0,
        value: this.start_time_text
      }
    });

    this.onChange();
  }

  onChangeEndTime() {
    this.end_time_text = objectTimeToTextTime(
      this.selectorForm.value.end_time_hour
    );

    this.selectorForm.patchValue({
      end_time: {
        id: 0,
        value: this.end_time_text
      }
    });
    this.onChange();
  }

  onInterval() {
    this.onAllDay();

    let start_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
    let end_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
    let start_time = { id: 0, value: "00:00:00" };
    let end_time = { id: 0, value: "23:59:59" };

    this.selectorForm.patchValue({
      start_date: start_date
    });

    this.selectorForm.patchValue({
      end_date: end_date
    });

    this.selectorForm.patchValue({
      start_time: start_time
    });

    this.selectorForm.patchValue({
      end_time: end_time
    });

    this.userSelection.start_date = start_date;
    this.userSelection.end_date = end_date;
    this.userSelection.start_time = start_time;
    this.userSelection.end_time = end_time;

    this.onChange();
  }

  onLastMinutes() {
    this.onAllDay();
    this.userSelectionService.writeUserSelection(this.selectorForm.value);

    let mode = [{ id: 0, name: "Actual" }];
    let start_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
    let end_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
    let start_time = { id: 0, value: "00:00:00" };
    let end_time = { id: 0, value: "23:59:59" };
    let interval = null;

    this.selectorForm.patchValue({
      mode: mode
    });

    this.selectorForm.patchValue({
      interval: interval
    });

    this.selectorForm.patchValue({
      start_date: start_date
    });

    this.selectorForm.patchValue({
      end_date: end_date
    });

    this.selectorForm.patchValue({
      start_time: start_time
    });

    this.selectorForm.patchValue({
      end_time: end_time
    });

    this.userSelection.mode = mode;
    this.userSelection.interval = interval;
    this.userSelection.start_date = start_date;
    this.userSelection.end_date = end_date;
    this.userSelection.start_time = start_time;
    this.userSelection.end_time = end_time;

    if (this.userSelection.last_minutes === null) {
      this.selectorVisibleFields.start_time = false;
      this.selectorVisibleFields.end_time = false;
    } else {
      this.selectorVisibleFields.start_time = true;
      this.selectorVisibleFields.end_time = true;
    }
    this.userSelectionService.writeUserSelection(this.selectorForm.value);
  }

  onStatusChange() {
    this.userSelectionService.writeUserSelection(this.selectorForm.value);
    this.onChange();
  }

  // Gets the menu lists from the server this.menuOptions
  getUserSelectionMenus() {
    this.selection = this.userSelectionService.readUserSelection();
    this.userSelectionService
      .getUserSelectionMenus(this.selection)
      .subscribe(data => {
        this.menuOptions = data;
        localStorage.setItem("menuOptions", JSON.stringify(this.menuOptions));
        error => {
          this.onError(error);
        };
      });
  }

  // ERROR: Handles error on queries
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = "Error del servidor";
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass =
      "alert alert-danger alert-dismissible fade show";
  }
  closeModalMsg() {
    this.closeSelector.emit("closeSelector");
  }

  resetSelector(userSelection) {
    // TEXT
    userSelection.title = this.userSelection.title;
    userSelection.entity_selection = this.userSelection.entity_selection;
    userSelection.options = "";
    userSelection.legend = "";
    userSelection.start_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
    userSelection.end_date = dateToDatePicker(moment().format("YYYY-MM-DD"));

    // OBJECTCS
    userSelection.mode = { id: 0, name: "Actual", value: true };
    userSelection.type = { id: 0, name: "Ejecutado" };
    userSelection.start_time = { id: 0, value: "00:00:00" };
    userSelection.end_time = { id: 0, value: "23:59:59" };
    userSelection.login = { id: 0, name: "username", profile: "profile" };
    userSelection.last_minutes = null; // {}; //{ id: 0, name: "no time", value: 0 };
    userSelection.interval = null; //{}; //{ id: 0, name: "no time", value: 0 };
    userSelection.groupBy = {
      id: 3,
      name: "COLA",
      Inv_id: "inv_queue_id",
      Inv_name: "inv_queue_name",
      MainCallEntry_json_id:
        'JSON_UNQUOTE(JSON_EXTRACT(callentry_operation_json, "$.queue[0].id"))',
      MainCdr_json_id:
        'JSON_UNQUOTE(JSON_EXTRACT(cdr_operation_json, "$.queue[0].id"))',
      MainAudit_json_id:
        'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.queue[0].id"))'
    };
    userSelection.orderBy = {}; //{}; //{ id: 0, name: "orderBy" };
    userSelection.limitBy = {}; //{}; //{ id: 0, name: "limitBy" };
    userSelection.status = { id: 0, name: "Activo", value: "A" };

    //ARRAY
    userSelection.client = []; // [{ id: 0, name: "client" }];
    userSelection.queue = []; // [{ id: 0, name: "queue" }];
    userSelection.service = []; //  [{ id: 0, name: "service" }];
    userSelection.campaign = []; // [{ id: 0, name: "campaign" }];

    userSelection.supervisor = []; // [{ id: 0, name: "supervisor" }];
    userSelection.agent = []; // [{ id: 0, name: "agent" }];
    userSelection.role = []; // [{ id: 0, name: "role" }];
    userSelection.schedule = []; // [{ id: 0, name: "schedule" }];
    userSelection.auxiliar = []; // [{ id: 0, name: "auxiliar" }];
    userSelection.assignation = []; // [{ id: 0, name: "assignation" }];

    userSelection.start_time_hour = {
      hour: 0,
      minute: 0,
      second: 0,
      value: "00:00:00"
    };
    userSelection.end_time_hour = {
      hour: 23,
      minute: 59,
      second: 59,
      value: "23:59:59"
    };

    userSelection.views = [
      { id: 1, name: "dashbord", time: 30, option: "actual" },
      { id: 1, name: "graph", time: 30 },
      { id: 1, name: "group", time: 30, option: "COLAS" },
      { id: 1, name: "dashbord", time: 30, option: "historic" }
    ];

    return userSelection;
  }
}
