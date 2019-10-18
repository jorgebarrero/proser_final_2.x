import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatableFinderComponent } from "./datatable-finder.component";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [DatatableFinderComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [DatatableFinderComponent]
})
export class DatatableFinderModule {}
