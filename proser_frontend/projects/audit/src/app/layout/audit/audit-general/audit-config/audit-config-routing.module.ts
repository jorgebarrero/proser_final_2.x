import { AuditConfigEnvComponent } from "./audit-config-env/audit-config-env.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuditConfigComponent } from "./audit-config.component";

const routes: Routes = [
  {
    path: "",
    component: AuditConfigComponent,
    children: [
      { path: "", redirectTo: "menu" },
      { path: "menu", component: AuditConfigComponent },
      { path: "config-env", component: AuditConfigEnvComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditConfigRoutingModule {}
