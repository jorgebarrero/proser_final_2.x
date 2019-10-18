import { registerLocaleData } from "@angular/common";
import localeEs from "@angular/common/locales/es";
registerLocaleData(localeEs, "es");
import { LOCALE_ID } from "@angular/core";

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AlertModule } from "shared/modules/alert/alert.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as Chart from "chart.js";
import * as ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartsModule as Ng2Charts } from "ng2-charts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";

import { SelectorModule } from "shared/modules/selector/selector.module";

import { DashboardHeaderModule } from "../../../shared/modules/dashboard-header/dashboard-header.module";

import { DashboardInboundRoutingModule } from "./dashboard-inbound-routing.module";
import { DashboardInboundComponent } from "./dashboard-inbound.component";
import { DashboardInboundListComponent } from "./dashboard-inbound-list/dashboard-inbound-list.component";
import { DashboardInboundGraphComponent } from "./dashboard-inbound-graph/dashboard-inbound-graph.component";
import { DashboardInboundCallsComponent } from "./dashboard-inbound-calls/dashboard-inbound-calls.component";

import { DashboardInboundLevelsComponent } from "./dashboard-inbound-levels/dashboard-inbound-levels.component";

import { DashboardInboundBreaksComponent } from "./dashboard-inbound-breaks/dashboard-inbound-breaks.component";
import { DashboardInboundBreaksAuxiliarComponent } from "./dashboard-inbound-breaks/dashboard-inbound-breaks-auxiliar/dashboard-inbound-breaks-auxiliar.component";
import { DashboardInboundBreaksAssignationsComponent } from "./dashboard-inbound-breaks/dashboard-inbound-breaks-assignations/dashboard-inbound-breaks-assignations.component";

import { DashboardInboundHighlightsComponent } from "./dashboard-inbound-highlights/dashboard-inbound-highlights.component";
import { DashboardInboundAgentsComponent } from "./dashboard-inbound-agents/dashboard-inbound-agents.component";
import { DashboardInboundAgentsPieComponent } from "./dashboard-inbound-agents/dashboard-inbound-agents-pie/dashboard-inbound-agents-pie.component";
import { DashboardInboundAgentsDistributionComponent } from "./dashboard-inbound-agents/dashboard-inbound-agents-distribution/dashboard-inbound-agents-distribution.component";

import { DashboardInboundHighlightsHistoricComponent } from "./dashboard-inbound-highlights-historic/dashboard-inbound-highlights-historic.component";
import { DashboardInboundBreaksHistoricComponent } from "./dashboard-inbound-breaks-historic/dashboard-inbound-breaks-historic.component";
import { DashboardInboundBreaksAuxiliarHistoricComponent } from "./dashboard-inbound-breaks-historic/dashboard-inbound-breaks-auxiliar-historic/dashboard-inbound-breaks-auxiliar-historic.component";
import { DashboardInboundBreaksAssignationsHistoricComponent } from "./dashboard-inbound-breaks-historic/dashboard-inbound-breaks-assignations-historic/dashboard-inbound-breaks-assignations-historic.component";
import { DashboardInboundAgentsHistoricComponent } from "./dashboard-inbound-agents-historic/dashboard-inbound-agents-historic.component";
import { DashboardInboundModalAgentsComponent } from "./dashboard-inbound-modals/dashboard-inbound-modal-agents/dashboard-inbound-modal-agents.component";
import { DashboardInboundModalCallsComponent } from "./dashboard-inbound-modals/dashboard-inbound-modal-calls/dashboard-inbound-modal-calls.component";
import { DashboardInboundModalTextComponent } from "./dashboard-inbound-modals/dashboard-inbound-modal-text/dashboard-inbound-modal-text.component";
import { SharedPipesModule } from "shared/pipes/shared-pipes.module";
import { DashboardInboundModalCurrentcallsComponent } from './dashboard-inbound-modals/dashboard-inbound-modal-currentcalls/dashboard-inbound-modal-currentcalls.component';
import { DaashboardInboundModalBreaksComponent } from './dashboard-inbound-modals/daashboard-inbound-modal-breaks/daashboard-inbound-modal-breaks.component';
import { DashboardInboundGroupsComponent } from './dashboard-inbound-groups/dashboard-inbound-groups.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DashboardInboundModalAgentsHistoricComponent } from './dashboard-inbound-modals/dashboard-inbound-modal-agents-historic/dashboard-inbound-modal-agents-historic.component';
import { DashboardInboundModalBreaksHistoricComponent } from './dashboard-inbound-modals/dashboard-inbound-modal-breaks-historic/dashboard-inbound-modal-breaks-historic.component';

@NgModule({
  declarations: [
    DashboardInboundComponent,
    DashboardInboundListComponent,
    DashboardInboundGraphComponent,
    DashboardInboundCallsComponent,
    DashboardInboundLevelsComponent,
    DashboardInboundBreaksComponent,
    DashboardInboundBreaksAuxiliarComponent,
    DashboardInboundBreaksAssignationsComponent,
    DashboardInboundHighlightsComponent,
    DashboardInboundAgentsComponent,
    DashboardInboundAgentsPieComponent,
    DashboardInboundAgentsDistributionComponent,
    DashboardInboundHighlightsHistoricComponent,
    DashboardInboundBreaksHistoricComponent,
    DashboardInboundBreaksAuxiliarHistoricComponent,
    DashboardInboundBreaksAssignationsHistoricComponent,
    DashboardInboundAgentsHistoricComponent,
    DashboardInboundModalAgentsComponent,
    DashboardInboundModalCallsComponent,
    DashboardInboundModalTextComponent,
    DashboardInboundModalCurrentcallsComponent,
    DaashboardInboundModalBreaksComponent,
    DashboardInboundGroupsComponent,
    DashboardInboundModalAgentsHistoricComponent,
    DashboardInboundModalBreaksHistoricComponent
  ],
  imports: [
    CommonModule,

    AlertModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    NgSelectModule,
    NgxDatatableModule,
    Ng2Charts,

    SharedPipesModule,

    SelectorModule,
    DashboardHeaderModule,

    FontAwesomeModule,

    DashboardInboundRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }]
})
export class DashboardInboundModule {}
