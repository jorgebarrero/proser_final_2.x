
import * as pool from '../../../../../connectors/pool';
import moment from 'moment';
import * as LeftOuterJoin from '../../../SqlFunctions/LeftOuterJoin';


async function inboundIndicators(userSelection) {


  let result = {};
  let resume_error = false;

  async function inboundReceivedTotalFunction(userSelection) {

    let query = `
    SELECT

      COUNT(callentry_id) AS inboundReceivedTotal
      
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}

      WHERE
          (callentry_status = 'abandonada' OR callentry_status = 'terminada')
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundReceivedTotalFunction ' + error };
    }
  
  }

  async function inboundAttendedTotalFunction(userSelection) {

    let query = `
      SELECT

      COUNT(callentry_id) AS inboundAttendedTotal
      
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          callentry_status = 'terminada'
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundAttendedTotalFunction ' + error };
    }
  
  }


  async function inboundAbandonedTotalFunction(userSelection) {

    let query = `
      SELECT
      
      COUNT(callentry_id) AS inboundAbandonedTotal
      
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          callentry_status = 'abandonada'
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundAbandonedTotalFunction ' + error };
    }
  
  }


  async function inboundShortTotalFunction(userSelection) {

    let query = `
      SELECT
      
      ${process.env.CDR_SHORTCALL_TIME} AS shortCallTime
      , COUNT(callentry_id) AS inboundShortTotal
      
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME}
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundShortTotalFunction ' +error };
    }
  
  }


  async function inboundBeforeTimeTotalFunction(userSelection) {

    let query = `
      SELECT

      
      ${process.env.CDR_SERVICE_IDEAL_TIME} AS idealAttendingTime
      ,COUNT(callentry_id) AS inboundBeforeTimeTotal
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}
      AND
          callentry_status = 'terminada'
      AND
          callentry_date ='${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundBeforeTimeTotalFunction ' + error };
    }
  
  }


  async function inboundHungAgentTotalFunction(userSelection) {

    let query = `
      SELECT
          COUNT(callentry_id)  AS inboundHungAgentTotal
      FROM
            MainCallEntry
            ${LeftOuterJoin.CallEntry_InvAgent_ById}
            ${LeftOuterJoin.CallEntry_InvQueue_ById}
        WHERE
            callentry_hung_agent = 1
        AND
            callentry_date = '${userSelection.start_date}'
        AND
            ${userSelection.filter_inv_agent}
        AND
            ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundHungAgentTotalFunction ' + error };
    }
  
  }

  async function inboundLostCallsTotalFunction(userSelection) {

    let query = `
      SELECT
      COUNT(cdr_id)  AS inboundLostCallsTotal
      FROM
          MainCdr
      ${LeftOuterJoin.Cdr_InvAgent_ById}
      ${LeftOuterJoin.Cdr_InvQueue_ById}
      WHERE
          inv_agent_type = 'SIP'
      AND
          cdr_duration_sec <= 0
      AND
          cdr_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundLostCallsTotalFunction ' + error };
    }
  
  }


  async function inboundServiceLevelTotalFunction(userSelection) {

    let query = `
      SELECT

      ${process.env.CDR_SERVICE_IDEAL_TIME} AS idealAttendingTime
      ,SUM(case WHEN (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end) AS beforeTimeAttendedCalls
      ,SUM(case WHEN (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end)/
       SUM(case WHEN callentry_status = 'abandonada' OR callentry_status = 'terminada' then 1 else 0 end) AS inboundServiceLevelTotal
          
          FROM
              MainCallEntry
              ${LeftOuterJoin.CallEntry_InvAgent_ById}
              ${LeftOuterJoin.CallEntry_InvQueue_ById}
          WHERE
              (callentry_status = 'abandonada' OR callentry_status = 'terminada')
          AND
              callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundServiceLevelTotalFunction' +  error };
    }
  
  }


  async function inboundAttentionLevelTotalFunction(userSelection) {

    let query = `
      SELECT

        SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end) AttendedCalls
        ,SUM(case WHEN (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) AS totalCalls
        ,SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end)/
        SUM(case WHEN (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
                AS inboundAttentionLevelTotal
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          (callentry_status = 'abandonada' OR callentry_status = 'terminada')
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundAttentionLevelTotalFunction' + error };
    }
  
  }


  async function inboundAbandonLevelTotalFunction(userSelection) {

    let query = `
      SELECT
        SUM(case WHEN callentry_status = 'abandonada' then 1 else 0 end)/
        SUM(case WHEN (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
            AS inboundAbandonLevelTotal
         
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          (callentry_status = 'abandonada' OR callentry_status = 'terminada')
      AND
          callentry_date =  '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundAbandonLevelTotalFunction ' + error };
    }
  
  }


  async function inboundAsaTotalFunction(userSelection) {

    let query = `
      SELECT

        SUM(case WHEN callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end) AS waitDuration
      ,SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end) AS totalAttended
      ,SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end) AS inboundCalls
      ,SUM(case WHEN callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
        SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end)
          AS inboundAsaTotal
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          (callentry_status = 'abandonada' OR callentry_status = 'terminada')
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundAsaTotalFunction ' + error };
    }
  
  }


  async function inboundTmoTotalFunction(userSelection) {

    let query = `
      SELECT

      SUM(case WHEN callentry_status = 'terminada' then callentry_duration_sec else 0 end) AS inboundDuration
    ,SEC_TO_TIME(SUM(case WHEN callentry_status = 'terminada' then callentry_duration_sec else 0 end) ) AS inboundDurationhHms
    ,SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end) AS inboundCalls
    ,SUM(case WHEN callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
     SUM(case WHEN callentry_status = 'terminada' then 1 else 0 end)
		AS inboundTmoTotal
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          (callentry_status = 'abandonada' OR callentry_status = 'terminada')
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundTmoTotalFunction ' + error };
    }
  
  }


  async function inboundActiveTotalFunction(userSelection) {

    let query = `
      SELECT
      COUNT(callentry_id) AS inboundActiveTotal
      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          callentry_status = 'activa'
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundActiveTotalFunction ' +  error };
    }
  
  }


  async function inboundOnQueTotalFunction(userSelection) {

    let query = `
      SELECT
        TIME_TO_SEC(TIMEDIFF(NOW(), MAX(callentry_datetime_entry_queue))) AS waitTime
        ,${process.env.CDR_SERVICE_IDEAL_TIME} AS idealTime
        ,COUNT(callentry_id) AS inboundOnQueTotal

      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      
      WHERE
          callentry_status = 'en-cola'
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;
  
    try {
      const result = await pool.destiny.query(query);
      return result;
      
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundOnQueTotalFunction ' + error };
    }
  
  }


  async function inboundIndicatorsIntervalFunction(userSelection) {
    // xxx
    let result = {};
    let intervalString;
    let sequence = 'seq_0_to_23';
    let interval_in_minutes = 60;
    let start_date = userSelection.start_date;
    
  
    let query = `
      SELECT
        *
      FROM
      (
  
        -- Secuencia Generada con las horas de un dia
      SELECT
          seq as id,
          '${userSelection.start_date}' as report_date,
          (seq * ${interval_in_minutes}) as day_minutes,
          date(NOW()) + interval (seq * ${interval_in_minutes}) Minute as myInterval,
          DATE_FORMAT(date(NOW()) + interval (seq * ${interval_in_minutes}) Minute, "%H:%i") as graphLabel
        FROM ${sequence}
        -- Nota: la expresion seq_0_to_23 hay que calcularla
  
        ) AS MyInterval
        LEFT OUTER JOIN
        (
  
        -- Secuencia de datos agrupados por dia de un fuiente de datos
        SELECT
        callentry_datetime_entry_queue
        ,TRUNCATE((TIME_TO_SEC(DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s')))/60, 0) AS day_minutes
        ,TRUNCATE((TIME_TO_SEC(DATE_FORMAT(callentry_datetime_entry_queue, '%H:%i:%s')))/60/${interval_in_minutes}, 0) AS  interval_id
        ,COUNT(*) as qty
        ,CURRENT_TIMESTAMP as ahora
        ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) as llamadas_recibidas
        ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end) as llamadas_abandonadas
        ,SUM(case when callentry_status = 'terminada' then 1 else 0 end) as llamadas_atendidas
        ,SUM(case when callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME} then 1 else 0 end) as llamadas_cortas
        ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end) as llamadas_antes_de
        ,SUM(case when callentry_hung_agent = 1 then 1 else 0 end) as colgado_agente
        ,AVG(callentry_duration_sec_wait) as tiempo_espera_promedio
        ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada') then 1 else 0 end)/
          SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada')then 1 else 0 end) as nivel_servicio
      
        ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
          SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) as nivel_atencion
        ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
          SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end) as nivel_abandono
        ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
          SUM(case when callentry_status = 'terminada' then 1 else 0 end) as asa
        ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
          SUM(case when callentry_status = 'terminada' then 1 else 0 end) as tmo
        ,SUM(case when callentry_status = 'activa' then 1 else 0 end) as llamadas_activas
        ,SUM(case when callentry_status = 'en-cola' then 1 else 0 end) as llamadas_en_cola

      FROM
        MainCallEntry
        ${LeftOuterJoin.CallEntry_InvAgent_ById}
        ${LeftOuterJoin.CallEntry_InvQueue_ById}

      WHERE
        callentry_date BETWEEN '${userSelection.start_date}' and '${userSelection.start_date}'
  
        AND
          ${userSelection.filter_inv_agent}
        AND
          ${userSelection.filter_inv_queue}
  
        GROUP BY
        interval_id
  
        ) AS MyData
  
        ON MyInterval.id = MyData.interval_id
      `;
  
    
    try {
      const result = await pool.destiny.query(query);
      return result;
        
    } catch (error) {
      resume_error = true;
      return { error:  'inboundIndicators - inboundIndicatorsIntervalFunction ' + error };
    }
    
  }



  let inboundReceivedTotal = await inboundReceivedTotalFunction(userSelection);
  let inboundAttendedTotal = await inboundAttendedTotalFunction(userSelection);
  let inboundAbandonedTotal = await inboundAbandonedTotalFunction(userSelection);
  let inboundShortTotal = await inboundShortTotalFunction(userSelection);
  let inboundBeforeTimeTotal = await inboundBeforeTimeTotalFunction(userSelection);
  let inboundHungAgentTotal = await inboundHungAgentTotalFunction(userSelection);
  let inboundLostCallsTotal = await inboundLostCallsTotalFunction(userSelection);
  let inboundServiceLevelTotal = await inboundServiceLevelTotalFunction(userSelection);
  let inboundAttentionLevelTotal = await inboundAttentionLevelTotalFunction(userSelection);
  let inboundAbandonLevelTotal = await inboundAbandonLevelTotalFunction(userSelection);
  let inboundAsaTotal = await inboundAsaTotalFunction(userSelection);
  let inboundTmoTotal = await inboundTmoTotalFunction(userSelection);
  let inboundActiveTotal = await inboundActiveTotalFunction(userSelection);
  let inboundOnQueTotal = await inboundOnQueTotalFunction(userSelection);

  let inboundIndicatorsInterval = await inboundIndicatorsIntervalFunction(userSelection);

  result = {
    inboundReceivedTotal,
    inboundAttendedTotal,
    inboundAbandonedTotal,
    inboundShortTotal,
    inboundBeforeTimeTotal,
    inboundHungAgentTotal,
    inboundLostCallsTotal,
    inboundServiceLevelTotal,
    inboundAttentionLevelTotal,
    inboundAbandonLevelTotal,
    inboundAsaTotal,
    inboundTmoTotal,
    inboundActiveTotal,
    inboundOnQueTotal,
    inboundIndicatorsInterval,

  };


  if (!resume_error){
    return result;
  } else {
    return {'error': result};
  }

}


