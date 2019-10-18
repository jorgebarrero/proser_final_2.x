import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { AlertModule } from "shared/modules/alert/alert.module";

import { SystemUserRoutingModule } from './system-user-routing.module';
import { SystemUserComponent } from './system-user.component';
import { SystemUserListComponent } from './system-user-list/system-user-list.component';
import { SystemUserDetailComponent } from './system-user-detail/system-user-detail.component';


@NgModule({
  declarations: [SystemUserComponent, SystemUserListComponent, SystemUserDetailComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,

    SystemUserRoutingModule
  ]
})
export class SystemUserModule { }
