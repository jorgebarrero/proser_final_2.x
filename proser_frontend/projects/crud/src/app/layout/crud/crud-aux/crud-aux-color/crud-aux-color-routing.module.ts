import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudAuxColorComponent } from './crud-aux-color.component';

const routes: Routes = [
  {
      path: '', component: CrudAuxColorComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudAuxColorComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudAuxColorRoutingModule { }
