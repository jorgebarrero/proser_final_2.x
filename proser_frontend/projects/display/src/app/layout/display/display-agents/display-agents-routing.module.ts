import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DisplayAgentsComponent } from "./display-agents.component";

const routes: Routes = [
  {
    path: "",
    component: DisplayAgentsComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayAgentsRoutingModule {}