// INDIVIDUAL METHODS

async function inboundIndicatorsInterval(userSelection) {
  // xxx
  let result = {};
  let intervalString;
  let sequence = 'seq_0_to_23';
  let interval_in_minutes = 60;
  

  let query = `
    SELECT
      *
    FROM
    (

      -- Secuencia Generada con las horas de un dia
    SELECT
        seq as id,
        (seq * ${interval_in_minutes}) as day_minutes,
        date(NOW()) + interval (seq * ${interval_in_minutes}) Minute as myInterval,
        DATE_FORMAT(date(NOW()) + interval (seq * ${interval_in_minutes}) Minute, "%H:%i") as graphLabel
      FROM ${sequence}
      -- Nota: la expresion seq_0_to_23 hay que calcularla

      ) AS MyInterval
      LEFT OUTER JOIN
      (

      -- Secuencia de datos agrupados por dia de un fuiente de datos
      SELECT
        datetime_entry_queue
        ,TRUNCATE((TIME_TO_SEC(DATE_FORMAT(datetime_entry_queue, '%H:%i:%s')))/60, 0) AS day_minutes
        ,TRUNCATE((TIME_TO_SEC(DATE_FORMAT(datetime_entry_queue, '%H:%i:%s')))/60/${interval_in_minutes}, 0) AS  interval_id
        ,COUNT(*) as qty
        ,CURRENT_TIMESTAMP as ahora
        ,SUM(case when (status = 'abandonada' OR status = 'terminada' )then 1 else 0 end) as llamadas_recibidas
        ,SUM(case when status = 'abandonada' then 1 else 0 end) as llamadas_abandonadas
        ,SUM(case when status = 'terminada' then 1 else 0 end) as llamadas_atendidas
        ,SUM(case when duration <= ${process.env.CDR_SHORTCALL_TIME} then 1 else 0 end) as llamadas_cortas
        ,SUM(case when (duration_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND status = 'terminada')then 1 else 0 end) as llamadas_antes_de
        ,null as colgado_agente
        ,AVG(duration_wait) as tiempo_espera_promedio
        ,SUM(case when (duration_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND status = 'terminada') then 1 else 0 end)/
          SUM(case when (status = 'abandonada' OR status = 'terminada')then 1 else 0 end) as nivel_servicio
      
        ,SUM(case when status = 'terminada' then 1 else 0 end)/
          SUM(case when (status = 'abandonada' OR status = 'terminada' )then 1 else 0 end) as nivel_atencion
        ,SUM(case when status = 'abandonada' then 1 else 0 end)/
          SUM(case when (status = 'abandonada' OR status = 'terminada' )then 1 else 0 end) as nivel_abandono
        ,SUM(case when status = 'terminada' then duration_wait else 0 end)/
          SUM(case when status = 'terminada' then 1 else 0 end) as asa
        ,SUM(case when status = 'terminada' then duration else 0 end)/
          SUM(case when status = 'terminada' then 1 else 0 end) as tmo
        ,SUM(case when status = 'activa' then 1 else 0 end) as llamadas_activas
        ,SUM(case when status = 'en-cola' then 1 else 0 end) as llamadas_en_cola

      FROM MainCall

      LEFT OUTER JOIN InvQueue
      ON MainCall.id_queue_call_entry = InvQueue.inv_queue_id
      
      LEFT OUTER JOIN  InvAgent
      ON MainCall.id_agent = InvAgent.inv_agent_id

      WHERE
        call_entry_date BETWEEN '${userSelection.start_date}' and '${userSelection.start_date}'

      AND
        ${userSelection.filter_inv_agent}
      AND
        ${userSelection.filter_inv_queue}

      GROUP BY
      interval_id

      ) AS MyData

      ON MyInterval.id = MyData.interval_id
    `;
    
  
  try {
    const result = await pool.destiny.query(query);
    return result;
      
  } catch (error) {
    return { 'error': 'inboundIndicatorsInterval ' + error };
  }
  
}




