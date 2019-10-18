import * as pool from "../../../../connectors/pool";

let destinyTable = "RealCurrentBreaks";
let incoming_date = process.argv[2];

// Read actual cdr records
function deleteDestiny(start_date) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    DELETE FROM RealCurrentBreaks WHERE rcb_break_datetime_end is not null;
    `;

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

async function updateRealbreaks(start_date) {
  console.log(`/*************/ Deleting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);

  let preResult = await deleteDestiny(start_date).catch(err =>
    // console.log("updateRealbreaks error - deleteDestiny", err)
    console.log("updateRealbreaks error - deleteDestiny", err)
  );

  return "updateRealbreaks end";
}

/************************************************************************ */

module.exports = {
  updateRealbreaks
};
