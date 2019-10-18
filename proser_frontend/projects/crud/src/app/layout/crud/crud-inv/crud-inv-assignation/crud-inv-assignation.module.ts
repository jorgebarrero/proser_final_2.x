import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvAssignationRoutingModule } from "./crud-inv-assignation-routing.module";
import { CrudInvAssignationComponent } from "./crud-inv-assignation.component";
import { CrudInvAssignationDetailComponent } from "./crud-inv-assignation-detail/crud-inv-assignation-detail.component";
import { CrudInvAssignationListComponent } from "./crud-inv-assignation-list/crud-inv-assignation-list.component";

@NgModule({
  declarations: [
    CrudInvAssignationComponent,
    CrudInvAssignationDetailComponent,
    CrudInvAssignationListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvAssignationRoutingModule
  ]
})
export class CrudInvAssignationModule {}
