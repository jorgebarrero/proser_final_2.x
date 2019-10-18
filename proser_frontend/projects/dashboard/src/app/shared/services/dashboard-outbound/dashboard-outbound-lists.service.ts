//  Angular

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isNullOrUndefined } from "util";

import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { UserSelectionModel } from "shared/models";

import { DashboardSelectionModel } from "projects/dashboard/src/app/shared/models";
@Injectable({
  providedIn: "root"
})
export class DashboardOutboundListsService {
  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  dashboardOutboundListCdr(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardOutboundListCdr?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, dashboardSelectionModel, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

  dashboardOutboundListCurrentCalls(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardOutboundListCurrentCalls?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, dashboardSelectionModel, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

  dashboardOutboundListCurrentAgents(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardOutboundListCurrentAgents?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, dashboardSelectionModel, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

  dashboardOutboundListCurrentBreaks(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardOutboundListCurrentBreaks?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, dashboardSelectionModel, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

  dashboardOutboundListAuditAgents(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardOutboundListAuditAgents?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, dashboardSelectionModel, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }

  dashboardOutboundListAuditBreaks(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardOutboundListAuditBreaks?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, dashboardSelectionModel, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    return res;
  }
}
