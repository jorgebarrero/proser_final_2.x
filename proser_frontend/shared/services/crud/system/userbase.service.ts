import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";

import { UserbaseModel } from "shared/models/crud/system/Userbase.model";

@Injectable({
  providedIn: "root"
})
export class UserbaseService {
  api_string = "/api/Userbases";

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

  // /api/Userbases?filter[include]=roles&access_token=${accessToken}

  getAllRecords(query?): Observable<UserbaseModel[]> {
    const accessToken = localStorage.getItem("accessToken");
    let filter = `?access_token=${accessToken}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}/api/Userbases?filter[include]=roles&access_token=${accessToken}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  postRecord(item?) {
    const accessToken = localStorage.getItem("accessToken");
    const query = JSON.stringify(item);
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}?access_token=${accessToken}`;
    return this.http
      .post<UserbaseModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  patchRecord(item?) {
    let id = null;
    if (item) {
      id = item.id;
    }
    // ?filter[include]=roles
    const query = JSON.stringify(item);
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;

    return this.http
      .patch<UserbaseModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteRecord(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?&access_token=${accessToken}`;
    return this.http.delete<UserbaseModel>(url_api, id).pipe(map(data => data));
  }

  getRecordById(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    return this.http.get<UserbaseModel>(url_api, id).pipe(map(data => data));
  }
}
