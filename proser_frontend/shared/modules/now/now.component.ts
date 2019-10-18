import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-now',
  template: `
  <div>
  {{ time | async }}
  </div>
`,
  styleUrls: ['./now.component.scss']
})
export class NowComponent implements OnInit {

  options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric' ,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  time = new Observable<string>(
    (observer: Subscriber<string>) => {
    setInterval(() => observer
      .next(new Date().toLocaleDateString('es-US', this.options)), 1000);
  });

  constructor() { }

  ngOnInit() {
  }


  }



