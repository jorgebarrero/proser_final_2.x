import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-now-date',
  templateUrl: './now-date.component.html',
  styleUrls: ['./now-date.component.scss']
})
export class NowDateComponent implements OnInit {

  options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
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

