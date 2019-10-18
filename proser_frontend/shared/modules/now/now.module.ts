import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NowComponent } from './now.component';
import { NowTimeComponent } from './now-time/now-time.component';
import { NowDateComponent } from './now-date/now-date.component';
import { NowUserComponent } from './now-user/now-user.component';

@NgModule({
  imports: [ CommonModule, RouterModule ],
  declarations: [ NowComponent, NowTimeComponent, NowDateComponent, NowUserComponent ],
  exports: [ NowComponent, NowTimeComponent, NowDateComponent, NowUserComponent ]
})
export class NowModule { }
