import moment from "moment";

function cdr_type_int_ext( src, dst) {

  let result = null;
  let largo_src = null;
  let largo_dst = null;
  
  if( src && dst) {
    largo_src = src.length;
    largo_dst = dst.length;
  }

  // console.log('data', src, dst);
  // console.log('data', largo_src, largo_dst);

  if ((largo_src <= 7 && largo_dst <= 7) || (src == dst && largo_src <= 7)) {
    return result = `Interna`;
  } else {
    return result = `Externa`;
  }

// return result;
}


function cdr_type_out_ent( src, dst, int_ext, lastapp) {

  let result = null;

  let largo_src = src.length;
  let largo_dst = dst.length;

  if (int_ext == `Interna`) {
    return result = `Interna`;
  }
  if (int_ext == `Externa` && largo_src < largo_dst) {
    return result = `Saliente`;
  }
  if (lastapp == `Queue`) {
    return result = `Entrante`;
  } else {
    return result = `Interna`;
  }
  // return result;
}
function cdr_type_in_out_empty( sal_ent, src ) {
  let result = null;
  if (sal_ent == `Saliente` && (src == `` || src == null) ) {
    return result = `Vacia`;
  } else {
    return result = sal_ent;
  }
  // return result;
}

function cdr_type_in_out( cdr_type_in_out_empty, lastapp ) {
  let result = null;
  if (cdr_type_in_out_empty == `Entrante` && lastapp == `Queue`) {
    return result = `Entrante`;
  } else {
    return result = cdr_type_in_out_empty;
  }
  // return result;
}

function cdr_type_prod( cdr_type_in_out, dst, src ) {

  let result = `Sistema`;

  if (src === `anonymous`) {
    result = `Productiva`;
  } else {

    if (cdr_type_in_out == `Interna` || cdr_type_in_out == `Vacia`) {
      result = `Sistema`;
    }

    if (dst.length == 1 || dst == `hangup` || dst == `hang` || (src == `anonymous` && `recordingfile` == ``)) {
      result = `Sistema`;
    } else {
      result = `Productiva`;
    }
  }
  return result;
}


function cdr_type_prod_call( cdr_type_in_out_empty, cdr_type_prod ) {

  let result = null;
  if (cdr_type_in_out_empty == `Vacia` || cdr_type_prod == `Vacia`) {
    return result = `Sistema`;
  } else {
    return result = cdr_type_prod;
  }
  // return result;
}


function cdr_type_ext_in_long( cdr_type_in_out, dstchannel ) {

  // console.log('cdr_type_in_out', cdr_type_in_out, 'dstchannel', dstchannel );

  let result = null;
  if (cdr_type_in_out == `Entrante` && dstchannel.substring(0, 6) == `Agent/`) {
    return result = dstchannel.substring(6, 10);
  }

  if (cdr_type_in_out == `Entrante` && dstchannel.substring(0, 6) == `Agent/`) {
    return result = dstchannel.substring(6, 10);
  }


  if (cdr_type_in_out == `Entrante`) {
    let temp = result = dstchannel.match(/\/(.*?)-/g);
    if(temp) {
      return result = temp.map( x => {
        return x.substring(1, x.length-1);
      });
    }
  }
  return result;
}


function cdr_type_ext_in( cdr_type_ext_in_long ) {

  let result = cdr_type_ext_in_long;

  return result;
}


function cdr_type_ext_out( cdr_type_in_out, src) {

  let result = null;
  if (cdr_type_in_out == `Saliente`) {
    return result = src;
  }
  return result;

}



function cdr_type_queue( lastapp, cdr_type_in_out, cdr_type_prod, dst ) {
  let result = null;

  if (lastapp == `Queue`) {
    if (cdr_type_in_out == `Entrante` && cdr_type_prod == `Productiva`) {
      return result = dst;
    }
  }
  return result;

}

function cdr_type_extension( cdr_type_ext_in, cdr_type_ext_out ) {
  // console.log('ext_ent', ext_ent, 'ext_sal', ext_sal);
  let result = null;

  if (cdr_type_ext_in) {
    return result = cdr_type_ext_in; //JSON.parse(JSON.stringify(cdr_type_ext_in))[0]; //ext_ent
  }
  if (cdr_type_ext_out) {
    return result = cdr_type_ext_out; // ext_sal
  }
  
  return result;
}

function cdr_type_tel_number(cdr_type_in_out_empty, dst, src) {
  let result = null;
  if (cdr_type_in_out_empty == `Saliente`) {
    return result = dst;
  }
  if (cdr_type_in_out_empty == `Entrante`) {
    result = src;
  } else {
    return result = null;
  }
  return result;
}

/************************************************************************* */


//cdr_dates_aaaa_mm_dd - day of the month
function cdr_type_date_text(date) {
  let  result = null;

  if (date) {
    let temp = moment(date).format(`YYYY-MM-DD`);
    result = temp;
  }

  return result;
}

//cdr_type_hca_agent_id -  daily key
function cdr_type_hca_agent_id(date, extension) {
  let  result = null;

  if (date && extension) {
    let temp = moment(date).format(`YYYY-MM-DD`) + `-agt-` + extension;
    result = temp;
  }

  return result;
}


//cdr_type_hca_agent_id -  daily key
function cdr_type_hca_queue_id(date, queue) {
  let  result = null;

  if (date && queue) {
    let temp = moment(date).format(`YYYY-MM-DD`) + `-que-` + queue;
    result = temp;
  }

  return result;
}


module.exports = {

  cdr_type_int_ext,
  cdr_type_out_ent,
  cdr_type_in_out_empty,
  cdr_type_in_out,
  cdr_type_prod,
  cdr_type_prod_call,
  cdr_type_ext_in_long,
  cdr_type_ext_in,
  cdr_type_ext_out,
  cdr_type_queue,
  cdr_type_extension,
  cdr_type_tel_number,

  cdr_type_date_text,
  cdr_type_hca_agent_id,
  cdr_type_hca_queue_id,
  
};
