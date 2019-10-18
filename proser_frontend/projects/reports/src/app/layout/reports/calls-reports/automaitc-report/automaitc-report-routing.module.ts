import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutomaitcReportComponent } from './automaitc-report.component';


const routes: Routes = [
  {
    path: "",
    component: AutomaitcReportComponent,
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
export class AutomaitcReportRoutingModule { }
