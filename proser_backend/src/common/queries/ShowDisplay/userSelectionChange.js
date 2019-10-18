import * as pool from "../../../connectors/pool";
import moment from "moment";

export async function auditFunction(type) {
  let result;
  let resume_error = false;

  let currentDate = moment().format("HH:mm:ss");

  if (type === null) {
    type = "inbound";
  }

  type = "inbound";

  // AND
  // show_display_type = '${type}'

  let query = `
    SELECT
    *
      FROM
         ShowDisplay
      WHERE 

       '${currentDate}' >= show_display_start_time


      limit 1


          `;


  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    resume_error = true;
    return {
      error: "callEntry - auditFunction " + error
    };
  }
}
