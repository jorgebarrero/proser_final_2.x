import { Component, OnInit, Input } from "@angular/core";

import { IMenu } from "./imenu.model";

@Component({
  selector: "header-menu",
  templateUrl: "./header-menu.component.html",
  styleUrls: ["./header-menu.component.scss"]
})
export class HeaderMenuComponent implements OnInit {
  @Input() menuItems;

  constructor() {}

  ngOnInit() {}
}
