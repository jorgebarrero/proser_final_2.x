// Copyright Maprotel. 2015,2019. All Rights Reserved.
// Node module: loopback-proser
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(InvSupervisor) {

  InvSupervisor.client_list = async function(source) {
    //console.log(source);
    return sql(source);
  };

  InvSupervisor.remoteMethod('InvSupervisor_list', {
    accepts: {arg: 'data', type: 'object', http: { source: 'body' }},
    returns: {arg: 'response', type: 'object'},
    http: {verb: 'post'}
  });

};

async function sql(source){
  let arg = source.estatus_inv_agentes;
  let querySQL =

    `
    SELECT *
    FROM InvSupervisor
    WHERE inv_supervisor_status = 'A'
    `;

  try {

    var result = await poolDat.query(querySQL);
    // var result_cdr = JSON.stringify(result);
    // console.log('****** CDR ******');
    // console.log(result);
    // console.log(querySQL_cdr);
    return result;

  } catch (error) {
    return error;
  }

}
