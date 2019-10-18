import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { AlertModule } from "shared/modules/alert/alert.module";

import { DatatableFinderModule } from "shared/modules";
import { DatatableRowsnumberModule } from "shared/modules";

import { CrudUserRoutingModule } from "./crud-userbase-routing.module";

// local modules
import { CrudUserbaseComponent } from "./crud-userbase.component";

import { CrudUserbaseListComponent } from "./crud-userbase-list/crud-userbase-list.component";
import { CrudUserbaseDetailComponent } from "./crud-userbase-detail/crud-userbase-detail.component";
import { CrudUserbaseHeaderComponent } from "./crud-userbase-header/crud-userbase-header.component";
import { CrudUserbaseHeaderButtonsComponent } from "./crud-userbase-header/crud-userbase-header-buttons/crud-userbase-header-buttons.component";

@NgModule({
  declarations: [
    CrudUserbaseComponent,
    CrudUserbaseListComponent,
    CrudUserbaseDetailComponent,
    CrudUserbaseHeaderComponent,
    CrudUserbaseHeaderButtonsComponent
  ],
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgSelectModule,
    AlertModule,

    DatatableFinderModule,
    DatatableRowsnumberModule,

    CrudUserRoutingModule
  ]
})
export class CrudUserbaseModule {}
