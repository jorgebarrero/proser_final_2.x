import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuditComponent } from "./audit.component";
import { AuditIntroComponent } from "./audit-intro/audit-intro.component";

const routes: Routes = [
  {
    path: "",
    component: AuditComponent,
    children: [
      { path: "", redirectTo: "audit-intro" },
      { path: "audit-intro", component: AuditIntroComponent },

      {
        path: "audit-config",
        loadChildren: () =>
          import("./audit-general/audit-config/audit-config.module").then(
            m => m.AuditConfigModule
          )
      },

      {
        path: "crud-hca-agent",
        loadChildren: () =>
          import("./crud-hca/crud-hca-agent/crud-hca-agent.module").then(
            m => m.CrudHcaAgentModule
          )
      },

      {
        path: "crud-hcb-agent",
        loadChildren: () =>
          import("./crud-hca/crud-hcb-agent/crud-hcb-agent.module").then(
            m => m.CrudHcbAgentModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditRoutingModule {}
