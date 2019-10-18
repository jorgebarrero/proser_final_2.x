import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvSmsRoutingModule } from "./crud-inv-sms-routing.module";
import { CrudInvSmsComponent } from "./crud-inv-sms.component";
import { CrudInvSmsDetailComponent } from "./crud-inv-sms-detail/crud-inv-sms-detail.component";
import { CrudInvSmsListComponent } from "./crud-inv-sms-list/crud-inv-sms-list.component";

@NgModule({
  declarations: [
    CrudInvSmsComponent,
    CrudInvSmsDetailComponent,
    CrudInvSmsListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvSmsRoutingModule
  ]
})
export class CrudInvSmsModule {}
