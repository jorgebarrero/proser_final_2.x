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

export class ReportsCallsService {

  constructor(
    private http: HttpClient,
    private env: EnvService
    ) {
   
  }

headers: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
});


getInboundDaily(userSelection): Observable<any> {

  // const query = JSON.stringify(userSelection);

  const accessToken = localStorage.getItem('accessToken');

  const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsInboundDailyReport?access_token=${accessToken}`;
  const res = this.http.post(url_api, userSelection, {headers: this.headers});
    // console.warn('Detalle de llamadas diarias ......' , url_api, userSelection);
    
  return res;
  }

  getInboundDailyRecord(userSelection): Observable<any> {

    // const query = JSON.stringify(userSelection);
  
    const accessToken = localStorage.getItem('accessToken');
  
    const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsInboundDailyReport?access_token=${accessToken}`;
    const res = this.http.post(url_api, userSelection, {headers: this.headers});
      console.warn('Detalle de llamadas diarias ......' , url_api, userSelection);
      
    return res;
    }

getInboundDetail(userSelection): Observable<any> {

      // const query = JSON.stringify(userSelection);
    
      const accessToken = localStorage.getItem('accessToken');
    
      const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsDetailReport?access_token=${accessToken}`;
      const res = this.http.post(url_api, userSelection, {headers: this.headers});
        console.warn('Detalle de llamadas diarias ......' , url_api, userSelection);
        
      return res;
      }
    
  getInboundDetailRecord(userSelection): Observable<any> {
    
        // const query = JSON.stringify(userSelection);
      
        const accessToken = localStorage.getItem('accessToken');
      
        const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsDetailReport?access_token=${accessToken}`;
        const res = this.http.post(url_api, userSelection, {headers: this.headers});
          console.warn('Detalle de llamadas diarias ......' , url_api, userSelection);
          
        return res;
        }

    getOutboundDaily(userSelection): Observable<any> {

          // const query = JSON.stringify(userSelection);
        
          const accessToken = localStorage.getItem('accessToken');
        
          const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsOutboundDailyReport?access_token=${accessToken}`;
          const res = this.http.post(url_api, userSelection, {headers: this.headers});
            console.warn('Detalle de llamadas diarias ......' , url_api, userSelection);
            
          return res;
          }
        
    getOutboundDailyRecord(userSelection): Observable<any> {
        
            // const query = JSON.stringify(userSelection);
          
            const accessToken = localStorage.getItem('accessToken');
          
            const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsOutboundDailyReport?access_token=${accessToken}`;
            const res = this.http.post(url_api, userSelection, {headers: this.headers});
              console.warn('Detalle de llamadas diarias ......' , url_api, userSelection);
              
            return res;
            }

    getAutomaticDailyList(userSelection): Observable<any> {

              // const query = JSON.stringify(userSelection);
            
              const accessToken = localStorage.getItem('accessToken');
            
              const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsAutomaticDailyReport?access_token=${accessToken}`;
              const res = this.http.post(url_api, userSelection, {headers: this.headers});
                console.warn('Detalle de llamadas automaticas diarias ......' , url_api, userSelection);
                
              return res;
              }
            
    getAutomaticDailyRecord(userSelection): Observable<any> {
            
                // const query = JSON.stringify(userSelection);
              
                const accessToken = localStorage.getItem('accessToken');
              
                const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsAutomaticDailyReport?access_token=${accessToken}`;
                const res = this.http.post(url_api, userSelection, {headers: this.headers});
                  console.warn('Detalle de llamadas automaticas diarias ......' , url_api, userSelection);
                  
                return res;
                }

        getInboundDailyByIntervalList(userSelection): Observable<any> {

              // const query = JSON.stringify(userSelection);
            
              const accessToken = localStorage.getItem('accessToken');
            
              const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsInboundDailyByIntervalReport?access_token=${accessToken}`;
              const res = this.http.post(url_api, userSelection, {headers: this.headers});
                console.warn('Detalle de llamadas automaticas diarias ......' , url_api, userSelection);
                
              return res;
              }
            
          getInboundDailyByIntervalRecord(userSelection): Observable<any> {
            
                // const query = JSON.stringify(userSelection);
              
                const accessToken = localStorage.getItem('accessToken');
              
                const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsInboundDailyByIntervalReport?access_token=${accessToken}`;
                const res = this.http.post(url_api, userSelection, {headers: this.headers});
                  console.warn('Detalle de llamadas automaticas diarias ......' , url_api, userSelection);
                  
                return res;
                }

      getAbandonedlList(userSelection): Observable<any> {

        // const query = JSON.stringify(userSelection);
      
        const accessToken = localStorage.getItem('accessToken');
      
        const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsAbandonedReport?access_token=${accessToken}`;
        const res = this.http.post(url_api, userSelection, {headers: this.headers});
          console.warn('Detalle de llamadas automaticas diarias ......' , url_api, userSelection);
          
        return res;
        }
      
    getAbandonedRecord(userSelection): Observable<any> {
      
          // const query = JSON.stringify(userSelection);
        
          const accessToken = localStorage.getItem('accessToken');
        
          const url_api = `${this.env.loopbackApiUrl}/api/InvReports/callsAbandonedReport?access_token=${accessToken}`;
          const res = this.http.post(url_api, userSelection, {headers: this.headers});
            console.warn('Detalle de llamadas automaticas diarias ......' , url_api, userSelection);
            
          return res;
          }
}
