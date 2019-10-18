import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginIntroComponent } from "./login-intro/login-intro.component";
import { LoginLoginComponent } from "./login-login/login-login.component";
import { LoginRegisterComponent } from "./login-register/login-register.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: LoginLoginComponent,
    children: [
      { path: "", redirectTo: "login-login" },
      { path: "login-intro", component: LoginIntroComponent }
    ]
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "login-logout", redirectTo: "home", pathMatch: "full" },

  { path: "login-login", component: LoginLoginComponent },
  { path: "login-register", component: LoginRegisterComponent },
  { path: "login-profile", component: ProfileComponent },
  { path: "home", redirectTo: "login-intro" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
