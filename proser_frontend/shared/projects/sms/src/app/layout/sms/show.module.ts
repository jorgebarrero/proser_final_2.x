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

import { ShowIntroComponent } from "./show-intro/show-intro.component";

import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";

import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";
@NgModule({
  declarations: [ShowComponent, ShowIntroComponent],
  imports: [
    CommonModule,
    SelectorModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NowModule,

    ConnectionModule,
    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,
    IntroPageModule,

    AlertModule,

    ShowRoutingModule
  ]
})
export class ShowModule {}
