import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentAgentsReportComponent } from './current-agents-report.component';


const routes: Routes = [
  {
    path: "",
    component: CurrentAgentsReportComponent,
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
export class CurrentAgentsReportRoutingModule { }
