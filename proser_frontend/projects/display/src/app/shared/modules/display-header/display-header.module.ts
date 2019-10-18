import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SelectorModule } from "shared/modules/selector/selector.module";

import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { DisplayHeaderComponent } from "./display-header.component";

@NgModule({
  declarations: [DisplayHeaderComponent],
  imports: [CommonModule, FormsModule, NgSelectModule, SelectorModule],
  exports: [DisplayHeaderComponent]
})
export class DisplayHeaderModule {}
