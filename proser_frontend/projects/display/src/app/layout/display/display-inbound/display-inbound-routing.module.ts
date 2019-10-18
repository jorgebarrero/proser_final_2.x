import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DisplayInboundComponent } from "./display-inbound.component";

const routes: Routes = [
  {
    path: "",
    component: DisplayInboundComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayInboundRoutingModule {}

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
