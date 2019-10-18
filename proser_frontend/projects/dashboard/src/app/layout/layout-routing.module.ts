import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
// import { IntroComponent } from "./intro/intro.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { 
        path: "layout",
        component: LayoutComponent
      },
      {
        path: "dashboard-inbound",
        loadChildren: () =>
          import("./dashboard/dashboard-inbound/dashboard-inbound.module").then(
            m => m.DashboardInboundModule
          )
      },
      {
        path: "dashboard-outbound",
        loadChildren: () =>
          import("./dashboard/dashboard-outbound/dashboard-outbound.module").then(
            m => m.DashboardOutboundModule
          )
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
