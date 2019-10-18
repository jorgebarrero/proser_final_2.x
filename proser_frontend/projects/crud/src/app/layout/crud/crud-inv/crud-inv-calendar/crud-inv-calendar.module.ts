import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';

import { CrudInvCalendarRoutingModule } from './crud-inv-calendar-routing.module';
import { CrudInvCalendarComponent } from './crud-inv-calendar.component';
import { CrudInvCalendarDetailComponent } from './crud-inv-calendar-detail/crud-inv-calendar-detail.component';
import { CrudInvCalendarListComponent } from './crud-inv-calendar-list/crud-inv-calendar-list.component';

@NgModule({
  declarations: [
  CrudInvCalendarComponent,
  CrudInvCalendarDetailComponent,
  CrudInvCalendarListComponent,
  ],
  imports: [
  CommonModule,
  NgxDatatableModule,
  NgSelectModule,
  FormsModule,
  ReactiveFormsModule,
  AlertModule,
  // CrudModule,
  CrudInvCalendarRoutingModule,
  ],
  })
export class CrudInvCalendarModule {}
