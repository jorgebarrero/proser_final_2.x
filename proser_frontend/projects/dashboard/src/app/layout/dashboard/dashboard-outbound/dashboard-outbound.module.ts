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

import { DashboardOutboundRoutingModule } from "./dashboard-outbound-routing.module";
import { DashboardOutboundComponent } from "./dashboard-outbound.component";
import { DashboardOutboundListComponent } from "./dashboard-outbound-list/dashboard-outbound-list.component";
import { DashboardOutboundGraphComponent } from "./dashboard-outbound-graph/dashboard-outbound-graph.component";
import { DashboardOutboundCallsComponent } from "./dashboard-outbound-calls/dashboard-outbound-calls.component";

import { DashboardOutboundLevelsComponent } from "./dashboard-outbound-levels/dashboard-outbound-levels.component";

import { DashboardOutboundBreaksComponent } from "./dashboard-outbound-breaks/dashboard-outbound-breaks.component";
import { DashboardOutboundBreaksAuxiliarComponent } from "./dashboard-outbound-breaks/dashboard-outbound-breaks-auxiliar/dashboard-outbound-breaks-auxiliar.component";
import { DashboardOutboundBreaksAssignationsComponent } from "./dashboard-outbound-breaks/dashboard-outbound-breaks-assignations/dashboard-outbound-breaks-assignations.component";

import { DashboardOutboundHighlightsComponent } from "./dashboard-outbound-highlights/dashboard-outbound-highlights.component";
import { DashboardOutboundAgentsComponent } from "./dashboard-outbound-agents/dashboard-outbound-agents.component";
import { DashboardOutboundAgentsPieComponent } from "./dashboard-outbound-agents/dashboard-outbound-agents-pie/dashboard-outbound-agents-pie.component";
import { DashboardOutboundAgentsDistributionComponent } from "./dashboard-outbound-agents/dashboard-outbound-agents-distribution/dashboard-outbound-agents-distribution.component";

import { DashboardOutboundHighlightsHistoricComponent } from "./dashboard-outbound-highlights-historic/dashboard-outbound-highlights-historic.component";
import { DashboardOutboundBreaksHistoricComponent } from "./dashboard-outbound-breaks-historic/dashboard-outbound-breaks-historic.component";
import { DashboardOutboundBreaksAuxiliarHistoricComponent } from "./dashboard-outbound-breaks-historic/dashboard-outbound-breaks-auxiliar-historic/dashboard-outbound-breaks-auxiliar-historic.component";
import { DashboardOutboundBreaksAssignationsHistoricComponent } from "./dashboard-outbound-breaks-historic/dashboard-outbound-breaks-assignations-historic/dashboard-outbound-breaks-assignations-historic.component";
import { DashboardOutboundAgentsHistoricComponent } from "./dashboard-outbound-agents-historic/dashboard-outbound-agents-historic.component";
import { DashboardOutboundModalAgentsComponent } from "./dashboard-outbound-modals/dashboard-outbound-modal-agents/dashboard-outbound-modal-agents.component";
import { DashboardOutboundModalCallsComponent } from "./dashboard-outbound-modals/dashboard-outbound-modal-calls/dashboard-outbound-modal-calls.component";
import { DashboardOutboundModalTextComponent } from "./dashboard-outbound-modals/dashboard-outbound-modal-text/dashboard-outbound-modal-text.component";
import { SharedPipesModule } from "shared/pipes/shared-pipes.module";
import { DashboardOutboundModalCurrentcallsComponent } from './dashboard-outbound-modals/dashboard-outbound-modal-currentcalls/dashboard-outbound-modal-currentcalls.component';
import { DaashboardOutboundModalBreaksComponent } from './dashboard-outbound-modals/dashboard-outbound-modal-breaks/dashboard-outbound-modal-breaks.component';
import { DashboardOutboundGroupsComponent } from './dashboard-outbound-groups/dashboard-outbound-groups.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DashboardOutboundModalAgentsHistoricComponent } from './dashboard-outbound-modals/dashboard-outbound-modal-agents-historic/dashboard-outbound-modal-agents-historic.component';
import { DashboardOutboundModalBreaksHistoricComponent } from './dashboard-outbound-modals/dashboard-outbound-modal-breaks-historic/dashboard-outbound-modal-breaks-historic.component';

@NgModule({
  declarations: [
    DashboardOutboundComponent,
    DashboardOutboundListComponent,
    DashboardOutboundGraphComponent,
    DashboardOutboundCallsComponent,
    DashboardOutboundLevelsComponent,
    DashboardOutboundBreaksComponent,
    DashboardOutboundBreaksAuxiliarComponent,
    DashboardOutboundBreaksAssignationsComponent,
    DashboardOutboundHighlightsComponent,
    DashboardOutboundAgentsComponent,
    DashboardOutboundAgentsPieComponent,
    DashboardOutboundAgentsDistributionComponent,
    DashboardOutboundHighlightsHistoricComponent,
    DashboardOutboundBreaksHistoricComponent,
    DashboardOutboundBreaksAuxiliarHistoricComponent,
    DashboardOutboundBreaksAssignationsHistoricComponent,
    DashboardOutboundAgentsHistoricComponent,
    DashboardOutboundModalAgentsComponent,
    DashboardOutboundModalCallsComponent,
    DashboardOutboundModalTextComponent,
    DashboardOutboundModalCurrentcallsComponent,
    DaashboardOutboundModalBreaksComponent,
    DashboardOutboundGroupsComponent,
    DashboardOutboundModalAgentsHistoricComponent,
    DashboardOutboundModalBreaksHistoricComponent
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

    DashboardOutboundRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }]
})
export class DashboardOutboundModule {}
