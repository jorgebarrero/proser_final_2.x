import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from "moment";

// Read actual records
function readOriginAudit(start_date, table, datefield) {
  console.log("DATA", start_date, table, datefield);

  let next_date = nextDate(start_date);

  console.log(
    "readOriginAudit IN DATA",
    start_date,
    next_date,
    table,
    datefield
  );
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    audit_id
    , audit_agent_id
    , audit_break_id
    , DATE_FORMAT(audit_datetime_init, '%Y-%m-%d %H:%i:%s') as audit_datetime_init
    , DATE_FORMAT(audit_datetime_end, '%Y-%m-%d %H:%i:%s') as audit_datetime_end
    , audit_duration
    , audit_ext_parked
    , __TIME__
    , audit_duration_sec
    , audit_status
    , audit_date

    ,inv_agent_people_json
    ,inv_agent_operation_json
    ,inv_agent_time_json

    
    FROM MainAudit

    LEFT OUTER JOIN InvAgent
    ON audit_agent_id = inv_agent_id
    
    WHERE
    DATE(audit_datetime_init) = '${start_date}'

    `;

    // console.log("querySQL", querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

/************************************************************************ */

// Read actual records
function readOriginAuditCdr(start_date, table, datefield) {
  console.log("DATA", start_date, table, datefield);

  let next_date = nextDate(start_date);

  console.log(
    "readOriginAudit IN DATA",
    start_date,
    next_date,
    table,
    datefield
  );
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    audit_id, audit_agent_id, audit_break_id, audit_duration, audit_ext_parked, __TIME__, audit_duration_sec, audit_status, audit_date

    FROM MainAudit
    WHERE
    audit_datetime_init >= '${start_date}' AND audit_datetime_init < '${next_date}'
    `;

    // console.log("querySQL", querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Calculate previous date
function nextDate(initial_date) {
  let formated_date = moment().format("YYYY-MM-DD");
  let startdate = moment(initial_date);
  let previous_date = startdate.add(1, "days");
  formated_date = startdate.format("YYYY-MM-DD");
  return formated_date;
}

function inv_queue_shortname(short_name, original_name) {
  let result = null;

  if (short_name) {
    result = short_name;
  } else {
    result = original_name;
  }
  return result;
}

module.exports = {
  inv_queue_shortname,
  nextDate,
  readOriginAudit,
  readOriginAuditCdr
};
