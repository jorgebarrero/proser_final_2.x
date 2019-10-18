'use strict';
/**
 * Automatically migrates base models
 */

console.log('Starting Migration');


// base loopback models
const MODELS = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Userbase'];
module.exports = function updateBaseModels(app, next) {
  // reference to our datasource
  const mysql_proser = app.dataSources.mysql_proser;
  // check if the model is out of sync with DB
  mysql_proser.isActual(MODELS, (err, actual) => {
    if (err) {
      throw err;
    }
    const syncStatus = actual ? 'in sync' : 'out of sync';
    console.log('');
    console.log(`Base models are ${syncStatus}`);
    console.log('');
    // skip if models in sync
    if (actual) {
      return next();
    }

    console.log('Migrating Base Models...');
    // update models
    mysql_proser.autoupdate(MODELS, (_err) => {
      if (_err) {
        throw _err;
      }
      console.log('Base models migration successful!');
      console.log('');
      next();
    });
  });
};
