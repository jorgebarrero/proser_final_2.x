import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DisplayOutboundComponent } from "./display-outbound.component";

const routes: Routes = [
  {
    path: "",
    component: DisplayOutboundComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayOutboundRoutingModule {}