async function inboundReceivedList(userSelection) {

  /* PENDING FIELDS
    callentry_id, callentry_agent_id, callentry_queue_id, callentry_contact_id, callentry_datetime_init, callentry_datetime_end, callentry_duration_sec, callentry_status, callentry_transfer, callentry_datetime_entry_queue, callentry_duration_sec_wait, callentry_uniqueid, callentry_campaign_id, callentry_trunk, callentry_date, callentry_queue_time_expired, callentry_type, callentry_auto_campaign, callentry_queue_number, __QUEUELOG__, callentry_who_hung, callentry_hung_agent, callentry_hung_caller,
  */

  let query = `
    SELECT

    callentry_callerid,
    callentry_duration_sec_wait,
    callentry_status,
    SEC_TO_TIME(callentry_duration_sec) AS callentry_duration,
    
    inv_agent_name,
    inv_queue_number
  
    FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          (callentry_status = 'abandonada' OR callentry_status = 'terminada')
    AND
        callentry_date ='${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { 'error': 'inboundReceivedList ' + error };
  }

}

async function inboundAttendedList(userSelection) {

  let query = `
    SELECT
    
    callentry_callerid,
    callentry_duration_sec_wait,
    callentry_status,
    SEC_TO_TIME(callentry_duration_sec) AS callentry_duration,
    
    inv_agent_name,
    inv_queue_number

    FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
    WHERE
        (callentry_status = 'terminada')
    AND
        callentry_date ='${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundAttendedList ' + error };
  }

}

