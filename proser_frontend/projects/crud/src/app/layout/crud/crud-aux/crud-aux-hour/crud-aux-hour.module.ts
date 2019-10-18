import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

// //import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';



import { CrudAuxHourRoutingModule } from './crud-aux-hour-routing.module';
import { CrudAuxHourComponent } from './crud-aux-hour.component';
import { CrudAuxHourDetailComponent } from './crud-aux-hour-detail/crud-aux-hour-detail.component';
import { CrudAuxHourListComponent } from './crud-aux-hour-list/crud-aux-hour-list.component';

@NgModule({
  declarations: [CrudAuxHourComponent, CrudAuxHourDetailComponent, CrudAuxHourListComponent],
  imports: [
    
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    // CrudModule,
    CrudAuxHourRoutingModule
  ]
})
export class CrudAuxHourModule { }
