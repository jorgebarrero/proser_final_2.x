import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

import { EnvService } from 'shared/services/helpers/env.service';
import { InvServiceModel } from 'shared/models';


@Injectable({
  providedIn: 'root'
})
export class InvServiceService {


  api_string = '/api/InvServices';

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  httpOptions = {
    headers: this.headers
  };


  constructor(
    private http: HttpClient,
    private env: EnvService
  ) { }

  private handleError(error: any) {
    console.error(error);
    return throwError(error);
  }


  getAllRecords(query?): Observable<InvServiceModel[]> {
    const accessToken = localStorage.getItem('accessToken');
    let filter;
    if(query) {
          filter = `?filter=${query}&access_token=${accessToken}`;
        } else {
          filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}${filter}`;
    return this.http.get<InvServiceModel[]>(url_api, {headers: this.headers})
    .pipe(
      map(data => data),
      catchError(this.handleError)
      );
  }

  postRecord(item?) {
    const accessToken = localStorage.getItem('accessToken');
    const query = JSON.stringify(item);
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}?access_token=${accessToken}`;
    return this.http.post<InvServiceModel>(url_api, query, {headers: this.headers})
    .pipe(map(data => data));
  }

  putRecord(item?) {
    let id = null;
    if(item){
       id = item.inv_service_id;
    }
    const query = JSON.stringify(item);
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    

    return this.http.put<InvServiceModel>(url_api, query, {headers: this.headers})
    .pipe(map(data => data));
  }


  deleteRecord(id) {
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?&access_token=${accessToken}`;
    return this.http.delete<InvServiceModel>(url_api, id)
    .pipe(map(data => data));
  }

  getRecordById(id) {
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/${id}?access_token=${accessToken}`;
    return this.http.get<InvServiceModel>(url_api, id)
    .pipe(map(data => data));
  }

}
