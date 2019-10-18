// DISPLAY INBOUND REPORT
/**********************************
 * Tip vscode:
 * ctrl+k & ctrl+0 to view collapsed - ctrl+k & ctrl+j to expand
 */

// IMPORTS
import * as pool from "../../../../connectors/pool";
import moment from "moment";

export async function displayShow(type) {
  let result;
  let resume_error = false;

  let currentDate = moment().format("HH:mm:ss");

  if (type === null) {
    type = "inbound";
  }

  let query = `

  SELECT * FROM ProShowDisplay WHERE 
  
  pro_show_display_start_time <= '${currentDate}'
  AND
  pro_show_display_end_time >=  '${currentDate}'
  AND
  JSON_UNQUOTE(JSON_EXTRACT(pro_show_display_type, "$.value")) = 'inbound'

  order by pro_show_display_start_time desc
  
  limit 1
          `;

  console.log("query", query);

  try {
    result = await pool.destiny.query(query);
    return result;
  } catch (error) {
    resume_error = true;
    return {
      error: "displayShow " + error
    };
  }
}
