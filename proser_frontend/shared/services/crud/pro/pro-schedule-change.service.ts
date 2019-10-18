import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { ProScheduleChangeModel } from "shared/models";

@Injectable({
  providedIn: "root"
})
export class ProScheduleChangeService {
  api_string = "/api/ProShiftChanges";

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

  getAllRecords(query?): Observable<ProScheduleChangeModel[]> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}${filter}`;
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
      .post<ProScheduleChangeModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  putRecord(item?) {
    let id = null;
    if (item) {
      id = item.inv_agent_id;
    }
    const query = JSON.stringify(item);
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    

    return this.http
      .put<ProScheduleChangeModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  deleteRecord(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?&access_token=${accessToken}`;
    return this.http
      .delete<ProScheduleChangeModel>(url_api, id)
      .pipe(map(data => data));
  }

  getRecordById(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    return this.http
      .get<ProScheduleChangeModel>(url_api, id)
      .pipe(map(data => data));
  }

  /************************* */

  getSchedules(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_client_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvSchedules${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  getClients(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_client_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvClients${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  getQueues(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_queue_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvQueues${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  getServices(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_service_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvServices${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  getCampaigns(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_campaign_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvCampaigns${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  getSupervisors(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_supervisor_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvSupervisors${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }

  getRoles(query?): Observable<any> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    query = `{"where":{"inv_agentrole_status":"A"}}`;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = "?access_token=${accessToken}";
    }
    const url_api = `${this.env.loopbackApiUrl}/api/InvShiftChangeRoles${filter}`;
    return this.http.get<any>(url_api, { headers: this.headers }).pipe(
      map(data => data),
      catchError(this.handleError)
    );
  }
}
