import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-now-time',
  templateUrl: './now-time.component.html',
  styleUrls: ['./now-time.component.scss']
})
export class NowTimeComponent implements OnInit {

  options = {
    weekday: undefined,
    year: undefined,
    month: undefined,
    day: undefined,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };

  time;


  constructor() { }

  ngOnInit() {

    this.time = new Observable<string>(
      (observer: Subscriber<string>) => {
      setInterval(() => observer
      .next( this.newDate() ), 1000);
    });
  }



  newDate () {
    const myDate = moment().format('h:mm:ss a');
    return myDate;
  }


}

//       .next(new Date().toLocaleDateString('es-US', this.options)), 1000);
