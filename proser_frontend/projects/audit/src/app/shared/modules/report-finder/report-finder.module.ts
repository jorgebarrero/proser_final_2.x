import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportFinderComponent } from "./report-finder.component";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [ReportFinderComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [ReportFinderComponent]
})
export class ReportFinderModule {}
