// IMPORTS
import * as pool from "../../../../connectors/pool";
import { removeRowDataPacket } from "../../../helpers/mysql-helper.js";

import { writeDestiny } from "../duplicate_functions";

import moment from "moment";

// VARIABLES
let weekday = moment().isoWeekday();
let today = moment().format( "YYYY-MM-DD" );

let current_date = today;

const destinyTable = "HcaAgent";
const destinyDateField = "";
const destinyStatusField = "hca_agent_status";

const originTable = "HcaAgent";
const originDateField = "";
const originStatusField = "hca_agent_status";

let first_pass = true;
let incoming_date_one = process.argv[ 2 ];
let incoming_date_two = process.argv[ 3 ];

// read origin records
async function readOrigin ( start_date ) {
  let result = null;
  let querySQL = `
      SELECT
      *
      FROM HcaAgent
      WHERE hca_agent_date = '${start_date }'
      `;

  try {
    console.log( "reading..." );

    result = await pool.destiny.query( querySQL );
  } catch ( error ) {
    result = { error: error };
  }

  return result;
}

async function duplicateHcaAgent ( start_date, destiny_date ) {
  console.log(
    `/*************/ Extracting HISTORIC ${ destinyTable } /*************/ `
  );

  console.log( "start_date", start_date );
  console.log( "destiny_date", destiny_date );

  let val = true;

  let preResult = await readOrigin( start_date ).catch( err =>
    console.log( "duplicateHcaAgent error - readOrigin", err )
  );

  let result = preResult ? preResult : [ "" ];

  if ( result ) {
    let extendedResult = result
      .map( function ( x ) {
        let new_date = moment( destiny_date ).format( `YYYY-MM-DD` );

        x.hca_agent_serial_id = new_date + "-" + x.hca_agent_id;
        x.hca_agent_date = new_date;
        x.hca_agent_origin = "Rebuilt" + " " + start_date;

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
          err => console.log( "duplicateHcaAgent caught it - writeDestiny", err )
        );
        console.log( "Finished" );

        return "duplicateHcaAgent end";
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

  return "duplicateHcaAgent end";
}

/************************************************************************ */
duplicateHcaAgent( incoming_date_one, incoming_date_two );

module.exports = {
  duplicateHcaAgent
};
