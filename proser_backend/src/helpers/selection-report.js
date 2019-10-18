const myPool = require ('../connectors/pool');

const poolDat = myPool.poolDat;

// const filter = {
//     "id": 1,
//     "filter":[
//         "inv_agent_status = 'A'"
//     ],
//     "group":[
//         "inv_agent_supervisor_name DESC"
//     ],
//     "order":[
//         "inv_agent_supervisor_name"
//     ],
//     "limit":[
//         3
//     ]
// };

async function selectionReport(arg){

    let report_id = validateId(arg) ? arg.report_id : "";

    if(report_id){

    let findSQL = 
    `
    SELECT inv_report_field, inv_report_table, inv_report_filter
    FROM InvReport
    WHERE inv_report_id = ${report_id}
    `;
    console.log("SQL", findSQL);

    try {
      var result = await poolDat.query(findSQL);
      console.log("REPORTE", result);
      return result;
    } 
    catch (error) {
        console.log('Server error');
        console.log(querySQL);
        res.status(500).send('Server error');
    }

    } else {
    
    result = null;
    return result;

    }
  };


  function validateId(arg){

    let result = false

if (arg.report_id){

    if (arg.report_id > 0){
        return true
    } else {
        result = false
    };
 }
    return result;
};


//   let respon = selectionReport(filter);
//   console.log(respon);

export { selectionReport };