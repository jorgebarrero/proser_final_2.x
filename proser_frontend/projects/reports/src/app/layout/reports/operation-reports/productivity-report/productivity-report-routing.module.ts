import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductivityReportComponent } from "./productivity-report.component";

const routes: Routes = [
  {
    path: "",
    component: ProductivityReportComponent,
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
export class ProductivityReportRoutingModule {}
