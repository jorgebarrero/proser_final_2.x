'use strict';

const myPool = require ('../../connectors/pool.js');

const poolDat = myPool.poolDat;

module.exports = function(InvClient) {

  InvClient.client_list = async function(source) {
    return sql(source);
  };

  InvClient.remoteMethod('client_list', {
    accepts: {arg: 'data', type: 'object', http: { source: 'body' }},
    returns: {arg: 'list', type: 'object'}
  });

};

async function sql(source){
  let arg = source.inv_client_status;
  let querySQL =

    `
    SELECT *
    FROM InvClient
    `;


  try {

    var result = await poolDat.query(querySQL);
    // var result_cdr = JSON.stringify(result);
    //console.log('****** CDR ******');
    //console.log(result);
    // console.log(querySQL_cdr);
    return result;

  // eslint-disable-next-line no-empty
  } catch (error) {

  }


}
