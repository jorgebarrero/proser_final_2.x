import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CdrReportComponent } from "./cdr-report.component";

const routes: Routes = [
  {
    path: "",
    component: CdrReportComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdrReportRoutingModule {}
