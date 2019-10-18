import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/map';
import { Observable } from "rxjs";

import * as FileSaver from "file-saver";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DownloadService {
  constructor(private http: HttpClient) {}

  export(url) {
    return this.http.get(url, { responseType: "blob" });
  }

  handleError() {
    ("Error downloading file");
  }
}
