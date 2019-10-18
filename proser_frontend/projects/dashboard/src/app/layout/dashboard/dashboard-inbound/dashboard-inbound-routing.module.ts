import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardInboundComponent } from "./dashboard-inbound.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardInboundComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardInboundRoutingModule {}

/*

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignationReportComponent } from './assignation-report.component';



const routes: Routes = [
  {
    path: "",
    component: AssignationReportComponent,
    children: [
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

*/
