import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";

import { AuthGuard } from "shared/guards";
import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModule } from "shared/modules/alert/alert.module";
import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";
import { SelectorModule } from "shared/modules/selector/selector.module";
import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";

import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";

import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";

import { HomeComponent } from "./home/home.component";
import { HomeHeaderComponent } from "./home/header/header.component";
import { ByeComponent } from "./home/bye/bye.component";
import { HeaderMenuLoginComponent } from "./home/header/header-menu-login/header-menu-login.component";
import { HeaderMenuSectionsComponent } from "./home/header/header-menu-sections/header-menu-sections.component";
import { HeaderMenuDevelopComponent } from "./home/header/header-menu-develop/header-menu-develop.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    AppComponent,
    HomeHeaderComponent,
    HomeComponent,
    ByeComponent,
    HeaderMenuLoginComponent,
    HeaderMenuSectionsComponent,
    HeaderMenuDevelopComponent
  ],
  imports: [
    BrowserModule,

    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),


    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    BrowserAnimationsModule,

    NgbModule,

    AlertModule,
    NowModule,
    NgbModule,
    ConnectionModule,

    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,
    IntroPageModule,

    FontAwesomeModule,

    AppRoutingModule
  ],
  providers: [EnvServiceProvider, AuthGuard, AlertService],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

const providers = [];

@NgModule({})
export class InitSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    };
  }
}
