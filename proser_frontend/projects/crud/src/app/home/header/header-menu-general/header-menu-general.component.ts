import { Component, OnInit } from "@angular/core";
import {
  faLaptop,
  faPalette,
  faClock,
  faList,
  faStream,
  faUserTie,
  faUsers,
  faUsersCog,
  faUserTag,
  faStreetView,
  faUtensils,
  faCalendarAlt,
  faCalendar,
  faIndustry,
  faCommentDots,
  faConciergeBell,
  faCrosshairs,
  faChartLine,
  faFileSignature
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-crud-header-menu-general",
  templateUrl: "./header-menu-general.component.html",
  styleUrls: ["./header-menu-general.component.scss"]
})
export class HeaderMenuGeneralComponent implements OnInit {
  faLaptop = faLaptop;
  faPalette = faPalette;
  faClock = faClock;
  faList = faList;
  faStream = faStream;
  faUserTie = faUserTie;
  faUsers = faUsers;
  faUsersCog = faUsersCog;
  faUserTag = faUserTag;
  faStreetView = faStreetView;
  faUtensils = faUtensils;
  faCalendarAlt = faCalendarAlt;
  faCalendar = faCalendar;
  faIndustry = faIndustry;
  faCommentDots = faCommentDots;
  faConciergeBell = faConciergeBell;
  faCrosshairs = faCrosshairs;
  faChartLine = faChartLine;
  faFileSignature = faFileSignature;

  constructor() {}

  ngOnInit() {}
}
