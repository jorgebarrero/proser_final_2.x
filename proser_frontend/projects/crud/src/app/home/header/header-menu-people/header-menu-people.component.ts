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
  faUserClock,
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
  selector: 'app-crud-header-menu-people',
  templateUrl: './header-menu-people.component.html',
  styleUrls: ['./header-menu-people.component.scss']
})
export class HeaderMenuPeopleComponent implements OnInit {

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
faUserClock=faUserClock

  constructor() { }

  ngOnInit() {
  }

}
