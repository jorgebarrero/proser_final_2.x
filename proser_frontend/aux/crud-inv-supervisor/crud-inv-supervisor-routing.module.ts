import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvSupervisorComponent } from './crud-inv-supervisor.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInvSupervisorComponent,
    children: [
      { path: '', redirectTo: 'menu' },
      { path: 'menu', component: CrudInvSupervisorComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class CrudInvSupervisorRoutingModule {}
