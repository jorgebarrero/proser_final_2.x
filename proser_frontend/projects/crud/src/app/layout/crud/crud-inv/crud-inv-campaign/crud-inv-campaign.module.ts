import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvCampaignRoutingModule } from "./crud-inv-campaign-routing.module";
import { CrudInvCampaignComponent } from "./crud-inv-campaign.component";
import { CrudInvCampaignDetailComponent } from "./crud-inv-campaign-detail/crud-inv-campaign-detail.component";
import { CrudInvCampaignListComponent } from "./crud-inv-campaign-list/crud-inv-campaign-list.component";

@NgModule({
  declarations: [
    CrudInvCampaignComponent,
    CrudInvCampaignDetailComponent,
    CrudInvCampaignListComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    //  CrudModule,
    CrudInvCampaignRoutingModule
  ]
})
export class CrudInvCampaignModule {}
