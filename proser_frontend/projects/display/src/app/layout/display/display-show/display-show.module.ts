import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayShowRoutingModule } from './display-show-routing.module';
import { DisplayShowComponent } from './display-show.component';


@NgModule({
  declarations: [DisplayShowComponent],
  imports: [
    CommonModule,
    DisplayShowRoutingModule
  ]
})
export class DisplayShowModule { }
