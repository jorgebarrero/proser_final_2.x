import * as pool from '../../../../connectors/pool';
import{ removeRowDataPacket } from '../../../helpers/mysql-helper.js';
import { writeDestiny, readOriginByDate, readOriginByStatus, previousDate, minDate, startDate } from '../extract_functions';
import moment from 'moment';

const destinyTable = 'InvQueue';
const destinyDateField = '';
const destinyStatusField = 'inv_queue_status';

const originTable = 'call_center.queue_call_entry';
const originDateField = '';
const originStatusField = 'estatus';

let first_pass = true;
let incoming_date = process.argv[2];


/******************* Runing actual program -- exec*/
async function extractInvQueue( start_date ) {

  console.log(`/*************/ Extracting ${destinyTable} /*************/ `);

  // start_date = process.argv[2];
  
  // if(!start_date) {
  //   start_date = moment(new Date).format('YYYY-MM-DD');
  // }else{
  //   start_date = process.argv[2];
  // }

  console.log('start_date', start_date);

  

  let result = await readOriginByStatus(start_date, originTable, originStatusField).catch((err) => console.log(`${destinyTable} caught it - readOriginByDate`, err));

  if(result) {

    let extendedResult = result
      .map( x => {
        // date

        x.inv_queue_number = x.queue;

        x.inv_queue_name = x.descr;

        x.inv_queue_id = x.id;
        x.inv_queue_status = x.estatus;


        return x;
      })
      .map( y => {
        delete y.queue;
        delete y.estatus;
        delete y.id;
        delete y.extension;
        delete y.descr;
        delete y.date_init;
        delete y.time_init;
        delete y.date_end;
        delete y.time_end;
        delete y.script;

        return y;
      });

    let validation = extendedResult[0] ? true : false;

    if (validation) {
      try {
        let written = await writeDestiny(extendedResult, destinyTable).catch(
          err =>
            console.log("extractInvQueue caught it - writeDestiny", err)
        );
        return "extractInvQueue end";
      } catch (e) {
        console.log("e", e);
        return e;
      }
    } else {
      console.log(`********************************************`);
      console.log(`El resultado está vacio en ${originTable}`);
    }
  } else {
    console.log(`********************************************`);
    console.log(`No hay registros nuevos por actualizar en ${destinyTable}`);
  }

  
  return "extractInvQueue end";
}

/************************************************************************ */

module.exports = {
  extractInvQueue
};
