import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvQueueComponent } from './crud-inv-queue.component';

const routes: Routes = [
  {
    path: '',
    component: CrudInvQueueComponent,
    children: [
      { path: '', redirectTo: 'menu' },
      { path: 'menu', component: CrudInvQueueComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  })
export class CrudInvQueueRoutingModule {}
