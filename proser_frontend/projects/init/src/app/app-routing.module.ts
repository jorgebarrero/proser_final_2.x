import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "shared/guards";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ByeComponent } from "./home/bye/bye.component";

import { RedirectModule } from "shared/modules/redirect/redirect.module";

import { App1SharedModule } from "projects/app1/src/app/app.module";
import { AuditSharedModule } from "projects/audit/src/app/app.module";
import { CrudSharedModule } from "projects/crud/src/app/app.module";
import { DashboardSharedModule } from "projects/dashboard/src/app/app.module";

import { DisplaySharedModule } from "projects/display/src/app/app.module";
import { ReportSharedModule } from "projects/reports/src/app/app.module";
import { ShowSharedModule } from "projects/show/src/app/app.module";
import { SmsSharedModule } from "projects/sms/src/app/app.module";
import { SystemSharedModule } from "projects/system/src/app/app.module";

import { UserSharedModule } from "projects/user/src/app/app.module";

const routes: Routes = [
  { path: "", redirectTo: "init/home", pathMatch: "full" },
  { path: "init/home", component: HomeComponent },
  { path: "init/bye", component: ByeComponent },

  {
    path: "redirect",
    loadChildren: () =>
      import("shared/modules/redirect/redirect.module").then(
        m => m.RedirectModule
      )
  },

  /*** APPLICATION PROJECTS ************************************************* */

  // NAVIGATE TO APP1
  {
    path: "app1",
    loadChildren: () =>
      import("projects/app1/src/app/app.module").then(m => m.App1SharedModule)
  },

  // NAVIGATE TO AUDIT
  {
    path: "audit",
    loadChildren: () =>
      import("projects/audit/src/app/app.module").then(m => m.AuditSharedModule)
  },

  // NAVIGATE TO CRUD
  {
    path: "crud",
    loadChildren: () =>
      import("projects/crud/src/app/app.module").then(m => m.CrudSharedModule)
  },

  // NAVIGATE TO DASHBOARD
  {
    path: "dashboard",
    loadChildren: () =>
      import("projects/dashboard/src/app/app.module").then(
        m => m.DashboardSharedModule
      )
  },

  // NAVIGATE TO DISPLAY
  {
    path: "display",
    loadChildren: () =>
      import("projects/display/src/app/app.module").then(
        m => m.DisplaySharedModule
      )
  },

  // NAVIGATE TO REPORTS
  {
    path: "reports",
    loadChildren: () =>
      import("projects/reports/src/app/app.module").then(
        m => m.ReportSharedModule
      )
  },

  // NAVIGATE TO SHOW
  {
    path: "show",
    loadChildren: () =>
      import("projects/show/src/app/app.module").then(m => m.ShowSharedModule)
  },

    // NAVIGATE TO SMS
    {
      path: "sms",
      loadChildren: () =>
        import("projects/sms/src/app/app.module").then(m => m.SmsSharedModule)
    },

  // NAVIGATE TO SYSTEM
  {
    path: "system",
    loadChildren: () =>
      import("projects/system/src/app/app.module").then(
        m => m.SystemSharedModule
      )
  },

  // NAVIGATE TO USER
  {
    path: "user",
    loadChildren: () =>
      import("projects/user/src/app/app.module").then(m => m.UserSharedModule)
  },

  /********************************************************* */

  // NAVIGATE TO NOT FOUND PAGE
  { path: "**", redirectTo: "not-found" }
];

@NgModule({
  // declarations: [AccessdeniedComponent, NotfoundComponent, ErrorComponent],
  imports: [
    RouterModule.forRoot(routes),
    RedirectModule,

    AuditSharedModule.forRoot(),
    CrudSharedModule.forRoot(),
    DashboardSharedModule.forRoot(),

    DisplaySharedModule.forRoot(),
    ReportSharedModule.forRoot(),
    ShowSharedModule.forRoot(),
    SmsSharedModule.forRoot(),

    SystemSharedModule.forRoot(),

    UserSharedModule.forRoot(),

    App1SharedModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
