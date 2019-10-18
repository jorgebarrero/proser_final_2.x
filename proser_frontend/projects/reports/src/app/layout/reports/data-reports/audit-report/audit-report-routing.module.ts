import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuditReportComponent } from "./audit-report.component";
import { AuditReportListComponent } from "./audit-report-list/audit-report-list.component";

const routes: Routes = [
  {
    path: "",
    component: AuditReportComponent,
    children: [
      // { path: "", redirectTo: "list" },
      // { path: "list", component: AuditReportListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditReportRoutingModule {}
