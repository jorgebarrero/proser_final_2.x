import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

// //import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';

import { CrudHcbAgentRoutingModule } from './crud-hcb-agent-routing.module';
import { CrudHcbAgentComponent } from './crud-hcb-agent.component';
import { CrudHcbAgentDetailComponent } from './crud-hcb-agent-detail/crud-hcb-agent-detail.component';
import { CrudHcbAgentListComponent } from './crud-hcb-agent-list/crud-hcb-agent-list.component';

@NgModule({
  declarations: [CrudHcbAgentComponent, CrudHcbAgentDetailComponent, CrudHcbAgentListComponent],
  imports: [

    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    // CrudModule,
    CrudHcbAgentRoutingModule
  ]
})
export class CrudHcbAgentModule { }
