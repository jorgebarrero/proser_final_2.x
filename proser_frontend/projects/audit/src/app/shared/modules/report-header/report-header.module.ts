import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectorModule } from "shared/modules/selector/selector.module";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReportHeaderComponent } from "./report-header.component";
@NgModule({
  declarations: [ReportHeaderComponent],
  imports: [CommonModule, FormsModule, NgSelectModule, SelectorModule],
  exports: [ReportHeaderComponent]
})
export class ReportHeaderModule {}
