import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CrudUserbaseComponent } from "./crud-userbase.component";
import { CrudUserbaseDetailComponent } from "./crud-userbase-detail/crud-userbase-detail.component";
import { CrudUserbaseListComponent } from "./crud-userbase-list/crud-userbase-list.component";

const routes: Routes = [
  {
    path: "",
    component: CrudUserbaseComponent,
    children: [
      { path: "", redirectTo: "crud-userbase-list" },
      { path: "crud-userbase", component: CrudUserbaseComponent },
      { path: "crud-userbase-list", component: CrudUserbaseListComponent },
      { path: "crud-userbase-detail", component: CrudUserbaseDetailComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudUserRoutingModule {}
