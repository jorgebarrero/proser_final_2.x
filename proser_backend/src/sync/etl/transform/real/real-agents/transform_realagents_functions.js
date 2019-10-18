const moment = require(`moment`);


function rca_break_duration( end, start) {
  // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.

  let a = moment(start);
  let b = moment(end);
  // const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  // const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  // return Math.floor((utc2 - utc1) / _MS_PER_DAY);

  var diffDays = b.diff(a, 'seconds');


  const formatted = moment.utc(diffDays*1000).format('HH:mm:ss');


  return  diffDays;
}


function rca_time_duration( end, start) {
  // const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.

  let a = moment(start);
  let b = moment(end);
  // const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  // const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  // return Math.floor((utc2 - utc1) / _MS_PER_DAY);

  var diffDays = b.diff(a, 'seconds');


  const formatted = moment.utc(diffDays*1000).format('YYYY-MM-DD HH:mm:ss');


  return  formatted;
}

function rca_group_name(breaks, rca_productivity, rca_break_id, rca_call_id, rca_call_status, rca_call_uniqueid){


  let result = null;
  let productivity = null;

  if( rca_break_id ) {
    let temp  = breaks
      .filter(x => {
        return x.inv_break_id === rca_break_id;
      })
      .map(x => {
        return x.inv_break_productivity;
      });
    // console.log('temp', temp);
    productivity = temp[0];
  }

  
  result = productivity;
  rca_call_uniqueid === null && productivity === '0'  && rca_break_id !== null ?  result = 'Auxiliar' : null;
  rca_call_uniqueid === null && productivity === '1' && rca_break_id !== null ? result = 'Asignado' : null;
  rca_call_status === 'activa'? result =  'Ocupado': null;
  productivity === null && rca_break_id === null && rca_call_status !== 'activa' ? result =  'Disponible' : null;



  return result;
  
}


function rca_productivity(breaks, rca_break_id){
  
  let result = null;

  if( rca_break_id ) {
    let temp  = breaks
      .filter(x => {
        return x.inv_break_id === rca_break_id;
      })
      .map(x => {
        return x.inv_break_productivity;
      });
    // console.log('temp', temp);
    result = temp[0];
  }

  return result;
  
}


function rca_subgroup_name(breaks, rca_break_id){
  
  let result = null;
  let productivity = null;

  if( rca_break_id ) {
    let temp  = breaks
      .filter(x => {
        return x.inv_break_id === rca_break_id;
      })
      .map(x => {
        return x.inv_break_productivity;
      });
    // console.log('temp', temp);
    let productivity =  temp[0];
  }


  if (productivity === 0) {
    result = 'Auxiliar';
  } else if (productivity === 1) {
    result = 'Asignado';
  }

  
  return result;
  
}



function rca_agent_status(rca_break_datetime_end, rca_call_datetime_end) {

  let result = null;

  if(rca_break_datetime_end === null && rca_call_datetime_end === null) {
    result = null;
  } else {
    result = 'terminated';
  }

  return result;

}


module.exports = {

  rca_break_duration,
  rca_time_duration,
  rca_group_name,
  rca_productivity,
  rca_subgroup_name,
  rca_agent_status,

};
