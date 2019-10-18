import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvScheduleRoutingModule } from "./crud-inv-schedule-routing.module";
import { CrudInvScheduleComponent } from "./crud-inv-schedule.component";
import { CrudInvScheduleDetailComponent } from "./crud-inv-schedule-detail/crud-inv-schedule-detail.component";
import { CrudInvScheduleListComponent } from "./crud-inv-schedule-list/crud-inv-schedule-list.component";

@NgModule({
  declarations: [
    CrudInvScheduleComponent,
    CrudInvScheduleDetailComponent,
    CrudInvScheduleListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvScheduleRoutingModule
  ]
})
export class CrudInvScheduleModule {}
