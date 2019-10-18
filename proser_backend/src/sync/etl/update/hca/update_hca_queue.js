import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";

import { writeDestiny } from "../update_functions";

import moment from "moment";

import * as customFunctions from "./update_hca_queue_functions";
import * as numberFunctions from "../../../../functions/number";

let weekday = moment().isoWeekday();
let today = moment().format( "YYYY-MM-DD" );

let current_date = today;

const destinyTable = "HcaQueue";
const destinyDateField = "";
const destinyStatusField = "hca_queue_status";

const originTable = "InvQueue";
const originDateField = "";
const originStatusField = "inv_queue_status";

let first_pass = true;
let incoming_date = process.argv[ 2 ];

// Read actual cdr records
function readOrigin ( start_date ) {
  return new Promise( ( resolve, reject ) => {
    let querySQL = `
    SELECT
    
     inv_queue_id
    ,inv_queue_status
    ,inv_queue_chk
    ,inv_queue_name
    ,inv_queue_shortname
    ,inv_queue_number
    ,inv_queue_type

    ,inv_queue_operation_json
    ,inv_queue_system_json

    FROM InvQueue

    WHERE inv_queue_status = 'A'

    `;

    /*
       LEFT OUTER JOIN InvScheduleDay
       ON inv_queue_schedule_id = inv_schedule_id
       AND ${weekday} = inv_scheduleday_weekday
*/

    // console.log(`querySQL`, querySQL);
    resolve( pool.destiny.query( querySQL ) );
    reject( `Error` );
  } );
}

async function updateHcaQueue ( start_date ) {
  console.log( `/*************/ Extracting ${ destinyTable } /*************/ ` );


  console.log( "start_date", start_date );

  let val = true;

  let preResult = await readOrigin( start_date ).catch( err =>
    console.log( "updateHcaQueue error - readOrigin", err )
  );
  let result = preResult ? preResult : [ "" ];

  if ( result ) {
    let extendedResult = result
      .map( function ( x ) {
        let today = moment( new Date() ).format( `YYYY-MM-DD` );

        x.hca_queue_serial_id = today + "-" + x.inv_queue_id;
        x.hca_queue_origin = "InvQueue";
        x.hca_queue_date = today;
        x.hca_queue_start = null;

        x.hca_queue_id = x.inv_queue_id;
        x.hca_queue_number = x.inv_queue_number;
        x.hca_queue_name = x.inv_queue_name;
        x.hca_queue_status = x.inv_queue_status;

        x.__JSON__ = 1;

        x.hca_queue_operation_json = x.inv_queue_operation_json;
        x.hca_queue_system_json = x.inv_queue_system_json;


        return x;
      } )
      .map( y => {
        // TYPE

        delete y.inv_queue_id;
        delete y.inv_queue_status;
        delete y.inv_queue_chk;
        delete y.inv_queue_name;
        delete y.inv_queue_shortname;
        delete y.inv_queue_number;
        delete y.inv_queue_type;


        delete y.inv_queue_operation_json;
        delete y.inv_queue_system_json;


        return y;
      } );

    let validation = extendedResult[ 0 ] ? true : false;

    if ( validation ) {
      try {
        let written = await writeDestiny( extendedResult, destinyTable ).catch(
          err => console.log( "updateHcaQueue caught it - writeDestiny", err )
        );
        return "updateHcaQueue end";
      } catch ( e ) {
        console.log( "e", e );
        return e;
      }
    } else {
      console.log( `********************************************` );
      console.log( `El resultado está vacio en ${ originTable }` );
    }
  } else {
    console.log( `********************************************` );
    console.log( `No hay registros nuevos por actualizar en ${ destinyTable }` );
  }

  return "updateHcaQueue end";
}

/************************************************************************ */

module.exports = {
  updateHcaQueue
};
