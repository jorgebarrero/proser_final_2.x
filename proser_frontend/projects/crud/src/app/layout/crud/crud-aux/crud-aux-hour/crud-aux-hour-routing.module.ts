import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudAuxHourComponent } from './crud-aux-hour.component';

const routes: Routes = [
  {
      path: '', component: CrudAuxHourComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudAuxHourComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudAuxHourRoutingModule { }
