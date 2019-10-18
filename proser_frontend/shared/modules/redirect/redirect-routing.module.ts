import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "shared/guards";
import { AccessdeniedComponent } from "./pages/accessdenied/accessdenied.component";
import { NotfoundComponent } from "./pages/notfound/notfound.component";
import { ErrorComponent } from "./pages/error/error.component";

const routes: Routes = [
  { path: "access-denied", component: AccessdeniedComponent },
  { path: "not-found", component: NotfoundComponent },
  { path: "error", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RedirectRoutingModule {}
