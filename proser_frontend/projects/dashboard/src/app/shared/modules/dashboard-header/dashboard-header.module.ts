import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectorModule } from "shared/modules/selector/selector.module";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { DashboardHeaderComponent } from "./dashboard-header.component";

@NgModule({
  declarations: [DashboardHeaderComponent],
  imports: [CommonModule, FormsModule, NgSelectModule, SelectorModule],
  exports: [DashboardHeaderComponent]
})
export class DashboardHeaderModule {}
