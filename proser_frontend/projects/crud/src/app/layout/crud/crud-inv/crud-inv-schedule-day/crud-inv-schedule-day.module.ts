import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';

import { CrudInvScheduleDayRoutingModule } from './crud-inv-schedule-day-routing.module';
import { CrudInvScheduleDayComponent } from './crud-inv-schedule-day.component';
import { CrudInvScheduleDayDetailComponent } from './crud-inv-schedule-day-detail/crud-inv-schedule-day-detail.component';
import { CrudInvScheduleDayListComponent } from './crud-inv-schedule-day-list/crud-inv-schedule-day-list.component';

@NgModule({
  declarations: [
  CrudInvScheduleDayComponent,
  CrudInvScheduleDayDetailComponent,
  CrudInvScheduleDayListComponent,
  ],
  imports: [
  CommonModule,
  NgxDatatableModule,
  NgSelectModule,
  FormsModule,
  ReactiveFormsModule,
  AlertModule,
  // CrudModule,

  CrudInvScheduleDayRoutingModule,
  ],
  })
export class CrudInvScheduleDayModule {}
