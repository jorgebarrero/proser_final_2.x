import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvSupervisorRoutingModule } from "./crud-inv-supervisor-routing.module";
import { CrudInvSupervisorComponent } from "./crud-inv-supervisor.component";
import { CrudInvSupervisorDetailComponent } from "./crud-inv-supervisor-detail/crud-inv-supervisor-detail.component";
import { CrudInvSupervisorListComponent } from "./crud-inv-supervisor-list/crud-inv-supervisor-list.component";

import { ArrayNamesPipe } from "shared/pipes";

@NgModule({
  declarations: [
    CrudInvSupervisorComponent,
    CrudInvSupervisorDetailComponent,
    CrudInvSupervisorListComponent,
    ArrayNamesPipe
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    // CrudModule,

    CrudInvSupervisorRoutingModule
  ]
})
export class CrudInvSupervisorModule {}
