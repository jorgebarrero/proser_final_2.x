import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvAuxiliarComponent } from './crud-inv-auxiliar.component';

const routes: Routes = [
  {
      path: '', component: CrudInvAuxiliarComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvAuxiliarComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvAuxiliarRoutingModule { }
