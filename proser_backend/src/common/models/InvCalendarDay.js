'use strict';
import * as calendarHollydays from '../queries/InvCalendarDays/calendarHollydays';

module.exports = function(InvCalendar) {

  InvCalendar.queryCalendarDay = async function(userSelection) {
    return calendarHollydays.queryCalendarDay(userSelection);
  };

  InvCalendar.remoteMethod('queryCalendarDay', {
    accepts: {arg: 'userSelection', type: 'Filter', http: { source: 'body'} },
    returns: {type: 'array', root: 'true'},
    description: ["Return principal values to dashboard"]
  });
  

};
