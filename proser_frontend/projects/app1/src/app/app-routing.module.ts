import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "shared/guards";
import { RedirectModule } from "shared/modules/redirect/redirect.module";

import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./home/header/header.component";

import { SelectorTestComponent } from "./selector-test/selector-test.component";

import { AppComponent } from "./app.component";

const routes: Routes = [
  {
    path: "app1",
    component: AppComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "selector",
        component: SelectorTestComponent
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then(m => m.LayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RedirectModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
/*

{
    path: "header",
    component: HeaderComponent,
   
  }

  */
