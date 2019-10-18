import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { HeaderMenuComponent } from "./header-menu.component";

@NgModule({
  declarations: [HeaderMenuComponent],
  imports: [CommonModule, NgbModule],
  exports: [HeaderMenuComponent]
})
export class HeaderMenuModule {}
