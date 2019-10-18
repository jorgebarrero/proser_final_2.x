import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderMenuUserComponent } from "./header-menu-user.component";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModule } from "shared/modules/alert/alert.module";
import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";
import { RouterModule } from "@angular/router";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [HeaderMenuUserComponent],
  imports: [
    CommonModule,
    AlertModule,
    NowModule,
    ConnectionModule,

    BsDropdownModule,
    CollapseModule,

    FontAwesomeModule,

    RouterModule
  ],
  exports: [HeaderMenuUserComponent]
})
export class HeaderMenuUserModule {}
