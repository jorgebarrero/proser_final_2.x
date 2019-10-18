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
        path: "audit-config",
        loadChildren: () =>
          import("./audit/audit-general/audit-config/audit-config.module").then(
            m => m.AuditConfigModule
          )
      },

      {
        path: "current-agents-report",
        loadChildren: () =>
          import(
            "./audit/data-reports/current-agents-report/current-agents-report.module"
          ).then(m => m.CurrentAgentsReportModule)
      },

      {
        path: "current-breaks-report",
        loadChildren: () =>
          import(
            "./audit/data-reports/current-breaks-report/current-breaks-report.module"
          ).then(m => m.CurrentBreaksReportModule)
      },

      {
        path: "current-calls-report",
        loadChildren: () =>
          import(
            "./audit/data-reports/current-calls-report/current-calls-report.module"
          ).then(m => m.CurrentCallsReportModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
