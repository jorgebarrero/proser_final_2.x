import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";
import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModule } from "shared/modules/alert/alert.module";
import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";

import { CrudRoutingModule } from "./crud-routing.module";

import { CrudComponent } from "./crud.component";
import { CrudIntroComponent } from "./crud-intro/crud-intro.component";

import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";
import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";


@NgModule({
  declarations: [CrudComponent, CrudIntroComponent, ],
  imports: [
    CommonModule,
    NowModule,
    ConnectionModule,

    ConnectionModule,
    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,
    IntroPageModule,
    AlertModule,

    CrudRoutingModule
  ],
  providers: [EnvServiceProvider]
})
export class CrudModule {}
