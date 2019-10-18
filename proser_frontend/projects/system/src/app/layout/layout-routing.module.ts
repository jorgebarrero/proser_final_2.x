import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "system",
        loadChildren: () =>
          import("./system/system.module").then(m => m.SystemModule)
      },

      {
        path: "crud-userbase",
        loadChildren: () =>
          import("./system/crud-userbase/crud-userbase.module").then(
            m => m.CrudUserbaseModule
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
