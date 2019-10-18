import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvQueueRoutingModule } from "./crud-inv-queue-routing.module";
import { CrudInvQueueComponent } from "./crud-inv-queue.component";
import { CrudInvQueueDetailComponent } from "./crud-inv-queue-detail/crud-inv-queue-detail.component";
import { CrudInvQueueListComponent } from "./crud-inv-queue-list/crud-inv-queue-list.component";

import { SharedPipesModule } from "shared/pipes/shared-pipes.module";
@NgModule({
  declarations: [
    CrudInvQueueComponent,
    CrudInvQueueDetailComponent,
    CrudInvQueueListComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    SharedPipesModule,

    CrudInvQueueRoutingModule
  ]
})
export class CrudInvQueueModule {}
