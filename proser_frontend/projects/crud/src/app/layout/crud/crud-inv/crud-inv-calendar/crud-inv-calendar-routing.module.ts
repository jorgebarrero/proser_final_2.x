import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvCalendarComponent } from './crud-inv-calendar.component';

const routes: Routes = [
  {
      path: '', component: CrudInvCalendarComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvCalendarComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvCalendarRoutingModule { }
