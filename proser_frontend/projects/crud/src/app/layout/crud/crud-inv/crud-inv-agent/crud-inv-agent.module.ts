import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvAgentRoutingModule } from "./crud-inv-agent-routing.module";
import { CrudInvAgentComponent } from "./crud-inv-agent.component";
import { CrudInvAgentDetailComponent } from "./crud-inv-agent-detail/crud-inv-agent-detail.component";
import { CrudInvAgentListComponent } from "./crud-inv-agent-list/crud-inv-agent-list.component";
import { FormatPipesModule } from "projects/crud/src/app/shared/modules/";

@NgModule({
  declarations: [
    CrudInvAgentComponent,
    CrudInvAgentDetailComponent,
    CrudInvAgentListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,

    FormatPipesModule,

    CrudInvAgentRoutingModule
  ]
})
export class CrudInvAgentModule {}
