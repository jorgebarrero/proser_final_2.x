import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudHcaAgentComponent } from './crud-hca-agent.component';

const routes: Routes = [
  {
      path: '', component: CrudHcaAgentComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudHcaAgentComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudHcaAgentRoutingModule { }
