import { Component, OnInit } from '@angular/core';
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-reports-header-menu-agents',
  templateUrl: './header-menu-agents.component.html',
  styleUrls: ['./header-menu-agents.component.scss']
})
export class HeaderMenuAgentsComponent implements OnInit {
  faFileAlt = faFileAlt;

  constructor() { }

  ngOnInit() {
  }

}
