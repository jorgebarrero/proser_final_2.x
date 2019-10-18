import { Component, OnInit } from '@angular/core';
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
  faFileSignature,


 } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-crud-header-menu-planning',
  templateUrl: './header-menu-planning.component.html',
  styleUrls: ['./header-menu-planning.component.scss']
})
export class HeaderMenuPlanningComponent implements OnInit {

faLaptop = faLaptop
faPalette = faPalette
faClock = faClock
faList = faList
faStream = faStream
faUserTie = faUserTie
faUsers = faUsers
faUsersCog = faUsersCog
faUserTag = faUserTag
faStreetView = faStreetView
faUtensils = faUtensils
faCalendarAlt = faCalendarAlt
faCalendar = faCalendar
faIndustry = faIndustry
faCommentDots = faCommentDots
faConciergeBell = faConciergeBell
faCrosshairs = faCrosshairs
faChartLine = faChartLine
faFileSignature = faFileSignature

  constructor() { }

  ngOnInit() {
  }

}
