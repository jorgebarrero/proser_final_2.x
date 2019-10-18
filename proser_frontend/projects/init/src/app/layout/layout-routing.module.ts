import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent
    // children: [
    //   { path: "", redirectTo: "start" }

    //   // {
    //   //   path: "start",
    //   //   loadChildren: () =>
    //   //     import("./init/start/start.module").then(m => m.StartModule)
    //   // },

    //   // {
    //   //   path: "extension",
    //   //   loadChildren: () =>
    //   //     import("./init/init-extension/init-extension.module").then(
    //   //       m => m.InitExtensionModule
    //   //     )
    //   // }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}

// {
//   path: "intro",
//   loadChildren: () =>
//     import("./intro/intro.module").then(m => m.IntroModule)
// },
