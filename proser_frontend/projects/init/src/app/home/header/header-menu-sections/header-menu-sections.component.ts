import { Component, OnInit, Input } from "@angular/core";

import {
  faDigitalTachograph,
  faChartArea,
  faSwatchbook,
  faMarker,
  faEye,
  faMagic,
  faUserTie
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-init-header-menu-sections",
  templateUrl: "./header-menu-sections.component.html",
  styleUrls: ["./header-menu-sections.component.scss"]
})
export class HeaderMenuSectionsComponent implements OnInit {
  faDigitalTachograph = faDigitalTachograph;
  faChartArea = faChartArea;
  faSwatchbook = faSwatchbook;
  faMarker = faMarker;
  faEye = faEye;
  faMagic = faMagic;
  faUserTie = faUserTie;

  @Input() showInMenu;
  constructor() {}

  ngOnInit() {}
}
