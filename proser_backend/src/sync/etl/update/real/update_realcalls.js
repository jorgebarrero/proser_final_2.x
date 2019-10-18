import * as pool from "../../../../connectors/pool";


let destinyTable = "RealCurrentCalls"
let incoming_date = process.argv[2];

// Read actual cdr records
function deleteOrigin(start_date) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    DELETE FROM RealCurrentCalls WHERE rcc_callentry_datetime_end is not null
    `;

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

async function updateRealcalls(start_date) {
  console.log(`/*************/ Deleting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let val = true;

  let preResult = await deleteOrigin(start_date).catch(err =>
    // console.log("updateRealcalls error - deleteOrigin", err)
    console.log("updateRealcalls error - deleteOrigin")
  );

  return "updateRealcalls end";
}

/************************************************************************ */

module.exports = {
  updateRealcalls
};
