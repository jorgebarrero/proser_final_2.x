//  Angular

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { isNullOrUndefined } from "util";

import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { UserSelectionModel } from "shared/models";
@Injectable({
  providedIn: "root"
})
export class DisplayAgentsIndicatorsService {
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
    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvDisplays/displayAgentsIndicators?access_token=${accessToken}`;
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
}
