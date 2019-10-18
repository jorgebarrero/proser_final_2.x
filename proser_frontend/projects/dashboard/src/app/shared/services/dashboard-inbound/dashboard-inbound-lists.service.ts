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
export class DashboardInboundListsService {
  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  dashboardInboundListCallEntry(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardInboundListCallEntry?access_token=${accessToken}`;
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

  dashboardInboundListCurrentCalls(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardInboundListCurrentCalls?access_token=${accessToken}`;
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

  dashboardInboundListCurrentAgents(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardInboundListCurrentAgents?access_token=${accessToken}`;
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

  dashboardInboundListCurrentBreaks(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardInboundListCurrentBreaks?access_token=${accessToken}`;
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

  dashboardInboundListAuditAgents(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardInboundListAuditAgents?access_token=${accessToken}`;
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

  dashboardInboundListAuditBreaks(
    dashboardSelectionModel: DashboardSelectionModel
  ): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvDashboards/dashboardInboundListAuditBreaks?access_token=${accessToken}`;
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
