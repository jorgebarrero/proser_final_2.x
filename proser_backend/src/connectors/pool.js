// console.log('No value for FOO yet:', process.env.FOO);

if (process.env.NODE_ENV !== `development`) {
  require(`dotenv`).config();
}

/***************************** */
const util = require(`util`);
const mysql = require(`mysql`);

// REPORTS
const destiny = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.REPORTS_DB_HOST,
  user: process.env.REPORTS_DB_USER,
  password: process.env.REPORTS_DB_PASSWORD,
  database: process.env.REPORTS_PROSER_DB,
  multipleStatements: true
});

// ORIGIN
const origin = mysql.createPool({
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.ORIGIN_DB_HOST,
  user: process.env.ORIGIN_DB_USER,
  password: process.env.ORIGIN_DB_PASSWORD,
  database: process.env.ORIGIN_ASTERISK_DB,
  multipleStatements: true
});

// Ping database to check for common exception errors.
origin.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Ping database to check for common exception errors.
destiny.getConnection((err, connection) => {
  if (err) {
    if (err.code === `PROTOCOL_CONNECTION_LOST`) {
      console.error(`Database connection was closed.`);
      return err.code;
    }
    if (err.code === `ER_CON_COUNT_ERROR`) {
      console.error(`Database has too many connections.`);
      return err.code;
    }
    if (err.code === `ECONNREFUSED`) {
      console.error(`Database connection was refused.`);
      return err.code;
    }
  }

  return;
});

// Promisify for Node.js async/await.
origin.query = util.promisify(origin.query);
destiny.query = util.promisify(destiny.query);

module.exports = {
  origin,
  destiny
};
