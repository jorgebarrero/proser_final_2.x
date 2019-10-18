import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";
import moment from "moment";

// write procesed records
function writeDestiny(data, current_table) {
  if (data[0] !== undefined) {
    return new Promise((resolve, reject) => {
      let myfields = Object.keys(data[0]);

      let myRecords = data.map(x => {
        return Object.values(x);
      });

      let updateFieldsArray = myfields.map((x, index) => {
        return `${x} = VALUE(${x})`;
      });

      let updateFields = updateFieldsArray;

      let querySQL = `INSERT INTO ${current_table} (${myfields}) values ?
    ON DUPLICATE KEY UPDATE ${updateFields}
    `;

      // Record in database
      resolve(pool.destiny.query(querySQL, [myRecords]));
      reject(`Error`);
    });
  } else {
    return [];
  }
}

// Read actual records
function readOriginByDateMaxNum(
  start_date,
  table,
  datefield,
  numberField,
  numberValue,
  selection
) {
  numberValue === undefined || numberValue === null
    ? (numberValue = 0)
    : numberValue;

  selection === undefined || selection === null ? (selection = 1) : selection;

  let next_date = nextDate(start_date);
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    DATE_FORMAT(cdr.calldate, '%Y-%m-%d %H:%i:%s') as cdr_calldate
    , cdr.clid as cdr_clid
    , cdr.src as cdr_src
    , cdr.dst as cdr_dst
    , cdr.dcontext as cdr_dcontext
    , cdr.channel as cdr_channel
    , cdr.dstchannel as cdr_dstchannel
    , cdr.lastapp as cdr_lastapp
    , cdr.lastdata as cdr_lastdata
    , cdr.duration as cdr_duration_sec
    , cdr.billsec as cdr_billsec_sec
    , cdr.disposition as cdr_disposition
    , cdr.amaflags as cdr_amaflags
    , cdr.accountcode as cdr_accountcode
    , cdr.uniqueid as cdr_uniqueid
    , cdr.userfield as cdr_userfield
    , cdr.recordingfile as cdr_recordingfile
    , cdr.cnum as cdr_cnum
    , cdr.cnam as cdr_cnam
    , cdr.outbound_cnum as cdr_outbound_cnum
    , cdr.outbound_cnam as cdr_outbound_cnam
    , cdr.dst_cnam as cdr_dst_cnam
    , cdr.did as cdr_did
    , cdr.id as cdr_id

    , callentry.id_agent as cdr_agent_id
    , callentry.id_queue_call_entry as cdr_queue_id

    FROM
    asteriskcdrdb.cdr as cdr

    LEFT OUTER JOIN call_center.call_entry as callentry
    ON cdr.uniqueid = callentry.uniqueid

    WHERE
    ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
    AND
    ${numberField} > ${numberValue}
    AND
    ${selection}

    LIMIT 100

    `;

    // console.log("querySQL readOriginByDateMaxNum", querySQL);

    resolve(pool.origin.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
function readOriginByDateMaxNumAllRecords(
  start_date,
  table,
  datefield,
  numberField,
  numberValue,
  selection
) {
  numberValue === undefined || numberValue === null
    ? (numberValue = 0)
    : numberValue;

  selection === undefined || selection === null ? (selection = 1) : selection;

  let next_date = nextDate(start_date);
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
      DATE_FORMAT(cdr.calldate, '%Y-%m-%d %H:%i:%s') as cdr_calldate
    , cdr.clid as cdr_clid
    , cdr.src as cdr_src
    , cdr.dst as cdr_dst
    , cdr.dcontext as cdr_dcontext
    , cdr.channel as cdr_channel
    , cdr.dstchannel as cdr_dstchannel
    , cdr.lastapp as cdr_lastapp
    , cdr.lastdata as cdr_lastdata
    , cdr.duration as cdr_duration_sec
    , cdr.billsec as cdr_billsec_sec
    , cdr.disposition as cdr_disposition
    , cdr.amaflags as cdr_amaflags
    , cdr.accountcode as cdr_accountcode
    , cdr.uniqueid as cdr_uniqueid
    , cdr.userfield as cdr_userfield
    , cdr.recordingfile as cdr_recordingfile
    , cdr.cnum as cdr_cnum
    , cdr.cnam as cdr_cnam
    , cdr.outbound_cnum as cdr_outbound_cnum
    , cdr.outbound_cnam as cdr_outbound_cnam
    , cdr.dst_cnam as cdr_dst_cnam
    , cdr.did as cdr_did
    , cdr.id as cdr_id

    , callentry.id_agent as cdr_agent_id
    , callentry.id_queue_call_entry as cdr_queue_id

    FROM
    asteriskcdrdb.cdr as cdr

    LEFT OUTER JOIN call_center.call_entry as callentry
    ON cdr.uniqueid = callentry.uniqueid

    WHERE
    ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
    AND
    ${numberField} > ${numberValue}
    AND
    ${selection}

    `;

    // console.log("querySQL readOriginByDateMaxNumAllRecords", querySQL);

    resolve(pool.origin.query(querySQL));
    reject(`Error`);
  });
}

// Read actual records
async function readTableMaxIdByDate(start_date, table, datefield, numfield) {
  let next_date = nextDate(start_date);

  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
    max(${numfield}) as maxId
    FROM
    ${table}
    WHERE
    ${datefield} >= '${start_date}' AND ${datefield} < '${next_date}'
    `;

    // console.log('querySQL', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

// Calculate lowest date in ORIGIN table
function minDate(table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
      SELECT
      DATE_FORMAT(MIN(${datefield}), '%Y-%m-%d') as min_date
      FROM
      ${table}
      `;
    resolve(pool.origin.query(querySQL));
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

module.exports = {
  writeDestiny,
  readTableMaxIdByDate,
  minDate,
  readOriginByDateMaxNum,
  readOriginByDateMaxNumAllRecords
};
