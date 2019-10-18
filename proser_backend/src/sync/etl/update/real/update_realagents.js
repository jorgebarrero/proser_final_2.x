import * as pool from "../../../../connectors/pool";


let destinyTable = "RealCurrentAgents"
let incoming_date = process.argv[2];

// Read actual cdr records
function deleteOrigin(start_date) {
  return new Promise((resolve, reject) => {
    let querySQL = `
    DELETE FROM RealCurrentAgents WHERE rca_agent_datetime_logout is not null
    `;

    resolve(pool.destiny.query(querySQL));
    reject(`Error`);
  });
}

async function updateRealagents(start_date) {
  console.log(`/*************/ Deleting ${destinyTable} /*************/ `);

  console.log("start_date", start_date);


  let preResult = await deleteOrigin(start_date).catch(err =>
    // console.log("updateRealagents error - deleteOrigin", err)
    console.log("updateRealagents error - deleteOrigin")
  );

  return "updateRealagents end";
}

/************************************************************************ */

module.exports = {
  updateRealagents
};
