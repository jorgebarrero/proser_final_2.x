import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InboundReportComponent } from './inbound-report.component';


const routes: Routes = [
  {
    path: "",
    component: InboundReportComponent,
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
export class InboundReportRoutingModule { }
