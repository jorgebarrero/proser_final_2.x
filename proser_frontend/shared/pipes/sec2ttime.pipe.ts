import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sec2ttime'
})
export class Sec2ttimePipe implements PipeTransform {


  transform(timeInSeconds) {
    let time_string: string = '';

    let time;
    let hours;
    let minutes;
    let seconds;
    let milliseconds;


    let pad = function(num, size) { return ('000' + num).slice(size * -1); };
    time = parseFloat(timeInSeconds).toFixed(3);
    hours = Math.floor(time / 60 / 60);
    minutes = Math.floor(time / 60) % 60;
    seconds = Math.floor(time - minutes * 60);
    milliseconds = time.slice(-3);

     //time_string = pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) + ',' + pad(milliseconds, 3);

     time_string = pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2) ;

     return time_string;
}

}
