import { Component, OnInit, Input } from "@angular/core";

import { CrudUserbaseModel } from './../CrudUserbase.model';

@Component({
  selector: "app-user-crud-userbase-header",
  templateUrl: "./crud-userbase-header.component.html",
  styleUrls: ["./crud-userbase-header.component.scss"]
})
export class CrudUserbaseHeaderComponent implements OnInit {
  @Input() crudRecord: CrudUserbaseModel;

  constructor() {}

  ngOnInit() {}
}
