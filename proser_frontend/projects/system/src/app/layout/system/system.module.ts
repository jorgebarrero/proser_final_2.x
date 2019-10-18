import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";

import { SystemRoutingModule } from "./system-routing.module";
import { SystemComponent } from "./system.component";
import { SystemIntroComponent } from "./system-intro/system-intro.component";

import { SystemPm2Component } from "./system-pm2/system-pm2.component";

import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";
import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";
import { AlertModule } from "shared/modules/alert/alert.module";

@NgModule({
  declarations: [SystemComponent, SystemIntroComponent, SystemPm2Component],
  imports: [
    CommonModule,
    NowModule,
    ConnectionModule,

    AlertModule,

    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,
    IntroPageModule,

    SystemRoutingModule
  ]
})
export class SystemModule {}
