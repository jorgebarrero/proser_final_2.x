import { objectDateToTextDate, valueFromObject } from "./dateFunctions";

import moment from "moment";

export function dateAndTimeSqlQuery(
  userSelection,
  datetime_init_field_name,
  datetime_end_field_name
) {
  /*
   * returns sql where conditions related to date, time and last minutes
   */

  if (!datetime_end_field_name) {
    datetime_end_field_name = datetime_init_field_name;
  }

  let result = "";
  // convert dates to string
  let start_date = objectDateToTextDate(userSelection.start_date);
  let end_date = objectDateToTextDate(userSelection.end_date);
  // convert times to string
  let start_time = valueFromObject(userSelection.start_time, "00:00:00");
  let end_time = valueFromObject(userSelection.end_time, "24:00:00");

  if (userSelection.last_minutes) {
    let hms = userSelection.last_minutes.value;
    let a = hms.split(":");
    let minutes = +a[0] * 60 + +a[1];

    let start_time_last_minutes = moment()
      .subtract(minutes, "minutes")
      .format("HH:mm:ss");
    let end_time_last_minutes = moment().format("HH:mm:ss");
    start_time = start_time_last_minutes;
    end_time = end_time_last_minutes;

  }
  // create sql queries
  let date = `
  AND (
    DATE(${datetime_init_field_name}) BETWEEN '${start_date}' AND '${end_date}'
    OR
    DATE(${datetime_end_field_name}) BETWEEN '${start_date}' AND '${end_date}'
  ) `;
  let time = `AND TIME_TO_SEC(TIME(${datetime_init_field_name})) >= TIME_TO_SEC('${start_time}')
  AND  TIME_TO_SEC(TIME(${datetime_init_field_name})) < TIME_TO_SEC('${end_time}')`;

  result = date + "\n" + time + "\n";

  return result;
}

/******************************************************************** */

export function arrayToSqlQuery(data, field) {
  /*
   * extracts infro from json fields, returns if record is true or false
   * applies to only one type od data in json field
   */
  let result = data;
  let resultTemp;
  if (data && Array.isArray(data)) {
    resultTemp = data
      .map(x => {
        return field != undefined ? `${field} = ` + x.id : 1;
      })
      .join(" OR ");
    data.length > 0 ? (data = "AND (" + resultTemp + ")") : "";
    result = data;
  } else {
    result = "";
  }

  return result;
}

/******************************************************************** */

export function arrayToSqlQueryOr(data, field) {
  /*
   * extracts infro from json fields, returns if record is true or false
   * applies to only one type od data in json field
   */
  let result = data;
  let resultTemp;
  if (data && Array.isArray(data)) {
    resultTemp = data
      .map(x => {
        return field != undefined ? `${field} = ` + x.id : 1;
      })
      .join(" OR ");
    data.length > 0 ? (data = "OR (" + resultTemp + ")") : "";
    result = data;
  } else {
    result = "";
  }

  return result;
}

/******************************************************************** */

export function arrayToJsonSqlQuery(data, field, property) {
  /*
   * extracts infro from json fields, returns if record is true or false
   * can handle several properties in the same json field
   * - property is optional
   */
  let result = data;

  let resultTemp;
  if (data && Array.isArray(data)) {
    resultTemp = data
      .map(x => {
        return field != undefined
          ? `JSON_CONTAINS(JSON_EXTRACT(${field}, '$.${property}[*].id'), ` +
              x.id +
              `)`
          : " ";
      })
      .join(" OR ");
    data.length > 0 ? (data = "AND (" + resultTemp + ")") : "";
    result = data;
  }

  return result;
}

/************************************************************** */

