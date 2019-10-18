// IMPORTS
import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";

import { writeDestiny } from "../duplicate_functions";

import moment from "moment";

// VARIABLES
let weekday = moment().isoWeekday();
let today = moment().format( "YYYY-MM-DD" );

let current_date = today;

const destinyTable = "HcaQueue";
const destinyDateField = "";
const destinyStatusField = "hca_queue_status";

const originTable = "HcaQueue";
const originDateField = "";
const originStatusField = "hca_queue_status";

let first_pass = true;
let incoming_date_one = process.argv[ 2 ];
let incoming_date_two = process.argv[ 3 ];

// read origin records
async function readOrigin ( start_date ) {
  let result = null;
  let querySQL = `
      SELECT
      *
      FROM HcaQueue
      WHERE hca_queue_date = '${start_date }'
      `;

  try {
    console.log( "reading..." );

    result = await pool.destiny.query( querySQL );
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function duplicateHcaQueue ( start_date, destiny_date ) {
  console.log(
    `/*************/ Extracting HISTORIC ${ destinyTable } /*************/ `
  );

  console.log( "start_date", start_date );
  console.log( "destiny_date", destiny_date );

  let val = true;

  let preResult = await readOrigin( start_date ).catch( err =>
    console.log( "duplicateHcaQueue error - readOrigin", err )
  );

  let result = preResult ? preResult : [ "" ];

  if ( result ) {
    let extendedResult = result
      .map( function ( x ) {
        let new_date = moment( destiny_date ).format( `YYYY-MM-DD` );

        x.hca_queue_serial_id = new_date + "-" + x.hca_queue_id;
        x.hca_queue_date = new_date;
        x.hca_queue_origin = "Rebuilt" + " " + start_date;


        return x;
      } )
      .map( y => {
        // TYPE

        return y;
      } );


    let validation = extendedResult[ 0 ] ? true : false;

    if ( validation ) {
      try {
        let written = await writeDestiny( extendedResult, destinyTable ).catch(
          err => console.log( "duplicateHcaQueue caught it - writeDestiny", err )
        );
        console.log( "Finished" );

        return "duplicateHcaQueue end";
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

  return "duplicateHcaQueue end";
}

/************************************************************************ */
// console.log( duplicateHcaQueue( incoming_date_one, incoming_date_two ) );

module.exports = {
  duplicateHcaQueue
};
