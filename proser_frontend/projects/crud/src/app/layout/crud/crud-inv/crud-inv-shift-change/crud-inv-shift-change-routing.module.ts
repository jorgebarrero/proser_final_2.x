import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudInvShiftChangeComponent } from './crud-inv-shift-change.component';

const routes: Routes = [
  {
      path: '', component: CrudInvShiftChangeComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvShiftChangeComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvShiftChangeRoutingModule { }
