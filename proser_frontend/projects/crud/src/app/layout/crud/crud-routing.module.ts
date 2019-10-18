import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CrudIntroComponent } from "./crud-intro/crud-intro.component";
import { CrudComponent } from "./crud.component";

const routes: Routes = [
  {
    path: "",
    component: CrudComponent,
    children: [
      { path: "", redirectTo: "crud-intro" },
      { path: "crud-intro", component: CrudIntroComponent },

      {
        path: "crud-inv-agent-role",
        loadChildren: () =>
          import(
            "./crud-inv/crud-inv-agent-role/crud-inv-agent-role.module"
          ).then(m => m.CrudInvAgentRoleModule)
      },

      {
        path: "crud-inv-agent",
        loadChildren: () =>
          import("./crud-inv/crud-inv-agent/crud-inv-agent.module").then(
            m => m.CrudInvAgentModule
          )
      },

      {
        path: "crud-inv-shift-change",
        loadChildren: () =>
          import(
            "./crud-inv/crud-inv-shift-change/crud-inv-shift-change.module"
          ).then(m => m.CrudInvShiftChangeModule)
      },

      {
        path: "crud-inv-supervisor",
        loadChildren: () =>
          import(
            "./crud-inv/crud-inv-supervisor/crud-inv-supervisor.module"
          ).then(m => m.CrudInvSupervisorModule)
      },

      {
        path: "crud-inv-schedule",
        loadChildren: () =>
          import("./crud-inv/crud-inv-schedule/crud-inv-schedule.module").then(
            m => m.CrudInvScheduleModule
          )
      },

      {
        path: "crud-inv-schedule-day",
        loadChildren: () =>
          import(
            "./crud-inv/crud-inv-schedule-day/crud-inv-schedule-day.module"
          ).then(m => m.CrudInvScheduleDayModule)
      },

      {
        path: "crud-inv-queue",
        loadChildren: () =>
          import("./crud-inv/crud-inv-queue/crud-inv-queue.module").then(
            m => m.CrudInvQueueModule
          )
      },

      {
        path: "crud-inv-calendar",
        loadChildren: () =>
          import("./crud-inv/crud-inv-calendar/crud-inv-calendar.module").then(
            m => m.CrudInvCalendarModule
          )
      },

      {
        path: "crud-inv-calendar-day",
        loadChildren: () =>
          import(
            "./crud-inv/crud-inv-calendar-day/crud-inv-calendar-day.module"
          ).then(m => m.CrudInvCalendarDayModule)
      },

      {
        path: "crud-inv-client",
        loadChildren: () =>
          import("./crud-inv/crud-inv-client/crud-inv-client.module").then(
            m => m.CrudInvClientModule
          )
      },

      {
        path: "crud-inv-auxiliar",
        loadChildren: () =>
          import("./crud-inv/crud-inv-auxiliar/crud-inv-auxiliar.module").then(
            m => m.CrudInvAuxiliarModule
          )
      },

      {
        path: "crud-inv-assignation",
        loadChildren: () =>
          import(
            "./crud-inv/crud-inv-assignation/crud-inv-assignation.module"
          ).then(m => m.CrudInvAssignationModule)
      },

      {
        path: "crud-inv-campaign",
        loadChildren: () =>
          import("./crud-inv/crud-inv-campaign/crud-inv-campaign.module").then(
            m => m.CrudInvCampaignModule
          )
      },

      {
        path: "crud-inv-service",
        loadChildren: () =>
          import("./crud-inv/crud-inv-service/crud-inv-service.module").then(
            m => m.CrudInvServiceModule
          )
      },

      {
        path: "crud-inv-scale",
        loadChildren: () =>
          import("./crud-inv/crud-inv-scale/crud-inv-scale.module").then(
            m => m.CrudInvScaleModule
          )
      },

      {
        path: "crud-inv-sms",
        loadChildren: () =>
          import("./crud-inv/crud-inv-sms/crud-inv-sms.module").then(
            m => m.CrudInvSmsModule
          )
      },

      {
        path: "crud-show-display",
        loadChildren: () =>
          import("./crud-aux/crud-show-display/crud-show-display.module").then(
            m => m.CrudShowDisplayModule
          )
      },

      {
        path: "crud-aux-color",
        loadChildren: () =>
          import("./crud-aux/crud-aux-color/crud-aux-color.module").then(
            m => m.CrudAuxColorModule
          )
      },

      {
        path: "crud-aux-hour",
        loadChildren: () =>
          import("./crud-aux/crud-aux-hour/crud-aux-hour.module").then(
            m => m.CrudAuxHourModule
          )
      },

      {
        path: "crud-aux-interval",
        loadChildren: () =>
          import("./crud-aux/crud-aux-interval/crud-aux-interval.module").then(
            m => m.CrudAuxIntervalModule
          )
      },

      {
        path: "crud-aux-line",
        loadChildren: () =>
          import("./crud-aux/crud-aux-line/crud-aux-line.module").then(
            m => m.CrudAuxLineModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule {}
