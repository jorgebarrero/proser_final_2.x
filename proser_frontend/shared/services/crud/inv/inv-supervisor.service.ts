import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { InvSupervisorModel, InvClientModel } from "shared/models";

class List {
  id;
  name;
}

@Injectable({
  providedIn: "root"
})
export class InvSupervisorService {
  api_string = "/api/InvSupervisors";

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

  getAllRecords(query?): Observable<InvSupervisorModel[]> {
    const accessToken = localStorage.getItem("accessToken");
    let filter;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}${filter}`;
    return this.http
      .get<InvSupervisorModel[]>(url_api, { headers: this.headers })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  postRecord(item?) {
    const accessToken = localStorage.getItem("accessToken");
    const query = JSON.stringify(item);

    const url_api = `${this.env.loopbackApiUrl}${this.api_string}?access_token=${accessToken}`;
    return this.http
      .post<InvSupervisorModel>(url_api, query, { headers: this.headers })
      .pipe(map(data => data));
  }

  putRecord(item?) {
    let id = null;
    if (item) {
      id = item.inv_supervisor_id;
    }
    const query = JSON.stringify(item);
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    

    return this.http
      .put(url_api, query, { headers: this.headers })
      .pipe(map((data: InvSupervisorModel) => data));
  }

  deleteRecord(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?&access_token=${accessToken}`;
    return this.http
      .delete<InvSupervisorModel>(url_api, id)
      .pipe(map(data => data));
  }

  getRecordById(id) {
    const accessToken = localStorage.getItem("accessToken");
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    return this.http
      .get<InvSupervisorModel>(url_api, id)
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
}
