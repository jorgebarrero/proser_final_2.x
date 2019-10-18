import { duplicateHcaAgent } from "../duplicate/hca/duplicate_hca_agent";
import { duplicateHcaQueue } from "../duplicate/hca/duplicate_hca_queue";


let input_start_date = process.argv[2];
let input_request = process.argv[3];
let input_destiny_date = process.argv[4];

async function loadHca ( input_date, input_request ) {
  // console.clear();
  try {
    if ( input_request === "HcaAgent" || input_request === "all" ) {
      let inv_agent = await duplicateHcaAgent( input_date );
      console.log( "inv_agent", inv_agent );
      console.log( "------------------------------------------------" );
      console.log( "" );
    }

    if ( input_request === "HcaQueue" || input_request === "all" ) {
      let inv_queue = await duplicateHcaQueue( input_date );
      console.log( "inv_queue", inv_queue );
      console.log( "------------------------------------------------" );
      console.log( "" );
    }

    console.log( "************** End load HCA **************" );
  } catch ( e ) {
    console.log( "error", e );
    // process.exit(1);
  }
}

module.exports = {
  loadHca
};
