import { Component, OnInit } from '@angular/core';
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-reports-header-menu-operation',
  templateUrl: './header-menu-operation.component.html',
  styleUrls: ['./header-menu-operation.component.scss']
})
export class HeaderMenuOperationComponent implements OnInit {
faFileAlt = faFileAlt;
  constructor() { }

  ngOnInit() {
  }

}
