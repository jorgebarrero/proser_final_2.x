const moment = require('moment');
var _ = require('lodash');


let mycdr = [
  { calldate: '2018-01-09 15:18:32' },
  { calldate: '2017-01-10 10:17:19' },
  { calldate: '2018-01-12 06:18:15' },
  { calldate: '2018-01-15 11:18:17' },
  { calldate: '2018-02-01 10:18:33' },
  { calldate: '2019-01-30 08:18:10' }
];

let myNumbers =  [
  { id: 5154 },
  { id: 4525 },
  { id: 1745 },
  { id: 9584 },
  { id: 2581 },
  { id: 5825 }
];

function minMaxCalldate (cdr) {

  console.log('cdr', cdr);

  let dates = cdr.
    map(x => {
      let a = new Date(x.calldate);
      return a;
    });
  let minDate = moment(_.min(dates)).format('YYYY-MM-DD');
  let maxDate = moment(_.max(dates)).format('YYYY-MM-DD');
  return { min: minDate, max: maxDate};
}

function minMaxId (cdr) {

  console.log('cdr', cdr);

  let num = cdr.
    map(x => {
      let a = (x.id);
      return a;
    });
  let minNum= _.min(num);
  let maxNum = _.max(num);
  return { min: minNum, max: maxNum};
}

// console.log(minMaxCalldate(mycdr));
// console.log(minMaxId(myNumbers));

module.exports = {
  minMaxCalldate,
  minMaxId
};
