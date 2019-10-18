import { updateHcaAgent } from "../update/hca/update_hca_agent";
import { updateHcaQueue } from "../update/hca/update_hca_queue";

async function loadHca ( input_date, input_request ) {
  // console.clear();
  try {
    if ( input_request === "HcaAgent" || input_request === "all" ) {
      let inv_agent = await updateHcaAgent( input_date );
      console.log( "inv_agent", inv_agent );
      console.log( "------------------------------------------------" );
      console.log( "" );
    }

    if ( input_request === "HcaQueue" || input_request === "all" ) {
      let inv_queue = await updateHcaQueue( input_date );
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
