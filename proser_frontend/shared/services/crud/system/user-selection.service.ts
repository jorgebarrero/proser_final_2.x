import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { throwError, Observable } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

import { EnvService } from "shared/services/helpers/env.service";
import { UserSelectionModel } from "shared/models/";
import { stringifySelection } from "shared/functions";

@Injectable({
  providedIn: "root"
})
export class UserSelectionService {
  api_string = "/api/InvMenus";

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

  getUserSelectionMenus(
    selection: UserSelectionModel
  ): Observable<UserSelectionModel> {
    let query = JSON.stringify(selection);

    const accessToken = localStorage.getItem("accessToken");
    let filter;
    if (query) {
      filter = `?filter=${query}&access_token=${accessToken}`;
    } else {
      filter = `?access_token=${accessToken}`;
    }
    const url_api = `${this.env.loopbackApiUrl}${this.api_string}/userSelectionMenu${filter}`;
    return this.http
      .post<UserSelectionModel>(url_api, query, { headers: this.headers })
      .pipe(
        map(data => data),
        catchError(this.handleError)
      );
  }

  readUserSelection(local_store?): UserSelectionModel {
    let userSelection = new UserSelectionModel();
    let proser_store = { userSelection: userSelection };
    let proser_store_temp;
    let userSelection_temp;

    try {
      proser_store_temp = JSON.parse(localStorage.getItem(`proser_store`));
      userSelection_temp = proser_store_temp["userSelection"];

      if (proser_store_temp === null) {
        localStorage.setItem(`proser_store`, JSON.stringify(proser_store));
      } else {
        proser_store.userSelection = userSelection_temp;
        userSelection = userSelection_temp;
      }
    } catch (e) {
      userSelection = new UserSelectionModel();
      proser_store = { userSelection: userSelection };
      localStorage.setItem(`proser_store`, JSON.stringify(proser_store));
    }
    return userSelection;
  }

  writeUserSelection(userSelection, local_store?) {
    let proser_store = { userSelection: userSelection };
    localStorage.setItem(`proser_store`, JSON.stringify(proser_store));
    return userSelection;
  }
}
