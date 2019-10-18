import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

import { AlertModule } from "shared/modules/alert/alert.module";
import { ExcelService } from "shared/services";

import { CrudAuxColorRoutingModule } from "./crud-aux-color-routing.module";
import { CrudAuxColorComponent } from "./crud-aux-color.component";
import { CrudAuxColorDetailComponent } from "./crud-aux-color-detail/crud-aux-color-detail.component";
import { CrudAuxColorListComponent } from "./crud-aux-color-list/crud-aux-color-list.component";

@NgModule({
  declarations: [
    CrudAuxColorComponent,
    CrudAuxColorDetailComponent,
    CrudAuxColorListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,


    CrudAuxColorRoutingModule
  ],
  providers: [ExcelService]
})
export class CrudAuxColorModule {}
