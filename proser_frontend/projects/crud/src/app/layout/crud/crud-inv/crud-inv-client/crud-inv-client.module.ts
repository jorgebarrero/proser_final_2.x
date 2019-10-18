import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvClientRoutingModule } from "./crud-inv-client-routing.module";
import { CrudInvClientComponent } from "./crud-inv-client.component";
import { CrudInvClientDetailComponent } from "./crud-inv-client-detail/crud-inv-client-detail.component";
import { CrudInvClientListComponent } from "./crud-inv-client-list/crud-inv-client-list.component";

@NgModule({
  declarations: [
    CrudInvClientComponent,
    CrudInvClientDetailComponent,
    CrudInvClientListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvClientRoutingModule
  ]
})
export class CrudInvClientModule {}
