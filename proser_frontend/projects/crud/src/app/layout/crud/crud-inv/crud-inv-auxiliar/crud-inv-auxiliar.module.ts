import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvAuxiliarRoutingModule } from "./crud-inv-auxiliar-routing.module";
import { CrudInvAuxiliarComponent } from "./crud-inv-auxiliar.component";
import { CrudInvAuxiliarDetailComponent } from "./crud-inv-auxiliar-detail/crud-inv-auxiliar-detail.component";
import { CrudInvAuxiliarListComponent } from "./crud-inv-auxiliar-list/crud-inv-auxiliar-list.component";

@NgModule({
  declarations: [
    CrudInvAuxiliarComponent,
    CrudInvAuxiliarDetailComponent,
    CrudInvAuxiliarListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvAuxiliarRoutingModule
  ]
})
export class CrudInvAuxiliarModule {}
