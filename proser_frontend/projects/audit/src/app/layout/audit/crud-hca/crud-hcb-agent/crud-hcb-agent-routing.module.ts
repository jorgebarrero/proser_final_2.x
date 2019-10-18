import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudHcbAgentComponent } from './crud-hcb-agent.component';

const routes: Routes = [
  {
      path: '', component: CrudHcbAgentComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudHcbAgentComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudHcbAgentRoutingModule { }
