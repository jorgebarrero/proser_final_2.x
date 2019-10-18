import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvAgentRoleRoutingModule } from "./crud-inv-agent-role-routing.module";

import { CrudInvAgentRoleComponent } from "./crud-inv-agent-role.component";
import { CrudInvAgentRoleListComponent } from "./crud-inv-agent-role-list/crud-inv-agent-role-list.component";
import { CrudInvAgentRoleDetailComponent } from "./crud-inv-agent-role-detail/crud-inv-agent-role-detail.component";

@NgModule({
  declarations: [
    CrudInvAgentRoleComponent,
    CrudInvAgentRoleListComponent,
    CrudInvAgentRoleDetailComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,

    CrudInvAgentRoleRoutingModule
  ]
})
export class CrudInvAgentRoleModule {}
