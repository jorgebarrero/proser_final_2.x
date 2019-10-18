import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { isNullOrUndefined } from "util";

import { EnvService } from "../helpers/env.service";

import { Router } from "@angular/router";
import {
  UserSelectionModel,
  RoleMappingModel,
  UserbaseModel
} from "shared/models";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private env: EnvService,
    private router: Router
  ) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  registerUser(user) {
    const url_api = `${this.env.loopbackApiUrl}/api/userbases`;
    return this.http
      .post<UserbaseModel>(url_api, user, { headers: this.headers })
      .pipe(map(data => data));
  }

  registerRoleMapping(user: UserbaseModel) {
    let roleMapping = {
      principalType: "USER",
      principalId: user.id,
      roleId: 4
    };

    const url_api = `${this.env.loopbackApiUrl}/api/RoleMappings`;
    return this.http
      .post<RoleMappingModel>(url_api, roleMapping, { headers: this.headers })
      .pipe(map(data => data));
  }

  loginUser(username: string, password: string) {
    const url_api = `${this.env.loopbackApiUrl}/api/userbases/login?include=user`;
    return this.http
      .post<UserbaseModel>(
        url_api,
        { username, password },
        { headers: this.headers }
      )
      .pipe(map(data => data));
  }

  getAllUsers() {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/userbases?access_token=${accessToken}`;
    return this.http
      .get<UserbaseModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  setUser(user: UserbaseModel) {
    const userString = JSON.stringify(user);
    localStorage.setItem("currentUser", userString);
  }

  setToken(token) {
    localStorage.setItem("accessToken", token);
    this.setProserStore();
  }

  setProserStore() {
    const proser_store = {
      userSelection: new UserSelectionModel("standard")
    };
    localStorage.setItem("proser_store", JSON.stringify(proser_store));
  }

  getToken() {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser(): UserbaseModel {
    const userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      const user: UserbaseModel = JSON.parse(userString);
      return user;
    } else {
      return null;
    }
  }

  getCurrentUserValue() {
    let result = 0;
    const userString = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(userString)) {
      const user: UserbaseModel = JSON.parse(userString);
      user.profile === "develop" ? (result = 20) : "";
      user.profile === "admin" ? (result = 10) : "";
      user.profile === "system" ? (result = 7) : "";
      user.profile === "config" ? (result = 5) : "";
      user.profile === "user" ? (result = 0) : "";
      return result;
    } else {
      return 0;
    }
  }

  checkIfExists(user) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/Userbases/checkIfExists`;

    return this.http
      .post<any>(url_api, user, { headers: this.headers })
      .pipe(map(data => data));
  }

  logoutUser() {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/userbases/logout?access_token=${accessToken}`;
    this.router.navigate(["/init/bye"]);
    localStorage.clear();
    return this.http.post<UserbaseModel>(url_api, { headers: this.headers });
  }

  isAuthenticated(): boolean {
    let result = false;
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      result = true;
    }

    return result;
  }
}
