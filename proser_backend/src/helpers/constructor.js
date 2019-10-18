// let input = {
//     field:[
//         "(cdr_dates_week_day_name) AS 'Dia'",
//         "(cdr_date) AS 'Fecha Desde'",
//         "MIN(cdr_dates_time) AS 'Hora inicio'",
//         "MAX(cdr_dates_time) AS 'Hora final'",
//         "SUM(cdr_call_received) AS 'Llamadas recibidas'",
//         "SUM(cdr_call_abandoned) AS 'Llamadas abandonadas'",
//         "SUM(cdr_call_atended) AS 'Llamadas atendidas'",
//         "SUM(cdr_call_short) AS 'Llamadas cortas'",
//         "SUM(cdr_call_before_time) AS 'Llamadas antes de 20'",
//         "SUM(cdr_call_before_time) AS 'Llamadas colgadas'",
//         "SUM(cdr_call_before_time)/SUM(cdr_call_received) AS 'Nivel servicios'",
//         "SUM(cdr_call_atended)/SUM(cdr_call_received) AS 'Nivel atencion'",
//         "SUM(cdr_call_abandoned)/SUM(cdr_call_received) AS 'Nivel abandono'",
//         "SUM(cdr_qlog_secs_at_operation) AS 'Segundos operacion'",
//         "SEC_TO_TIME(SUM(cdr_qlog_secs_at_operation)) AS 'Tiempo operacion'",
//         "SUM(cdr_duration_wait) AS 'Segundos espera'"
//     ],
//     table:[
//         "MainCdr"
//     ],
//     filter:[
//         "cdr_date='2018-11-23'"
//     ],
//     group:[
//         "cdr_dates_week_day_name"
//     ],
//     order:[
        
//     ],
//     limit:[
        
//     ]
// };

function detailQuery(arg){

  let result = null;

  let field = validateField(arg) ? arg.field : "";
  let table = validateTable(arg) ? arg.table : "";
  let filter = validateFilter(arg) ? arg.filter : "";
  let staticFilter = validatedatabaseFilter(arg) ? arg.databaseFilter : "1";
  let group = validateGroup(arg) ? arg.group : "";
  let order = validateOrder(arg) ? arg.order : "";
  let limit = validateLimit(arg) ? arg.limit :"";


  let filterBy = validateFilter(arg) ? "WHERE" : "";
  let groupBy = validateGroup(arg) ? "GROUP BY" : "";
  let orderBy = validateOrder(arg) ? "ORDER BY" : "";
  let limitBy = validateLimit(arg) ? "LIMIT" : "";


  if (field && table){

    let queryDetail = `
    
    SELECT "DETAIL" as row, ${field} FROM ${table}
    ${filterBy} ${staticFilter} AND ${filter} ${groupBy} ${group}
    ${orderBy} ${order} ${limitBy} ${limit}
    `;
   
    // console.log(querySQL);
    result = queryDetail;
  }

  return result;

}

function totalQuery(arg1, arg2){

  let result = null;

  let fieldTotal = arg1.total;
  let filterBy = validateFilter(arg1) ? "WHERE" : "";
  let filter = validateFilter(arg1) ? arg1.filter : "";
  let queryDetail = arg2;

  if (fieldTotal){

    let queryTotal = `
    
    SELECT "TOTAL" as row, ${fieldTotal} FROM (${queryDetail}) as detail
    `;

    // console.log(querySQL);
    result = queryTotal;
  }

  return result;

}


function validateField(arg){

  let result = false;

  if (arg.field){

    if (arg.field.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}


function validateTable(arg){

  let result = false;

  if (arg.table){
    
    if (arg.table.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}


function validateFilter(arg){

  let result = false;

  if (arg.filter){

    if (arg.filter.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}

function validatedatabaseFilter(arg){

  let result = false;

  if (arg.databaseFilter){

    if (arg.databaseFilter.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}


function validateGroup(arg){

  let result = false;

  if (arg.group){

    if (arg.group.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}


function validateOrder(arg){

  let result = false;

  if (arg.order){

    if (arg.order.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}


function validateLimit(arg){

  let result = false;

  if (arg.limit){

    if (arg.limit.length > 0){
      return true;
    } else {
      result = false;
    }
  }
  return result;
}



// let xxx = mainQuery(input);
// console.log(xxx);
// let valid = validateField(input);
// console.log(valid);

export { detailQuery, totalQuery };
