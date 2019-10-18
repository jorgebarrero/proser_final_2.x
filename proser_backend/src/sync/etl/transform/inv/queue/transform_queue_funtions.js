import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from "moment";

// Read actual records
function readOriginQueue(start_date, table, datefield) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
     inv_queue_id
    ,inv_queue_status
    ,inv_queue_chk
    ,queueconfig_descr as inv_queue_name
    ,inv_queue_shortname
    ,inv_queue_number
    ,inv_queue_operation_json

    FROM InvQueue
     JOIN InvQueueConfig
        ON queueconfig_extension = inv_queue_number
    WHERE inv_queue_status <> 'I' ORDER BY inv_queue_id
    `;

    // console.log('querySQL', querySQL);

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
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

function inv_queue_operation_json(
  json_field,
  inv_queue_id,
  inv_queue_name,
  inv_queue_number
) {
  let result = null;
  let inv_queue_operation = JSON.parse(json_field);

  if (typeof json_field !== "object" || json_field === null) {
    json_field = {
      queue: [],
      client: [],
      service: []
    };
  }

  if (json_field) {
    !inv_queue_operation
      ? (inv_queue_operation = {
        queue,
        client,
        service
      })
      : inv_queue_operation;

    inv_queue_operation.queue = [
      {
        id: inv_queue_id,
        name: inv_queue_name,
        number: inv_queue_number
      }
    ];
    result = JSON.stringify(inv_queue_operation);
  }

  return result;
}

module.exports = {
  inv_queue_shortname,
  inv_queue_operation_json,
  readOriginQueue
};
