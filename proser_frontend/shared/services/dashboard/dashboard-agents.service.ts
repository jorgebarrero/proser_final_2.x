//  Angular

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import 'rxjs/operators';
import { Observable, of } from 'rxjs';



import { EnvService } from '../helpers/env.service';
import { UserSelectionModel } from 'shared/models';

@Injectable({
  providedIn: 'root'
})
export class DashboardAgentsService {
  

  constructor(private http: HttpClient, private env: EnvService) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

    // getMainDashboardItems
    agentsIndicators(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsIndicators?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('Dashboard......' , url_api, query);
      
      return res;
    }


    agentsPlannedList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsPlannedList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsConnectedList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsConnectedList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsEffectiveList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsEffectiveList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsAsignedList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsAsignedList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsBreakList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsBreakList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsAvailableList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsAvailableList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsOccupiedList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsOccupiedList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsLoggedList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsLoggedList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsBreakDetailList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsBreakDetailList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsAsignedDetailList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsAsignedDetailList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }


    /***************** */

    agentsAsignedHistoricList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsAsignedHistoricList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }

    agentsBreakHistoricList(item): Observable<any> {
      const query = JSON.stringify(item);
      const accessToken = localStorage.getItem('accessToken');
      const url_api = `${
        this.env.loopbackApiUrl
      }/api/InvDashboards/agentsBreakHistoricList?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, { headers: this.headers });
      // console.warn('inboundQueueList......' , url_api, query);
      
      return res;
    }
}
