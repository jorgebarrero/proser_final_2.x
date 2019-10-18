import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudInvCampaignComponent } from './crud-inv-campaign.component';

const routes: Routes = [
  {
      path: '', component: CrudInvCampaignComponent,
      children: [
        { path: '', redirectTo: 'menu' },
        { path: 'menu', component: CrudInvCampaignComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudInvCampaignRoutingModule { }
