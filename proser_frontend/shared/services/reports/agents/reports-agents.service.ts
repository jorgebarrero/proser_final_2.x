//  Angular

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { isNullOrUndefined } from 'util';

import 'rxjs/operators';
import { Observable } from 'rxjs';


import { EnvService } from '../../helpers/env.service';


@Injectable({
  providedIn: 'root'
})
export class ReportsAgentsService {


    constructor(
      private http: HttpClient,
      private env: EnvService
      ) {
      // this.conexionDesconexion_selected = new ConexionDesconexion();
    }

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  getAgentsConexList(userSelection): Observable<any> {


    const query = JSON.stringify(userSelection);

    const accessToken = localStorage.getItem('accessToken');

    const url_api = `${this.env.loopbackApiUrl}/api/InvReports/agentsConnectionDisconnectionReport?access_token=${accessToken}`;
    const res = this.http.post(url_api, query, {headers: this.headers});
      // console.warn('Operativo detallado......' , url_api, userSelection);
      
    return res;
    }

    getAgentsConexRecord(userSelection): Observable<any> {


      const query = JSON.stringify(userSelection);

      const accessToken = localStorage.getItem('accessToken');

      const url_api = `${this.env.loopbackApiUrl}/api/InvReports/agentsConnectionDisconnectionReport?access_token=${accessToken}`;
      const res = this.http.post(url_api, query, {headers: this.headers});
        // console.warn('Operativo detallado......' , url_api, userSelection);
        
      return res;
      }

    getAgentsAssignationList(userSelection): Observable<any> {


        const query = JSON.stringify(userSelection);
    
        const accessToken = localStorage.getItem('accessToken');
    
        const url_api = `${this.env.loopbackApiUrl}/api/InvReports/agentsAssignationReport?access_token=${accessToken}`;
        const res = this.http.post(url_api, query, {headers: this.headers});
          // console.warn('Operativo detallado......' , url_api, userSelection);
          
        return res;
        }
    
        getAgentsAssignationRecord(userSelection): Observable<any> {
    
    
          const query = JSON.stringify(userSelection);
    
          const accessToken = localStorage.getItem('accessToken');
    
          const url_api = `${this.env.loopbackApiUrl}/api/InvReports/agentsAssignationReport?access_token=${accessToken}`;
          const res = this.http.post(url_api, query, {headers: this.headers});
            // console.warn('Operativo detallado......' , url_api, userSelection);
            
          return res;
          }

          getAgentsBreakList(userSelection): Observable<any> {


            const query = JSON.stringify(userSelection);
        
            const accessToken = localStorage.getItem('accessToken');
        
            const url_api = `${this.env.loopbackApiUrl}/api/InvReports/agentsAuxiliarReport?access_token=${accessToken}`;
            const res = this.http.post(url_api, query, {headers: this.headers});
              // console.warn('Operativo detallado......' , url_api, userSelection);
              
            return res;
            }
        
            getAgentsBreakRecord(userSelection): Observable<any> {
        
        
              const query = JSON.stringify(userSelection);
        
              const accessToken = localStorage.getItem('accessToken');
        
              const url_api = `${this.env.loopbackApiUrl}/api/InvReports/agentsAuxiliarReport?access_token=${accessToken}`;
              const res = this.http.post(url_api, query, {headers: this.headers});
                // console.warn('Operativo detallado......' , url_api, userSelection);
                
              return res;
              }
}
