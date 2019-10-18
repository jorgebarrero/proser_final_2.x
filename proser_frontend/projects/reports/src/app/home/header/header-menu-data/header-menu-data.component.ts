import { Component, OnInit } from '@angular/core';
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-reports-header-menu-data',
  templateUrl: './header-menu-data.component.html',
  styleUrls: ['./header-menu-data.component.scss']
})
export class HeaderMenuDataComponent implements OnInit {
faFileAlt = faFileAlt;
  constructor() { }

  ngOnInit() {
  }

}
