import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvServiceRoutingModule } from "./crud-inv-service-routing.module";
import { CrudInvServiceComponent } from "./crud-inv-service.component";
import { CrudInvServiceDetailComponent } from "./crud-inv-service-detail/crud-inv-service-detail.component";
import { CrudInvServiceListComponent } from "./crud-inv-service-list/crud-inv-service-list.component";

@NgModule({
  declarations: [
    CrudInvServiceComponent,
    CrudInvServiceDetailComponent,
    CrudInvServiceListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvServiceRoutingModule
  ]
})
export class CrudInvServiceModule {}
