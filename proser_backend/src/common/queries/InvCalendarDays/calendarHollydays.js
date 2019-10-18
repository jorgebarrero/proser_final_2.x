
import * as pool from '../../../connectors/pool';
import moment from 'moment';


async function queryCalendarDay(userSelection) {

  let query = `
    SELECT
    *
    FROM
    InvCalendarDay
    WHERE
    inv_calendarday_date = '${userSelection.start_date}'
    AND
    inv_calendarday_id = '${userSelection.calendar.id}'

        `;


  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { errorInboundCall: error };
  }

}


export {
  queryCalendarDay
};
