import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallEntryReportComponent } from './call-entry-report.component';


const routes: Routes = [
  {
    path: "",
    component: CallEntryReportComponent,
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
export class CallEntryReportRoutingModule { }
