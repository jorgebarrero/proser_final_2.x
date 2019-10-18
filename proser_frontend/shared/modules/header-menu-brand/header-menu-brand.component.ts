import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

@Component({
  selector: "header-menu-brand",
  templateUrl: "./header-menu-brand.component.html",
  styleUrls: ["./header-menu-brand.component.scss"]
})
export class HeaderMenuBrandComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onBrand() {
    this.router.navigate(["/init/home/"]);
  }
}
