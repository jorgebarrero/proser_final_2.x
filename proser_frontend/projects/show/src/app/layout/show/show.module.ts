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

import { SelectorModule } from "shared/modules/selector/selector.module";

import { ShowRoutingModule } from "./show-routing.module";
import { ShowComponent } from "./show.component";
import { ShowHeaderComponent } from "./show-header/show-header.component";
import { ShowIntroComponent } from "./show-intro/show-intro.component";
import { ShowInboundComponent } from "./show-inbound/show-inbound.component";

@NgModule({
  declarations: [
    ShowComponent,
    ShowHeaderComponent,
    ShowIntroComponent,
    ShowInboundComponent
  ],
  imports: [
    CommonModule,
    SelectorModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NowModule,
    ConnectionModule,
    ShowRoutingModule,
    AlertModule
  ]
})
export class ShowModule {}
