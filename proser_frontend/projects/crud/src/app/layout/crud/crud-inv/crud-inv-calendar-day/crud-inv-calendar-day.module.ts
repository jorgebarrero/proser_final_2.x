import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from 'shared/modules/alert/alert.module';
import { CrudInvCalendarDayRoutingModule } from './crud-inv-calendar-day-routing.module';
import { CrudInvCalendarDayComponent } from './crud-inv-calendar-day.component';
import { CrudInvCalendarDayListComponent } from './crud-inv-calendar-day-list/crud-inv-calendar-day-list.component';
import { CrudInvCalendarDayDetailComponent } from './crud-inv-calendar-day-detail/crud-inv-calendar-day-detail.component';

@NgModule({
  declarations: [
  CrudInvCalendarDayComponent,
  CrudInvCalendarDayListComponent,
  CrudInvCalendarDayDetailComponent,
  ],
  imports: [
  CommonModule,
  NgbModule,
  NgxDatatableModule,
  NgSelectModule,
  FormsModule,
  ReactiveFormsModule,
  AlertModule,
  // CrudModule,

  CrudInvCalendarDayRoutingModule,
  ],
  })
export class CrudInvCalendarDayModule {}
