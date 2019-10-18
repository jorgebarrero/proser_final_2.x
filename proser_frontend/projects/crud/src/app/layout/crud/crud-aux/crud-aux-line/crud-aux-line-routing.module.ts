import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudAuxLineComponent } from './crud-aux-line.component';

const routes: Routes = [
  {
      path: '', component: CrudAuxLineComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudAuxLineComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudAuxLineRoutingModule { }
