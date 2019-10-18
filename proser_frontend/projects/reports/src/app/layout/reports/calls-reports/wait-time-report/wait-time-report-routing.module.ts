import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WaitTimeReportComponent } from "./wait-time-report.component";

const routes: Routes = [
  {
    path: "",
    component: WaitTimeReportComponent,
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
export class WaitTimeReportRoutingModule {}
