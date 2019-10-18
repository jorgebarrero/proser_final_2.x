import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CurrentCallsReportComponent } from "./current-calls-report.component";

const routes: Routes = [
  {
    path: "",
    component: CurrentCallsReportComponent,
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
export class CurrentCallsReportRoutingModule {}
