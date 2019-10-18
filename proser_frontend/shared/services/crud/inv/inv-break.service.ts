import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { isNullOrUndefined } from "util";

import { EnvService } from "shared/services/helpers/env.service";
import { InvBreakModel } from "shared/models";

@Injectable({
  providedIn: "root"
})
export class InvBreakService {
  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  getAllRecords(query?) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvBreaks?access_token=${accessToken}`;

    return this.http
      .get<InvBreakModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  getSelectedRecords(query?) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/InvBreaks?filter=${query}&access_token=${accessToken}`;

    return this.http
      .get<InvBreakModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }
}
