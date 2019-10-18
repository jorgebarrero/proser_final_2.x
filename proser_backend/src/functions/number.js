const moment = require(`moment`);

function pad(num, size){
  let s = num + '';
  // eslint-disable-next-line no-const-assign
  while (s.length < size) { s = '0' + s; }
  return s;
}


module.exports = {
  pad

};
