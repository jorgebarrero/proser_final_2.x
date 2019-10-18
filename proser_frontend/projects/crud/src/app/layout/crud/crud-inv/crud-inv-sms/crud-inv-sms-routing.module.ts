import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvSmsComponent } from './crud-inv-sms.component';

const routes: Routes = [
  {
      path: '', component: CrudInvSmsComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvSmsComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvSmsRoutingModule { }
