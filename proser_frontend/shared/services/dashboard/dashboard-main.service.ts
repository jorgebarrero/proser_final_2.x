//  Angular

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import 'rxjs/operators';
import { Observable } from 'rxjs';



import { EnvService } from '../helpers/env.service';

import { UserSelectionModel } from 'shared/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardMainService {
  

  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // getMainDashboardItems
  mainDashboard(item): Observable<any> {
    const query = JSON.stringify(item);
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${
      this.env.loopbackApiUrl
    }/api/InvDashboards/mainDashboard?access_token=${accessToken}`;
    const res = this.http.post(url_api, query, { headers: this.headers });
    // console.warn('Dashboard......' , url_api, query);
    
    return res;
  }
}
