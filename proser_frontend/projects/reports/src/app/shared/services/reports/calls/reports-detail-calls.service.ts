//  Angular

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
// import { Http, ResponseContentType } from "@angular/common/http";
import { isNullOrUndefined } from "util";

import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { UserSelectionModel } from "shared/models";
@Injectable({
  providedIn: "root"
})
export class CallsDetailService {
  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getReportList(userSelection: UserSelectionModel): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsDetailReport?access_token=${accessToken}`;
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

  getRecording(selected): Observable<any> {
    const url = selected.record;
    const fileName = url.substring(url.lastIndexOf("/") + 1);

    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsGetRecordigFile?access_token=${accessToken}`;

    console.error("url_api", url_api);

    const res = this.http.post(url_api, selected, {
      headers: this.headers
    });
    return res;
  }

  deleteRecording(selected): Observable<any> {
    const url = selected.record;
    const fileName = url.substring(url.lastIndexOf("/") + 1);

    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvReports/deleteRecordigFile?access_token=${accessToken}`;

    const res = this.http.post(url_api, selected, {
      headers: this.headers
    });
    return res;
  }

  listenRecording(selected): Observable<any> {
    const url = selected.record;
    const fileNameTemp = url.substring(url.lastIndexOf("/") + 1);

    const filename = `${fileNameTemp}.mp3`;

    const accessToken = localStorage.getItem("accessToken");
    // const url_api = `${this.env.loopbackApiUrl}/audio/${fileName}?access_token=${accessToken}`;
    // const url_api = `${this.env.loopbackApiUrl}/audio/${fileName}`;

    const url_api =
      "http://localhost:3151/audio/q-4000-2122095120-20190904-070825-1567595305.20723.gsm.mp3";

    console.error("listenRecording - url_api", url_api);

    const res = this.http.get(url_api);
    return res;
  }

  downloadFile(route: string, filename: string = null) {
    const baseUrl = `${this.env.loopbackApiUrl}/audio/`;
    const accessToken = localStorage.getItem("accessToken");
    const headers = new HttpHeaders().set(
      "authorization",
      "Bearer " + accessToken
    );
    return this.http.get(baseUrl + route, {
      headers,
      responseType: "blob" as "json"
    });
  }
}