async function inboundAbandonedList(userSelection) {

  let query = `
    SELECT
    
    callentry_callerid as callerid
    ,callentry_datetime_entry_queue as datetime_entry_queue
    ,callentry_duration_sec_wait as duration_wait
    ,callentry_status as status
    ,inv_queue_number
    ,inv_queue_name

    FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
    WHERE
        (callentry_status = 'abandonada')
    AND
        callentry_date = '${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundAbandonedList ' + error };
  }

}

async function inboundShortList(userSelection) {

  let query = `
    SELECT

    callentry_callerid as callerid
    ,inv_agent_name
    ,callentry_duration_sec_wait as duration_wait
    ,callentry_duration_sec as duration
    ,callentry_status as status
    ,inv_queue_number

    FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
    WHERE
        (callentry_status = 'terminada')
    AND
        callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME}
    AND
        callentry_date =  '${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundShortList' + error };
  }

}

async function inboundBeforeTimeList(userSelection) {

  let query = `
    SELECT

    callentry_callerid as callerid
    ,inv_agent_name
    ,callentry_duration_sec_wait as duration_wait
    ,callentry_duration_sec as duration
    ,callentry_status as status
    ,inv_queue_number

    FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
    WHERE
        callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME}
    AND
        callentry_status = 'terminada'
    AND
        callentry_date ='${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundBeforeTimeList ' + error };
  }

}

async function inboundHungAgentList(userSelection) {

  let query = `
    SELECT

    callentry_callerid as callerid
    ,inv_agent_name
    ,callentry_duration_sec as duration
    ,inv_queue_number
    ,inv_queue_name

    FROM
	  MainCallEntry
    ${LeftOuterJoin.CallEntry_InvAgent_ById}
    ${LeftOuterJoin.CallEntry_InvQueue_ById}
    WHERE
        callentry_hung_agent = 1
    AND
        callentry_date = '${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundHungAgentList ' + error };
  }

}

