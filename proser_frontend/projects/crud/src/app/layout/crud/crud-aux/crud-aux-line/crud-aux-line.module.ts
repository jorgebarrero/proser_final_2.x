import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

// //import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';

import { CrudAuxLineRoutingModule } from './crud-aux-line-routing.module';
import { CrudAuxLineComponent } from './crud-aux-line.component';
import { CrudAuxLineDetailComponent } from './crud-aux-line-detail/crud-aux-line-detail.component';
import { CrudAuxLineListComponent } from './crud-aux-line-list/crud-aux-line-list.component';

@NgModule({
  declarations: [CrudAuxLineComponent, CrudAuxLineDetailComponent, CrudAuxLineListComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    // CrudModule,
    CrudAuxLineRoutingModule
  ]
})
export class CrudAuxLineModule { }
