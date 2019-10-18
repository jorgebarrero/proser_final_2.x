import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutboundReportComponent } from './outbound-report.component';


const routes: Routes = [
  {
    path: "",
    component: OutboundReportComponent,
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
export class OutboundReportRoutingModule { }