async function inboundLostCallsList(userSelection) {

  let query = `
    SELECT

    cdr_id

    FROM
        MainCdr
    ${LeftOuterJoin.Cdr_InvAgent_ById}
    ${LeftOuterJoin.Cdr_InvQueue_ById}
    WHERE
        inv_agent_type = 'SIP'
    AND
        cdr_duration_sec <= 0
    AND
        cdr_date = '${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundLostCallsList ' + error };
  }

}

async function inboundQueueResume(userSelection) {

  let query = `
    SELECT

    callentry_queue_id
    AS queue_id

   ,inv_queue_number
    as queue_number
    
   ,inv_queue_name
    as queue_name

   ,'${userSelection.start_date}'
    AS start_date_requested

   ,CURRENT_TIMESTAMP
    AS now
   ,SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
    AS inboundReceivedTotal

   ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)
    AS inboundAbandonedTotal

   ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)
    AS inboundAttendedTotal
   

   ,SUM(case when callentry_duration_sec <= ${process.env.CDR_SHORTCALL_TIME} then 1 else 0 end)
    AS inboundShortTotal

   ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end)
    AS inboundBeforeTimeTotal

   ,SUM(case when callentry_hung_agent = 1 then 1 else 0 end)
    AS inboundHungAgentTotal

   ,SUM(case when (callentry_duration_sec_wait <= ${process.env.CDR_SERVICE_IDEAL_TIME} AND callentry_status = 'terminada')then 1 else 0 end)/ SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' ) then 1 else 0 end) AS inboundServiceLevelTotal


   ,SUM(case when callentry_status = 'terminada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
   AS inboundAttentionLevelTotal
   
   ,SUM(case when callentry_status = 'abandonada' then 1 else 0 end)/
   SUM(case when (callentry_status = 'abandonada' OR callentry_status = 'terminada' )then 1 else 0 end)
   AS inboundAbandonLevelTotal
   
   ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec_wait else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end)
   AS inboundAsaTotal
   
   ,SUM(case when callentry_status = 'terminada' then callentry_duration_sec else 0 end)/
   SUM(case when callentry_status = 'terminada' then 1 else 0 end)
   AS inboundTmoTotal
   

