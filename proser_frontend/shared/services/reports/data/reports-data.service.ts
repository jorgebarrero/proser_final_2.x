//  Angular

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isNullOrUndefined } from "util";

import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "../../helpers/env.service";
import { UserSelectionModel, MainAuditModel } from "shared/models";
@Injectable({
  providedIn: "root"
})
export class ReportsDataService {
  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getAuditList(userSelection: UserSelectionModel): Observable<any> {
    // const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvReports/dataAuditReport?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, userSelection, {
        headers: this.headers
      })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );

    return res;
  }

  getAuditRecord(userSelection): Observable<any> {
    // const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvReports/dataAuditReport?access_token=${accessToken}`;
    const res = this.http
      .post(url_api, userSelection, { headers: this.headers })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
    console.warn("Detalle del audit ......", url_api, userSelection);

    return res;
  }

  getCdrList(userSelection): Observable<any> {
    // const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvReports/dataCdrReport?access_token=${accessToken}`;
    const res = this.http.post(url_api, userSelection, {
      headers: this.headers
    });
    console.warn("Detalle de llamadas diarias ......", url_api, userSelection);

    return res;
  }

  getCdrRecord(userSelection): Observable<any> {
    // const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvReports/dataCdrReport?access_token=${accessToken}`;
    const res = this.http.post(url_api, userSelection, {
      headers: this.headers
    });
    console.warn("Detalle de llamadas diarias ......", url_api, userSelection);

    return res;
  }

  getCallEntryList(userSelection): Observable<any> {
    // const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvReports/dataCallEntryReport?access_token=${accessToken}`;
    const res = this.http.post(url_api, userSelection, {
      headers: this.headers
    });
    console.warn("Detalle de callentry ......", url_api, userSelection);

    return res;
  }

  getCallEntryRecord(userSelection): Observable<any> {
    // const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvReports/dataCallEntryReport?access_token=${accessToken}`;
    const res = this.http.post(url_api, userSelection, {
      headers: this.headers
    });
    console.warn("Detalle de callentry ......", url_api, userSelection);

    return res;
  }
}
