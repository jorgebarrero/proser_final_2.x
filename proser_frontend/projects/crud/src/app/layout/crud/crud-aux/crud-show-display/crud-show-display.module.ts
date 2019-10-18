import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

import { AlertModule } from "shared/modules/alert/alert.module";
import { ExcelService } from "shared/services";

import { CrudShowDisplayRoutingModule } from "./crud-show-display-routing.module";
import { CrudShowDisplayComponent } from "./crud-show-display.component";
import { CrudShowDisplayListComponent } from "./crud-show-display-list/crud-show-display-list.component";
import { CrudShowDisplayDetailComponent } from "./crud-show-display-detail/crud-show-display-detail.component";

import { SharedPipesModule } from "shared/pipes/shared-pipes.module";

import { SelectorModule } from "shared/modules/selector/selector.module";

@NgModule({
  declarations: [
    CrudShowDisplayComponent,
    CrudShowDisplayListComponent,
    CrudShowDisplayDetailComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,

    SharedPipesModule,
    SelectorModule,

    CrudShowDisplayRoutingModule
  ]
})
export class CrudShowDisplayModule {}
