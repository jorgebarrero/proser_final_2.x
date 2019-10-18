import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvAgentComponent } from './crud-inv-agent.component';

const routes: Routes = [
  {
      path: '', component: CrudInvAgentComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvAgentComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvAgentRoutingModule { }
