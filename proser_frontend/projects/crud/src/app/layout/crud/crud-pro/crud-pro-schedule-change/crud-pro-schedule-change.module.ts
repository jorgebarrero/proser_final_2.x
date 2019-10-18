import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CrudProScheduleChangeRoutingModule } from "./crud-pro-schedule-change-routing.module";
import { CrudProScheduleChangeComponent } from "./crud-pro-schedule-change.component";
import { CrudProScheduleChangeListComponent } from "./crud-pro/crud-pro-schedule-change/crud-pro-schedule-change-list/crud-pro-schedule-change-list.component";
import { CrudProScheduleChangeDetailComponent } from "./crud-pro/crud-pro-schedule-change-detail/crud-pro-schedule-change-detail.component";

@NgModule({
  declarations: [
    CrudProScheduleChangeComponent,
    CrudProScheduleChangeListComponent,
    CrudProScheduleChangeDetailComponent
  ],
  imports: [CommonModule, CrudProScheduleChangeRoutingModule]
})
export class CrudProScheduleChangeModule {}
