import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentBreaksReportComponent } from './current-breaks-report.component';


const routes: Routes = [
  {
    path: "",
    component: CurrentBreaksReportComponent,
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
export class CurrentBreaksReportRoutingModule { }
