import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LayoutRoutingModule } from "./layout-routing.module";
import { LayoutComponent } from "./layout.component";

import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,

    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,

    LayoutRoutingModule
  ]
})
export class LayoutModule {}
