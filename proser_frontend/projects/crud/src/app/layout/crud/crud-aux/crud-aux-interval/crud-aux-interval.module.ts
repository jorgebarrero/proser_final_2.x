import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

// //import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';

import { CrudAuxIntervalRoutingModule } from './crud-aux-interval-routing.module';
import { CrudAuxIntervalComponent } from './crud-aux-interval.component';
import { CrudAuxIntervalDetailComponent } from './crud-aux-interval-detail/crud-aux-interval-detail.component';
import { CrudAuxIntervalListComponent } from './crud-aux-interval-list/crud-aux-interval-list.component';

@NgModule({
  declarations: [CrudAuxIntervalComponent, CrudAuxIntervalDetailComponent, CrudAuxIntervalListComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    // CrudModule,

    CrudAuxIntervalRoutingModule
  ]
})
export class CrudAuxIntervalModule { }
