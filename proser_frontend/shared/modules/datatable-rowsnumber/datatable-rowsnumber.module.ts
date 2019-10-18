import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DatatableRowsnumberComponent } from "./datatable-rowsnumber.component";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  declarations: [DatatableRowsnumberComponent],
  imports: [CommonModule, FormsModule, NgSelectModule],
  exports: [DatatableRowsnumberComponent]
})
export class DatatableRowsnumberModule {}
