import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardOutboundComponent } from "./dashboard-outbound.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardOutboundComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardOutboundRoutingModule {}
