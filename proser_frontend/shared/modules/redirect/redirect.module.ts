import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccessdeniedComponent } from "./pages/accessdenied/accessdenied.component";
import { ErrorComponent } from "./pages/error/error.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { RedirectRoutingModule } from "./redirect-routing.module";

@NgModule({
  declarations: [AccessdeniedComponent, ErrorComponent, NotfoundComponent],
  imports: [CommonModule, RedirectRoutingModule],
  exports: [AccessdeniedComponent, ErrorComponent, NotfoundComponent]
})
export class RedirectModule {}
