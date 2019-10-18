export function sqlDateQueries(filter, field) {
  let result = filter;

  if (filter && filter.last_minutes !== "") {
    result = `
        AND
        -- FILTER BY DATE
        DATE(${field}) between '${filter.start_date}' AND '${filter.end_date}'
        -- FILTER BY TIME OF THE DAY
        AND
        TIME(${field}) between '${filter.start_time}' AND '${filter.end_time}'
        -- FILTER BY LAST MINUTES
        AND
        TIME(${field}) between SUBTIME(NOW(), '${filter.last_minutes}' ) AND NOW()`;
  } else {
    result = `
        AND
        -- FILTER BY DATE
        DATE(${field}) between '${filter.start_date}' AND '${filter.end_date}'
        -- FILTER BY TIME OF THE DAY
        AND
        TIME(${field}) between '${filter.start_time}' AND '${filter.end_time}'`;
  }

  return result;
}

export function sqlIntervalFields(filter, field, interval) {
  let result = ",1";

  if (filter && field && interval) {
    return `
    ,(ROUND(ROUND(TIME_TO_SEC(TIME(audit_datetime_init)) /60, 0)/${interval}, 0) - 1) AS interval_init
    ,(ROUND(ROUND(TIME_TO_SEC(TIME(audit_datetime_init)) /60, 0)/${interval}, 0)) AS interval_finish

    ,SEC_TO_TIME((ROUND(ROUND(TIME_TO_SEC(TIME(audit_datetime_init)) /60, 0)/${interval}, 0) - 1) *${interval} *60) AS interval_start
    ,SEC_TO_TIME((ROUND(ROUND(TIME_TO_SEC(TIME(audit_datetime_init)) /60, 0)/${interval}, 0)) *${interval} *60) AS interval_end
    `;
  }

  return result;
}
