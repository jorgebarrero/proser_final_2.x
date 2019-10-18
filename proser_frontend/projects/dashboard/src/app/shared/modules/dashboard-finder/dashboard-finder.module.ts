import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { DashboardFinderComponent } from "./dashboard-finder.component";

@NgModule({
  declarations: [DashboardFinderComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [DashboardFinderComponent]
})
export class DashboardFinderModule {}