export function sqlIntervalSqlQuery(userSelection, datetime_field_name) {
  /*
   * Inserts interval fields in the select statment when interval applies
   */
  let result = "1";

  let interval =
    userSelection.interval !== null ? userSelection.interval.minute : "";

  if (userSelection && datetime_field_name && interval) {
    return `
    (ROUND(ROUND(TIME_TO_SEC(TIME(${datetime_field_name})) /60, 0)/${interval}, 0) - 1) AS interval_init
    ,(ROUND(ROUND(TIME_TO_SEC(TIME(${datetime_field_name})) /60, 0)/${interval}, 0)) AS interval_finish

    ,SEC_TO_TIME((ROUND(ROUND(TIME_TO_SEC(TIME(${datetime_field_name})) /60, 0)/${interval}, 0) - 1) *${interval} *60) AS interval_start
    ,SEC_TO_TIME((ROUND(ROUND(TIME_TO_SEC(TIME(${datetime_field_name})) /60, 0)/${interval}, 0)) *${interval} *60) AS interval_end
    `;
  }

  return result;
}

/**************************************************** */

export function sqlIntervalGroupSqlQuery(userSelection) {
  /*
   * Send the group string if interval applies
   */
  let result = "";

  let interval_text =
    userSelection.interval !== null ? "GROUP BY interval_init" : "";

  result = interval_text;

  return result;
}



/************************************************************** */

export function sqlModalView(modalView) {
  /*
   * Inserts interval fields in the select statment when interval applies
   */
  let result = null;

  
  if (modalView === 'recibida') {
    return `
    (callentry_status = 'abandonada' OR callentry_status = 'terminada')
    `;
  } else if (modalView === 'atendida') {
    return `
    callentry_status = 'terminada'
    `;
  } else if (modalView === 'abandonada') {
    return `
    callentry_status = 'abandonada'
    `;
  } else if (modalView === 'corta') {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME}
    `;
  } else if (modalView === 'antes tiempo ideal') {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}
    `;
  } else if (modalView === 'despues tiempo ideal') {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_duration_sec_wait > ${process.env.CDR_SERVICE_IDEAL_TIME}
    `;
  }else if (modalView === 'colgada por agente') {
    return `
    (callentry_status = 'terminada')
    AND
    callentry_hung_agent = 1
    `;
  } else if (modalView === 'activa') {
    return `
    rcc_callentry_status = 'activa'
    `;
  } else if (modalView === 'en-cola') {
    return `
    rcc_callentry_status = 'en-cola'
    `;
  } else if (modalView === 'conectado') {
    return `
    rca_agent_status = 'Logueado'
    `;
  } else if (modalView === 'efectivo') {
    return `
    rca_agent_status = 'Logueado'
    AND
    (rca_group_name = 'Disponible' or rca_group_name = 'Ocupado')
    `;
  } else if (modalView === 'ocupado') {
    return `
    rca_agent_status = 'Logueado'
    AND
    (rca_group_name = 'Ocupado')
    `;
  } else if (modalView === 'disponible') {
    return `
    rca_agent_status = 'Logueado'
    AND
    (rca_group_name = 'Disponible')
    `;
  } else if (modalView === 'asignado') {
    return `
    rcb_break_productivity = 1
    `;
  } else if (modalView === 'auxiliar') {
    return `
    rcb_break_productivity = 0
    `;
  } else if (modalView === 'auxiliar-historico') {
    return `
    inv_break_productivity = 0
    AND
    audit_break_id is not null
    `;
  } else if (modalView === 'asignado-historico') {
    return `
    inv_break_productivity = 1
    AND
    audit_break_id is not null
    `;
  } else if (modalView === 'saliente-realizada') {
    return `
    cdr_call_made = 1
    `;
  } else if (modalView === 'saliente-fallida') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_fail = 1
    `;
  } else if (modalView === 'saliente-contestada') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_answered = 1
    `;
  } else if (modalView === 'saliente-efectiva') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_efective = 1
    `;
  } else if (modalView === 'saliente-colgada') {
    return `
    cdr_call_made = 1
    AND
    cdr_call_hungout = 1
    `;
  } else if (modalView === null) {
    return `1`;
  }

  return result;
}