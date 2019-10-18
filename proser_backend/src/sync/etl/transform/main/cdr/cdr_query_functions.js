import moment from "moment";

async function buildCdrQuelog(minId, maxId, start, end) {

// SE AGREGA UN MARGEN DE 5 DIAS PARA ASEGUAR QUE ESTEN TODOS LOS REGISTROS
  var start_date = moment(addDays(start, -5)).format('YYYY-MM-DD');
  var end_date = moment(addDays(end, 5)).format('YYYY-MM-DD');

  // console.log('START & END', start_date, end_date);


  /** QUERY QUE UNE EL CDR CON EL QUEUELOG CREANDO
   *  UNA TABLA VIRTUAL QUE SERÁ USADA PARA ACTUALIZAR
   *  USA LOS CAMPOS,
   *  IVROPTION
   *  ENTERQUEUE
    * CONNECT
    * COMPLETECALLER
    * COMPLETEAGENT
    * ABANDON
    *
  */

  // Valida que las fechas existan y sean vailidas
  if ( minId && maxId && start && end ) {
    const query =

    `
    SELECT *

    FROM asteriskcdrdb.cdr as cdr_query

    LEFT OUTER JOIN



    (

    SELECT
      calls_query.id as callid
    ,	ivroption_query.ivroption_time as cdr_qlog_ivroption_time
    ,	enterqueue_query.enterqueue_time as cdr_qlog_enterqueue_time
    ,	connect_query.connect_time as cdr_qlog_connect_time
    ,	completecaller_query.completecaller_time AS cdr_qlog_completecaller_time
    ,	completeagent_query.completeagent_time AS cdr_qlog_completeagent_time
    ,	abandon_query.abandon_time AS cdr_qlog_abandon_time
    FROM
    (
    SELECT DISTINCT
      callid as id
    FROM 	asterisk.queuelog
    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND callid REGEXP '^[[:digit:]]'
    ) AS calls_query



    LEFT OUTER JOIN

    (
    SELECT
      callid
    ,	time as ivroption_time
    , 	null as cdr_qlog_enterqueue_time
    ,	null as cdr_qlog_connect_time
    ,	null as cdr_qlog_completecaller_time
    ,	null as cdr_qlog_completeagent_time
    ,	null as cdr_qlog_abandon_time

    FROM asterisk.queuelog

    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND 	event = 'IVROPTION'
    ) AS ivroption_query

    ON ivroption_query.callid = calls_query.id


    LEFT OUTER JOIN

    (
    SELECT
      callid
    ,	null as cdr_qlog_ivroption_time
    , 	time as enterqueue_time
    ,	null as cdr_qlog_connect_time
    ,	null as cdr_qlog_completecaller_time
    ,	null as cdr_qlog_completeagent_time
    ,	null as cdr_qlog_abandon_time
      FROM asterisk.queuelog

    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND 	event = 'ENTERQUEUE'
    ) AS enterqueue_query

    ON enterqueue_query.callid = calls_query.id



    LEFT OUTER JOIN

    (
    SELECT
      callid
    ,	null as cdr_qlog_ivroption_time
    , 	null as cdr_qlog_enterqueue_time
    ,	time as connect_time
    ,	null as cdr_qlog_completecaller_time
    ,	null as cdr_qlog_completeagent_time
    ,	null as cdr_qlog_abandon_time
      FROM asterisk.queuelog

    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND 	event = 'CONNECT'
    ) AS connect_query

    ON connect_query.callid = calls_query.id



    LEFT OUTER JOIN

    (
    SELECT
      callid
    ,	null as cdr_qlog_ivroption_time
    , 	null as cdr_qlog_enterqueue_time
    ,	null as cdr_qlog_connect_time
    ,	time as completecaller_time
    ,	null as cdr_qlog_completeagent_time
    ,	null as cdr_qlog_abandon_time
      FROM asterisk.queuelog

    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND 	event = 'COMPLETECALLER'
    ) AS completecaller_query

    ON completecaller_query.callid = calls_query.id




    LEFT OUTER JOIN

    (
    SELECT
      callid
    ,	null as cdr_qlog_ivroption_time
    , 	null as cdr_qlog_enterqueue_time
    ,	null as cdr_qlog_connect_time
    ,	null as cdr_qlog_completecaller_time
    ,	time as completeagent_time
    ,	null as cdr_qlog_abandon_time
      FROM asterisk.queuelog

    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND 	event = 'COMPLETEAGENT'
    ) AS completeagent_query

    ON completeagent_query.callid = calls_query.id




    LEFT OUTER JOIN

    (
    SELECT
      callid
    ,	null as cdr_qlog_ivroption_time
    , 	null as cdr_qlog_enterqueue_time
    ,	null as cdr_qlog_connect_time
    ,	null as cdr_qlog_completecaller_time
    ,	null as cdr_qlog_completeagent_time
    ,	time as abandon_time
      FROM asterisk.queuelog

    WHERE 	time >= '${start_date}'
    AND		time <= '${end_date}'
    AND 	event = 'ABANDON'

    ) AS abandon_query

    ON abandon_query.callid = calls_query.id


    ) AS quelog_resume_query



        ON cdr_query.uniqueid = quelog_resume_query.callid

    WHERE
        cdr_query.id >= ${minId}
        AND
        cdr_query.id <= ${maxId}
`;


    return query;
  }
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// console.log('query', buildCdrQuelog('8920', '9009', '2018-01-09 10:18:32', '2018-01-12 15:45:40'));



module.exports = {
  buildCdrQuelog
};
