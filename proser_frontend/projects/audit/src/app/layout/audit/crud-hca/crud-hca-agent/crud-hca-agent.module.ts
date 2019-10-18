import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

// //import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';

import { CrudHcaAgentRoutingModule } from './crud-hca-agent-routing.module';
import { CrudHcaAgentComponent } from './crud-hca-agent.component';
import { CrudHcaAgentListComponent } from './crud-hca-agent-list/crud-hca-agent-list.component';

@NgModule({
  declarations: [CrudHcaAgentComponent, CrudHcaAgentListComponent],
  imports: [

    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    // CrudModule,
    CrudHcaAgentRoutingModule
  ]
})
export class CrudHcaAgentModule { }
