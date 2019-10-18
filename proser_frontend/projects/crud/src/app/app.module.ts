import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ModuleWithProviders } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";

import { AuthGuard } from "shared/guards";
import { AlertService } from "shared/services/helpers/alert.service";
import { AlertModule } from "shared/modules/alert/alert.module";
import { NowModule } from "shared/modules/now/now.module";
import { ConnectionModule } from "shared/modules/connection/connection.module";
import { SelectorModule } from "shared/modules/selector/selector.module";
import { EnvServiceProvider } from "shared/services/helpers/env.service.provider";

import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./home/header/header.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HeaderMenuModule } from "shared/modules/header-menu/header-menu.module";
import { HeaderMenuUserModule } from "shared/modules/header-menu-user/header-menu-user.module";
import { HeaderMenuBrandModule } from "shared/modules/header-menu-brand/header-menu-brand.module";
import { IntroPageModule } from "shared/modules/intro-page/intro-page.module";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HeaderMenuGeneralComponent } from './home/header/header-menu-general/header-menu-general.component';
import { HeaderMenuPeopleComponent } from './home/header/header-menu-people/header-menu-people.component';
import { HeaderMenuOperationComponent } from './home/header/header-menu-operation/header-menu-operation.component';
import { HeaderMenuPlanningComponent } from './home/header/header-menu-planning/header-menu-planning.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, HeaderMenuGeneralComponent, HeaderMenuPeopleComponent, HeaderMenuOperationComponent, HeaderMenuPlanningComponent],
  imports: [
    BrowserModule,
    SelectorModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AlertModule,
    NowModule,
    NgbModule,
    ConnectionModule,

    HeaderMenuModule,
    HeaderMenuUserModule,
    HeaderMenuBrandModule,
    IntroPageModule,

    FontAwesomeModule,

    BsDropdownModule,
    CollapseModule,

    AppRoutingModule
  ],
  providers: [EnvServiceProvider, AuthGuard, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {}

const providers = [];
@NgModule({})
export class CrudSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppModule,
      providers: providers
    };
  }
}
