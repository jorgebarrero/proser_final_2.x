import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekDay'
})
export class WeekDayPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let result = '';

    if (value === 1) {
      result = 'lun';
    }
    if (value === 2) {
      result = 'mar';
    }
    if (value === 3) {
      result = 'mie';
    }
    if (value === 4) {
      result = 'jue';
    }
    if (value === 5) {
      result = 'vie';
    }
    if (value === 6) {
      result = 'sab';
    }
    if (value === 7) {
      result = 'dom';
    }

    return result;
  }

}
