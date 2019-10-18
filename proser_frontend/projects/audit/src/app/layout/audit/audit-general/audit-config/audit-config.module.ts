import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditConfigRoutingModule } from './audit-config-routing.module';
import { AuditConfigComponent } from './audit-config.component';
import { AuditConfigEnvComponent } from './audit-config-env/audit-config-env.component';

@NgModule({
  declarations: [AuditConfigComponent, AuditConfigEnvComponent],
  imports: [
    CommonModule,
    AuditConfigRoutingModule
  ]
})
export class AuditConfigModule { }
