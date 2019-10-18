import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { CrudUserbaseModel } from "./../CrudUserbase.model";

@Component({
  selector: "app-user-crud-userbase-header",
  templateUrl: "./crud-userbase-header.component.html",
  styleUrls: ["./crud-userbase-header.component.scss"]
})
export class CrudUserbaseHeaderComponent implements OnInit {
  @Output() exportData = new EventEmitter();
  @Input() crudRecord: CrudUserbaseModel;

  constructor() {}

  ngOnInit() {}

  onExport() {
    console.log('header');
    this.exportData.emit("export");
  }
}
