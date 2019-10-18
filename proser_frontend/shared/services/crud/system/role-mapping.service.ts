import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";

import { RoleMappingModel } from "shared/models/crud/system/RoleMapping.model";

@Injectable({
  providedIn: "root"
})
export class RoleMappingService {
  api_string = "/api/RoleMappings";

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

  postRecord(item?) {
    const accessToken = localStorage.getItem("accessToken");
    const query = JSON.stringify(item);
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}?access_token=${accessToken}`;
    return this.http
      .post<RoleMappingModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  updateRecord(item?) {
    const query = JSON.stringify(item);

    const accessToken = localStorage.getItem("accessToken");
    let userId = item.principalId;
    let filter = `{"principalId": "${userId}"}`;

    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/update?where=${filter}&access_token=${accessToken}`;
    return this.http
      .post<RoleMappingModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteRecord(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?&access_token=${accessToken}`;
    return this.http
      .delete<RoleMappingModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  findOneRecord(user) {
    let id = user.id;

    const accessToken = localStorage.getItem("accessToken");
    // let userId = item;
    let filter = `{"where":{"principalId": "${id}"}}`;

    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/findOne?filter=${filter}&access_token=${accessToken}`;
    return this.http
      .get<RoleMappingModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  patchRecord(record) {
    let id = record.id;
    delete record.id;

    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}/api/RoleMappings/${id}&access_token=${accessToken}`;
    return this.http
      .patch<any>(url_api, record, { headers: this.headers })
      .pipe(map(data => data));
  }

  getRoles() {
    const accessToken = localStorage.getItem("accessToken");

    const url_api = `${this.env.loopbackApiUrl}/api/Roles?access_token=${accessToken}`;
    return this.http
      .get<RoleMappingModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }

  getExistingRoleMapping(principalId) {
    const accessToken = localStorage.getItem("accessToken");
    // let query = `%7B%22where%22%3A%7B%22principalId%22%3A%22${id}%22%7D%7D&`;
    const url_api = `${this.env.loopbackApiUrl}/api/RoleMappings/findOne?filter={"where":{"principalId":${principalId}}}&access_token=${accessToken}`;
    return this.http
      .get<RoleMappingModel>(url_api, { headers: this.headers })
      .pipe(map(data => data));
  }
}
