import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";
import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";

import { AuditRoutingModule } from "./audit-routing.module";
import { AuditHeaderComponent } from "./audit-header/audit-header.component";
import { AuditIntroComponent } from "./audit-intro/audit-intro.component";
import { AuditComponent } from "./audit.component";
./audit-general/audit-config/audit-config-env/audit-config-env.component
@NgModule({
  declarations: [AuditHeaderComponent, AuditIntroComponent, AuditComponent],
  imports: [CommonModule, NowModule, ConnectionModule, AuditRoutingModule]
})
export class AuditModule {}
