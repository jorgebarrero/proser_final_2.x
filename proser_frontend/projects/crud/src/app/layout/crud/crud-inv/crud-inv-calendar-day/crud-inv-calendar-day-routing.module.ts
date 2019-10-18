import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvCalendarDayComponent } from './crud-inv-calendar-day.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInvCalendarDayComponent,
    children: [
      { path: '', redirectTo: 'menu' },
      { path: 'menu', component: CrudInvCalendarDayComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class CrudInvCalendarDayRoutingModule {}
