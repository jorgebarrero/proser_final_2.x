import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvAssignationComponent } from './crud-inv-assignation.component';

const routes: Routes = [
  {
      path: '', component: CrudInvAssignationComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvAssignationComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvAssignationRoutingModule { }
