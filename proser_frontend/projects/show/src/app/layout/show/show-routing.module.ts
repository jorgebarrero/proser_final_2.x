import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShowComponent } from "./show.component";
import { ShowIntroComponent } from "./show-intro/show-intro.component";
import { ShowInboundComponent } from "./show-inbound/show-inbound.component";

const routes: Routes = [
  {
    path: "",
    component: ShowComponent,
    children: [
      { path: "", redirectTo: "show-intro" },
      { path: "show-intro", component: ShowIntroComponent },
      { path: "show-inbound", component: ShowInboundComponent }
    ]
  }
];
/*
const routes: Routes = [
  {
    path: '',
    component: ShowComponent,
    children: [
      { path: '', redirectTo: 'show/show-intro' },
      { path: 'show/show-intro', component: ShowIntroComponent },

      {
        path: 'show/show-inbound',
        loadChildren: () =>
          import('./show-inbound/show-inbound.module').then(
            m => m.ShowInboundModule
          ),
      },
    ],
  },
];
*/

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowRoutingModule {}
