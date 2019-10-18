import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutboundIntervalReportComponent } from './outbound-interval-report.component';


const routes: Routes = [
  {
    path: "",
    component: OutboundIntervalReportComponent,
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
export class OutboundIntervalReportRoutingModule { }
