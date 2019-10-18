import * as pool from "../../../connectors/pool";
import moment from "moment";

export async function invScheduleDayCrudInsert(data) {
  let id = data.id;

  let myfields =
    "inv_scheduleday_id,   inv_schedule_id,   inv_scheduleday_weekday,   inv_scheduleday_name,   inv_scheduleday_start_time,   inv_scheduleday_end_time,   inv_scheduleday_legal_break, inv_scheduleday_laborday";

  let myRecords = `( null, ${id},1,'lunes','08:00:00','17:00:00','01:00:00',1 ), ( null, ${id},2,'martes','08:00:00','17:00:00','01:00:00',1 ), ( null, ${id},3,'miércoles','08:00:00','17:00:00','01:00:00',1), ( null, ${id},4,'jueves','08:00:00','17:00:00','01:00:00',1 ), ( null, ${id},5,'viernes','08:00:00','17:00:00','01:00:00',1 ), (  null, ${id}, 6, 'sábado', null, null, null, 0), (  null, ${id}, 7, 'domingo', null, null, null, 0 )`;

  let querySQL = `INSERT INTO InvScheduleDay (${myfields}) values ${myRecords}`;

  try {
    let result;

    console.log("*****************");
    console.log("myfields", myfields);
    console.log("*****************");
    console.log("myRecords", myRecords);
    console.log("*****************");
    console.log("querySQL", querySQL);

    result = await pool.destiny.query(querySQL);

    console.log("*****************");
    console.log("result", result);

    return result;
  } catch (error) {
    return { invScheduleDayCrudInsert: error };
  }
}

// write procesed records
async function writeDestiny(data, current_table) {
  let result = null;
  if (data[0] !== undefined) {
    return new Promise((resolve, reject) => {
      let myfields = Object.keys(data[0]);

      let myRecords = data.map(x => {
        return Object.values(x);
      });

      let updateFieldsArray = myfields.map((x, index) => {
        return `${x} = VALUE(${x})`;
      });

      let updateFields = updateFieldsArray;

      let querySQL = `INSERT INTO ${current_table} (${myfields}) values ?
    ON DUPLICATE KEY UPDATE ${updateFields}
    `;

      // Record in database
      resolve(pool.destiny.query(querySQL, [myRecords]));
      reject(`Error`, error);
    });
  } else {
    return [];
  }
}
