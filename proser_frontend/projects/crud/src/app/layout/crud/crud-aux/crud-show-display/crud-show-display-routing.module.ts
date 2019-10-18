import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CrudShowDisplayComponent } from "./crud-show-display.component";

const routes: Routes = [
  {
    path: "",
    component: CrudShowDisplayComponent,
    children: [
      { path: "", redirectTo: "menu" },
      { path: "menu", component: CrudShowDisplayComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudShowDisplayRoutingModule {}
