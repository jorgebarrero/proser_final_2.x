import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";

import { UserSelectionModel } from "shared/models/crud/system/UserSelectionModel.model";

@Injectable({
  providedIn: "root"
})
export class SelectorService {
  api_string = "/api/InvMenus";

  headers = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("Accept", "application/json");

  httpOptions = {
    headers: this.headers
  };

  constructor(private http: HttpClient, private env: EnvService) {}

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }

  getAllRecords(query?): Observable<UserSelectionModel> {
    "query", JSON.stringify(query);

    const accessToken = localStorage.getItem("accessToken");
    let filter;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/userSelectionMenu${filter}`;
    return this.http
      .post<UserSelectionModel>(url_api, query, { headers: this.headers })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }
}
