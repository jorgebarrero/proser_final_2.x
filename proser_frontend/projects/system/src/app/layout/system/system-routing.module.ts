import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SystemComponent } from "./system.component";
import { SystemIntroComponent } from "./system-intro/system-intro.component";
import { SystemPm2Component } from "./system-pm2/system-pm2.component";

const routes: Routes = [
  {
    path: "",
    component: SystemComponent,
    children: [
      { path: "", redirectTo: "system-intro" },
      { path: "system-intro", component: SystemIntroComponent },

      {
        path: "system-pm2",
        component: SystemPm2Component
      },

      {
        path: "login",
        component: SystemComponent
      },

      {
        path: "system-user",
        loadChildren: () =>
          import("./system-user/system-user.module").then(
            m => m.SystemUserModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
