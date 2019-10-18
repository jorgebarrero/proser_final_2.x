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
        path: "audit-report",
        loadChildren: () =>
          import(
            "./reports/data-reports/audit-report/audit-report.module"
          ).then(m => m.AuditReportModule)
      },

      {
        path: "cdr-report",
        loadChildren: () =>
          import("./reports/data-reports/cdr-report/cdr-report.module").then(
            m => m.CdrReportModule
          )
      },

      {
        path: "call-entry-report",
        loadChildren: () =>
          import(
            "./reports/data-reports/call-entry-report/call-entry-report.module"
          ).then(m => m.CallEntryReportModule)
      },

      

      // --------------------------------------

      {
        path: "assignation-report",
        loadChildren: () =>
          import(
            "./reports/agents-reports/assignation-report/assignation-report.module"
          ).then(m => m.AssignationReportModule)
      },
      {
        path: "auxiliar-report",
        loadChildren: () =>
          import(
            "./reports/agents-reports/auxiliar-report/auxiliar-report.module"
          ).then(m => m.AuxiliarReportModule)
      },
      {
        path: "connection-report",
        loadChildren: () =>
          import(
            "./reports/agents-reports/connection-report/connection-report.module"
          ).then(m => m.ConnectionReportModule)
      },
      // ---------------------------------------
      {
        path: "detail-report",
        loadChildren: () =>
          import(
            "./reports/operation-reports/detail-report/detail-report.module"
          ).then(m => m.DetailReportModule)
      },
      {
        path: "productivity-report",
        loadChildren: () =>
          import(
            "./reports/operation-reports/productivity-report/productivity-report.module"
          ).then(m => m.ProductivityReportModule)
      },
      // ---------------------------------------
      {
        path: "abandoned-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/abandoned-report/abandoned-report.module"
          ).then(m => m.AbandonedReportModule)
      },
      {
        path: "automaitc-interval-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/automaitc-interval-report/automaitc-interval-report.module"
          ).then(m => m.AutomaitcIntervalReportModule)
      },
      {
        path: "automaitc-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/automaitc-report/automaitc-report.module"
          ).then(m => m.AutomaitcReportModule)
      },
      {
        path: "detail-calls-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/detail-report/detail-report.module"
          ).then(m => m.DetailReportModule)
      },
      {
        path: "inbound-interval-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/inbound-interval-report/inbound-interval-report.module"
          ).then(m => m.InboundIntervalReportModule)
      },
      {
        path: "inbound-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/inbound-report/inbound-report.module"
          ).then(m => m.InboundReportModule)
      },
      {
        path: "outbound-interval-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/outbound-interval-report/outbound-interval-report.module"
          ).then(m => m.OutboundIntervalReportModule)
      },
      {
        path: "outbound-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/outbound-report/outbound-report.module"
          ).then(m => m.OutboundReportModule)
      },
      {
        path: "wait-time-report",
        loadChildren: () =>
          import(
            "./reports/calls-reports/wait-time-report/wait-time-report.module"
          ).then(m => m.WaitTimeReportModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
