import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvScheduleComponent } from './crud-inv-schedule.component';

const routes: Routes = [
  {
      path: '', component: CrudInvScheduleComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvScheduleComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvScheduleRoutingModule { }
