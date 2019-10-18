import { Injectable } from '@angular/core';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecordingfileService {

  constructor(
    private http: HttpClient

  ) { }


  export( url ) {
    ('url', url);
    return this.http.get(url, {responseType: 'blob'});
}

  // downloadFile(id): Observable<Blob> {

    // let options = new RequestOptions({responseType: ResponseContentType.Blob });

    // return this.http.get(this._baseUrl + '/' + id, options)
    //     .map(res => res.blob())
    //     .catch(this.handleError)
// }


handleError() {
  console.error('Error downloading file');
}


}