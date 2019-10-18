import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

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
        path: "display-inbound",
        loadChildren: () =>
          import("./display/display-inbound/display-inbound.module").then(
            m => m.DisplayInboundModule
          )
      },
      {
        path: "display-outbound",
        loadChildren: () =>
          import("./display/display-outbound/display-outbound.module").then(
            m => m.DisplayOutboundModule
          )
      },
      {
        path: "display-automatic",
        loadChildren: () =>
          import("./display/display-automatic/display-automatic.module").then(
            m => m.DisplayAutomaticModule
          )
      },
      {
        path: "display-agents",
        loadChildren: () =>
          import("./display/display-agents/display-agents.module").then(
            m => m.DisplayAgentsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
