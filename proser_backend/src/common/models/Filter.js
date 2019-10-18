// Copyright Maprotel. 2015,2019. All Rights Reserved.
// Node module: loopback-proser
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

import * as filterConverted from '../queries/Filter/filterConverted';

module.exports = function(Filter) {

  Filter.sqlFilter = async function(userSelection) {
    return filterConverted.sqlFilter(userSelection);
  };
    
  Filter.remoteMethod('sqlFilter', {
    accepts: {arg: 'userSelection', type: 'Filter', http: { source: 'body'} },
    returns: {type: 'array', root: 'true'},
    description: ["Returns values of connected and disconnected report"]
  });

};
