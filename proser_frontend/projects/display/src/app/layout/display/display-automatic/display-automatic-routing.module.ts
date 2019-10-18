import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DisplayAutomaticComponent } from "./display-automatic.component";

const routes: Routes = [
  {
    path: "",
    component: DisplayAutomaticComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayAutomaticRoutingModule {}
