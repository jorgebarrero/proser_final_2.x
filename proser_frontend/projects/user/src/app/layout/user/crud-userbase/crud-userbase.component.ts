import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { UserbaseModel, ActionConfig } from "shared/models";
import { UserbaseService, ExcelService } from "shared/services/";
import { getUpdateFilter } from "shared/functions";
import { AlertModel } from "shared/models";
import { AlertService, EnvService } from "shared/services/";

// Component imports
import { CrudUserbaseModel } from "./CrudUserbase.model";

@Component({
  selector: "app-user-crud-userbase",
  templateUrl: "./crud-userbase.component.html",
  styleUrls: ["./crud-userbase.component.scss"]
})
export class CrudUserbaseComponent implements OnInit {
  crudRecord: CrudUserbaseModel;

  constructor() {
    this.crudRecord = new CrudUserbaseModel();
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