FROM
     MainCallEntry
     ${LeftOuterJoin.CallEntry_InvAgent_ById}
     ${LeftOuterJoin.CallEntry_InvQueue_ById}

WHERE
   DATE_FORMAT(callentry_datetime_entry_queue, '%Y-%m-%d') = '${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}
    
    GROUP BY callentry_queue_id
        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundQueueResume ' + error };
  }

}

async function inboundQueueList(userSelection) {

  let query = `
      SELECT
      (TIMEDIFF(NOW(), (callentry_datetime_entry_queue))) AS waitTime
      ,callentry_callerid
      ,callentry_status
      ,callentry_queue_id
      inv_queue_number
      ,inv_queue_name

      ,callentry_datetime_entry_queue as entryTime
      ,${process.env.CDR_SERVICE_IDEAL_TIME} as idealTime

      ,IF((TIMEDIFF(NOW(), (callentry_datetime_entry_queue))) >= ${process.env.CDR_SERVICE_IDEAL_TIME} , 'red',
         
        IF((TIMEDIFF(NOW(), (callentry_datetime_entry_queue))) >= ${process.env.CDR_SERVICE_IDEAL_TIME} / 2 , 'yellow', 'green'
         
         )) as color
      
    

      FROM
          MainCallEntry
          ${LeftOuterJoin.CallEntry_InvAgent_ById}
          ${LeftOuterJoin.CallEntry_InvQueue_ById}
      WHERE
          callentry_status = 'en-cola'
      AND
          callentry_date = '${userSelection.start_date}'
      AND
          ${userSelection.filter_inv_agent}
      AND
          ${userSelection.filter_inv_queue}
  
          `;


  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundQueueList ' + error };
  }

}

async function inboundActiveList(userSelection) {

  let query = `
    SELECT

    callentry_callerid as callerid
    ,inv_agent_name
    ,callentry_duration_sec_wait as duration_wait
    ,callentry_status as status
    ,inv_queue_number
    ,inv_queue_name

    FROM
        MainCallEntry
        ${LeftOuterJoin.CallEntry_InvAgent_ById}
        ${LeftOuterJoin.CallEntry_InvQueue_ById}
    WHERE
        callentry_status = 'activa'
    AND
        callentry_date = '${userSelection.start_date}'
    AND
        ${userSelection.filter_inv_agent}
    AND
        ${userSelection.filter_inv_queue}

        `;

  try {
    const result = await pool.destiny.query(query);
    return result;
    
  } catch (error) {
    return { error: 'inboundActiveList ' + error };
  }

}



export {
  inboundIndicators,
  inboundIndicatorsInterval,
  inboundReceivedList,
  inboundAttendedList,
  inboundAbandonedList,
  inboundShortList,
  inboundBeforeTimeList,
  inboundHungAgentList,
  inboundLostCallsList,
  inboundQueueResume,
  inboundQueueList,
  inboundActiveList,
};
