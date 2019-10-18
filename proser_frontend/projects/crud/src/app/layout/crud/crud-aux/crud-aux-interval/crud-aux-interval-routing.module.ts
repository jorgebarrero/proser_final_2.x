import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudAuxIntervalComponent } from './crud-aux-interval.component';

const routes: Routes = [
  {
      path: '', component: CrudAuxIntervalComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudAuxIntervalComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudAuxIntervalRoutingModule { }
