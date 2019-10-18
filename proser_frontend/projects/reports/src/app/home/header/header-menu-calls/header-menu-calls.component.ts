import { Component, OnInit } from '@angular/core';
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-reports-header-menu-calls',
  templateUrl: './header-menu-calls.component.html',
  styleUrls: ['./header-menu-calls.component.scss']
})
export class HeaderMenuCallsComponent implements OnInit {
faFileAlt = faFileAlt;
  constructor() { }

  ngOnInit() {
  }

}
