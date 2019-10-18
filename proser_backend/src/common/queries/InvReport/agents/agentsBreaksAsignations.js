import * as pool from '../../../../connectors/pool';
import { SELECT_MULTIPLE_VALUE_ACCESSOR } from "@angular/forms/src/directives/select_multiple_control_value_accessor";




async function breakListFunction(userSelection){
  
  let queryDetail = `
  SELECT
  *
  FROM InvBreak
    
  GROUP BY inv_break_id
  `;

  try {
    result.total = await pool.destiny.query(queryTotal);
  } catch (error) {
    result.total = { errorTotal: error };
  }

  return result;
}



async function breakQuery(breakList) {

  let result = null;

  let temp = breakList
    .map( x => {
      return `max(case when t.test = 'T1' then t.grade end) as T1`;
    });

  return result;
}


async function productivity(userSelection, breakList) {

  

}
