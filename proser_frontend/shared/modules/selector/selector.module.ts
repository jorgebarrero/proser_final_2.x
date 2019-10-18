import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";

import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModule } from "shared/modules/alert/alert.module";
import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";

import { SelectorComponent } from "./selector.component";

@NgModule({
  declarations: [SelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NowModule,
    AlertModule,
    ConnectionModule
  ],
  exports: [SelectorComponent]
})
export class SelectorModule {}
