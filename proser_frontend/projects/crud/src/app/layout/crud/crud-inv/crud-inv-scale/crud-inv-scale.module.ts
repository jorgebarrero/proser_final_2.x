import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvScaleRoutingModule } from "./crud-inv-scale-routing.module";
import { CrudInvScaleComponent } from "./crud-inv-scale.component";
import { CrudInvScaleDetailComponent } from "./crud-inv-scale-detail/crud-inv-scale-detail.component";
import { CrudInvScaleListComponent } from "./crud-inv-scale-list/crud-inv-scale-list.component";

@NgModule({
  declarations: [
    CrudInvScaleComponent,
    CrudInvScaleDetailComponent,
    CrudInvScaleListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvScaleRoutingModule
  ]
})
export class CrudInvScaleModule {}
