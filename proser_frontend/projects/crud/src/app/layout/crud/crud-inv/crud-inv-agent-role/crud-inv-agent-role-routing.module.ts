import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvAgentRoleComponent } from './crud-inv-agent-role.component';




const routes: Routes = [
  {
      path: '', component: CrudInvAgentRoleComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvAgentRoleComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvAgentRoleRoutingModule { }
