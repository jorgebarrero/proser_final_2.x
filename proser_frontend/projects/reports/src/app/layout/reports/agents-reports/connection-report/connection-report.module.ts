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

import { ReportHeaderModule } from "projects/reports/src/app/shared/modules/report-header/report-header.module";
import { ReportFinderModule } from "projects/reports/src/app/shared/modules/report-finder/report-finder.module";
import { ReportExcelModule } from "projects/reports/src/app/shared/modules/report-excel/report-excel.module";

import { ConnectionReportRoutingModule } from "./connection-report-routing.module";
import { ConnectionReportComponent } from "./connection-report.component";
import { ConnectionReportListComponent } from "./connection-report-list/connection-report-list.component";
import { ConnectionReportListDetailComponent } from "./connection-report-list/connection-report-list-detail/connection-report-list-detail.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    ConnectionReportComponent,
    ConnectionReportListComponent,
    ConnectionReportListDetailComponent
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

    SelectorModule,
    ReportHeaderModule,
    ReportFinderModule,
    ReportExcelModule,
    
    FontAwesomeModule,

    ConnectionReportRoutingModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "es" }]
})
export class ConnectionReportModule {}
