import { DatatableFinderComponent } from "./../../../../../../../../shared/modules/datatable-finder/datatable-finder.component";
import { Component, OnInit, Input, ViewChild } from "@angular/core";

import {
  UserbaseService,
  ExcelService,
  RoleMappingService
} from "shared/services/";
import { AlertService, EnvService } from "shared/services/";
import { AlertModel, UserbaseModel } from "shared/models";

// Component imports
import { CrudUserbaseModel } from "../CrudUserbase.model";
import { CrudUserbaseDetailComponent } from "../crud-userbase-detail/crud-userbase-detail.component";



@Component({
  selector: "app-user-crud-userbase-list",
  templateUrl: "./crud-userbase-list.component.html",
  styleUrls: ["./crud-userbase-list.component.scss"]
})
export class CrudUserbaseListComponent implements OnInit {
  // Child components
  @ViewChild(CrudUserbaseDetailComponent, { static: false })
  private detailComponent: CrudUserbaseDetailComponent;

  @Input() crudRecord: CrudUserbaseModel;

  @Input() exportData;

  constructor(
    private userbaseService: UserbaseService,
    private roleMappingService: RoleMappingService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAll_Records();
    this.getRoles();
  }

  // IMPORT DATA FROM SERVICE
  getAll_Records(query?) {
    this.userbaseService.getAllRecords(query).subscribe(
      (data: UserbaseModel[]) => {
        let data_mapped = data.map(x => {
          return {
            id: x.id,
            firstname: x.firstname,
            lastname: x.lastname,
            profile: x.profile,
            realm: x.realm,
            username: x.username,
            password: x.password,
            email: x.email,
            emailVerified: x.emailVerified,
            verificationToken: x.verificationToken,
            memberId: x.memberId,
            user_legal_id: x.user_legal_id,
            user_internal_id: x.user_internal_id,
            user_photo_path: x.user_photo_path,
            // Optional
            roles: x.roles,
            roleMapping: x.roles,
            profile_json: x.roles[0],
            emailVerified_json: { id: 0, name: x.emailVerified }
          };
        });

        this.crudRecord.rows = data_mapped;
        // this.crudRecord.currentRecord = data_mapped[0];

        this.crudRecord.rows_original = data_mapped;
        // this.show_data = true;

        this.crudRecord.alertMessage = new AlertModel();
      },
      error => {
        // this.show_data = false;
        this.onError(error);
      }
    );
  }

  getRoles() {
    this.roleMappingService.getRoles().subscribe(
      data => {
        this.crudRecord.profileList = data;
      },
      error => {
        console.error("Error", error);
        this.onError(error);
      }
    );
  }

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.crudRecord.alertMessage.alertTitle = "Error del servidor";
    this.crudRecord.alertMessage.alertText = error.statusText;
    this.crudRecord.alertMessage.alertShow = true;
    this.crudRecord.alertMessage.alertClass =
      "alert alert-danger alert-dismissible fade show";
  }

  // DETECT EVENTS ON DATATABLE
  onActivate(event) {}

  onSelect(event) {
    this.crudRecord.currentRecord = event.selected[0];
    this.crudRecord.buttonEditRecord.value = true;
  }

  onExport() {
    console.log("destiny");
  }

  
}
