import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowComponent } from "./show.component";

import { ShowIntroComponent } from "./show-intro/show-intro.component";
import { ShowInboundComponent } from "./show-inbound/show-inbound.component";

const routes: Routes = [
  {
    path: "",
    component: ShowComponent,
    children: [
      { path: "", redirectTo: "show-inbound" },

      { path: "show-intro", component: ShowIntroComponent },

      {
        path: "show-inbound",
        component: ShowInboundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule {}
