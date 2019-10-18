import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvScheduleDayComponent } from './crud-inv-schedule-day.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInvScheduleDayComponent,
    children: [
      { path: '', redirectTo: 'menu' },
      { path: 'menu', component: CrudInvScheduleDayComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class CrudInvScheduleDayRoutingModule {}
