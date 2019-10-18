import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from 'moment';


// Read actual records
function readOriginCampaign(start_date, table, datefield ) {

  return new Promise((resolve, reject) => {
    let querySQL = `
    SELECT
     inv_campaign_id
    ,inv_campaign_status
    ,inv_campaign_chk
    ,inv_campaign_name
    ,inv_campaign_shortname
    ,inv_campaign_description
    ,inv_campaign_queue_number
    ,inv_campaign_aftercall_time
    ,inv_campaign_start_date
    ,inv_campaign_end_date
    ,inv_campaign_start_time
    ,inv_campaign_end_time

    ,inv_queue_id AS inv_campaign_queue_id
    ,inv_queue_name AS inv_campaign_queue_name
    

    FROM InvCampaign
     JOIN InvQueue
        ON inv_campaign_queue_number = inv_queue_number
    `;
    
    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}


function inv_queue_shortname( short_name, original_name ) {
  let result = null;

  if(short_name) {
    result = short_name;
  } else {
    result = original_name;
  }
  return result;
}


module.exports = {
  inv_queue_shortname,
  readOriginCampaign
};
