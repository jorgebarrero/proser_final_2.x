import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailReportComponent } from './detail-report.component';


const routes: Routes = [
  {
    path: "",
    component: DetailReportComponent,
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
export class DetailReportRoutingModule { }
