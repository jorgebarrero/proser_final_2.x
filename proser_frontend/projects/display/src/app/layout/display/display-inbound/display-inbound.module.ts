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

import { DisplayHeaderModule } from "../../../shared/modules/display-header/display-header.module";

import { DisplayInboundRoutingModule } from "./display-inbound-routing.module";
import { DisplayInboundComponent } from "./display-inbound.component";
import { DisplayInboundListComponent } from "./display-inbound-list/display-inbound-list.component";
import { DisplayInboundGraphComponent } from "./display-inbound-graph/display-inbound-graph.component";
import { DisplayInboundCallsComponent } from "./display-inbound-calls/display-inbound-calls.component";

import { DisplayInboundLevelsComponent } from "./display-inbound-levels/display-inbound-levels.component";

import { DisplayInboundBreaksComponent } from "./display-inbound-breaks/display-inbound-breaks.component";
import { DisplayInboundBreaksAuxiliarComponent } from "./display-inbound-breaks/display-inbound-breaks-auxiliar/display-inbound-breaks-auxiliar.component";
import { DisplayInboundBreaksAssignationsComponent } from "./display-inbound-breaks/display-inbound-breaks-assignations/display-inbound-breaks-assignations.component";

import { DisplayInboundHighlightsComponent } from "./display-inbound-highlights/display-inbound-highlights.component";
import { DisplayInboundAgentsComponent } from "./display-inbound-agents/display-inbound-agents.component";
import { DisplayInboundAgentsPieComponent } from "./display-inbound-agents/display-inbound-agents-pie/display-inbound-agents-pie.component";
import { DisplayInboundAgentsDistributionComponent } from "./display-inbound-agents/display-inbound-agents-distribution/display-inbound-agents-distribution.component";

import { DisplayInboundHighlightsHistoricComponent } from "./display-inbound-highlights-historic/display-inbound-highlights-historic.component";
import { DisplayInboundBreaksHistoricComponent } from "./display-inbound-breaks-historic/display-inbound-breaks-historic.component";
import { DisplayInboundBreaksAuxiliarHistoricComponent } from "./display-inbound-breaks-historic/display-inbound-breaks-auxiliar-historic/display-inbound-breaks-auxiliar-historic.component";
import { DisplayInboundBreaksAssignationsHistoricComponent } from "./display-inbound-breaks-historic/display-inbound-breaks-assignations-historic/display-inbound-breaks-assignations-historic.component";
import { DisplayInboundAgentsHistoricComponent } from "./display-inbound-agents-historic/display-inbound-agents-historic.component";
import { SharedPipesModule } from "shared/pipes/shared-pipes.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    DisplayInboundComponent,
    DisplayInboundListComponent,
    DisplayInboundGraphComponent,
    DisplayInboundCallsComponent,
    DisplayInboundLevelsComponent,
    DisplayInboundBreaksComponent,
    DisplayInboundBreaksAuxiliarComponent,
    DisplayInboundBreaksAssignationsComponent,
    DisplayInboundHighlightsComponent,
    DisplayInboundAgentsComponent,
    DisplayInboundAgentsPieComponent,
    DisplayInboundAgentsDistributionComponent,
    DisplayInboundHighlightsHistoricComponent,
    DisplayInboundBreaksHistoricComponent,
    DisplayInboundBreaksAuxiliarHistoricComponent,
    DisplayInboundBreaksAssignationsHistoricComponent,
    DisplayInboundAgentsHistoricComponent
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
    DisplayHeaderModule,

    FontAwesomeModule,

    DisplayInboundRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }]
})
export class DisplayInboundModule {}



