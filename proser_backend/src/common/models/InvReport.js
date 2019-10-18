"use strict";

import * as agentsAuxiliar from "../queries/InvReport/agents/agentsAuxiliar";
import * as agentsAssignation from "../queries/InvReport/agents/agentsAssignation";
import * as agentsConnection from "../queries/InvReport/agents/agentsConnection";

import * as mainAudit from "../queries/InvReport/data/mainAudit";
import * as mainCdr from "../queries/InvReport/data/mainCdr";
import * as mainCallEntry from "../queries/InvReport/data/mainCallEntry";

import * as realCurrentAgents from "../queries/InvReport/data/realCurrentAgents";
import * as realCurrentBreaks from "../queries/InvReport/data/realCurrentBreaks";
import * as realCurrentCalls from "../queries/InvReport/data/realCurrentCalls";

import * as callsDetail from "../queries/InvReport/calls/callsDetail";
import * as callsInboundDaily from "../queries/InvReport/calls/callsInboundDaily";
import * as callsInboundDailyByInterval from "../queries/InvReport/calls/callsInboundDailyByInterval";
import * as callsOutboundDaily from "../queries/InvReport/calls/callsOutboundDaily";
import * as callsOutboundDailyByInterval from "../queries/InvReport/calls/callsOutboundDailyByInterval";
import * as callsAutomaticDaily from "../queries/InvReport/calls/callsAutomaticDaily";
import * as callsAutomaticByIntervalDaily from "../queries/InvReport/calls/callsAutomaticDailyByInterval";
import * as callsWaitTime from "../queries/InvReport/calls/callsWaitTime";

import * as callsAbandoned from "../queries/InvReport/calls/callsAbandoned";

import * as operationDetailOperation from "../queries/InvReport/operation/operationDetailOperation";
import * as operationProductivity from "../queries/InvReport/operation/operationProductivity";
import * as multipleQueries from "../queries/InvReport/operation/multipleQueries";

import * as callsRecordingFile from "../queries/InvReport/calls/callsRecordingFile";

// import * as auditBreak from '../queries/InvReport/agents/auditBreak';
// import * as auditBreakDetail from '../queries/InvReport/agents/auditBeakDetail';

module.exports = function(InvReport) {
  //*****************************AGENTS REPORT*******************************/
  //************************************************************************/

  //**********************REMOTE METHOD AUXILIAR REPORT**********************/

  InvReport.agentsAuxiliarReport = async function(userSelection) {
    return agentsAuxiliar.agentsAuxiliarReport(userSelection);
  };

  InvReport.remoteMethod("agentsAuxiliarReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of auxiliar report"]
  });

  //**********************REMOTE METHOD ASIGNATION REPORT**********************/

  InvReport.agentsAssignationReport = async function(userSelection) {
    return agentsAssignation.agentsAssignationReport(userSelection);
  };

  InvReport.remoteMethod("agentsAssignationReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of assignation report"]
  });

  //**********************REMOTE METHOD CONNECTION & DISCONNECTION**********************/

  InvReport.agentsConnectionReport = async function(userSelection) {
    return agentsConnection.agentsConnectionReport(userSelection);
  };

  InvReport.remoteMethod("agentsConnectionReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of connected and disconnected report"]
  });

  //**********************REMOTE METHOD AUDIT REPORT**********************/

  InvReport.mainAuditReport = async function(userSelection) {
    return mainAudit.mainAuditReport(userSelection);
  };

  InvReport.remoteMethod("mainAuditReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of audit report"]
  });

  //**********************REMOTE METHOD CDR REPORT**********************/

  InvReport.mainCdrReport = async function(userSelection) {
    return mainCdr.mainCdrReport(userSelection);
  };

  InvReport.remoteMethod("mainCdrReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of cdr report"]
  });

  //**********************REMOTE METHOD CALLENTRY REPORT**********************/

  InvReport.mainCallEntryReport = async function(userSelection) {
    return mainCallEntry.mainCallEntryReport(userSelection);
  };

  InvReport.remoteMethod("mainCallEntryReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of callentry report"]
  });

  //**********************REMOTE METHOD CALLENTRY REPORT**********************/

  InvReport.realCurrentAgentsReport = async function(userSelection) {
    return realCurrentAgents.realCurrentAgentsReport(userSelection);
  };

  InvReport.remoteMethod("realCurrentAgentsReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of callentry report"]
  });

  //**********************REMOTE METHOD CALLENTRY REPORT**********************/

  InvReport.realCurrentBreaksReport = async function(userSelection) {
    return realCurrentBreaks.realCurrentBreaksReport(userSelection);
  };

  InvReport.remoteMethod("realCurrentBreaksReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of callentry report"]
  });

  //**********************REMOTE METHOD CALLENTRY REPORT**********************/

  InvReport.realCurrentCallsReport = async function(userSelection) {
    return realCurrentCalls.realCurrentCallsReport(userSelection);
  };

  InvReport.remoteMethod("realCurrentCallsReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of callentry report"]
  });

  //*****************************CALLS REPORT*******************************/
  //************************************************************************/

  //**********************REMOTE METHOD DETAIL CALLS REPORT**********************/

  InvReport.callsDetailReport = async function(userSelection) {
    return callsDetail.callsDetailReport(userSelection);
  };

  InvReport.remoteMethod("callsDetailReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of audit report"]
  });

  //**********************REMOTE METHOD INBOUND DAILY REPORT**********************/

  InvReport.callsInboundDailyReport = async function(userSelection) {
    return callsInboundDaily.callsInboundDailyReport(userSelection);
  };

  InvReport.remoteMethod("callsInboundDailyReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of inbound daily report"]
  });

  //**********************REMOTE METHOD INBOUND DAILY BY INTERVAL REPORT**********************/

  InvReport.callsInboundDailyByIntervalReport = async function(userSelection) {
    return callsInboundDailyByInterval.callsInboundDailyByIntervalReport(
      userSelection
    );
  };

  InvReport.remoteMethod("callsInboundDailyByIntervalReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of inbound daily by interval report"]
  });

  //**********************REMOTE METHOD OUTBOUND DAILY REPORT**********************/

  InvReport.callsOutboundDailyReport = async function(userSelection) {
    return callsOutboundDaily.callsOutboundDailyReport(userSelection);
  };

  InvReport.remoteMethod("callsOutboundDailyReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of audit report"]
  });

  //**********************REMOTE METHOD OUTBOUND DAILY BY INTERVAL REPORT**********************/

  InvReport.callsOutboundDailyByIntervalReport = async function(userSelection) {
    return callsOutboundDailyByInterval.callsOutboundDailyByIntervalReport(
      userSelection
    );
  };

  InvReport.remoteMethod("callsOutboundDailyByIntervalReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of audit report"]
  });

  //**********************REMOTE METHOD AUTOMATIC DAILY REPORT**********************/

  InvReport.callsAutomaticDailyReport = async function(userSelection) {
    return callsAutomaticDaily.callsAutomaticDailyReport(userSelection);
  };

  InvReport.remoteMethod("callsAutomaticDailyReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of calls automatic report"]
  });

  //**********************REMOTE METHOD AUTOMATIC DAILY BY INTERVAL REPORT**********************/

  InvReport.callsAutomaticByIntervalDailyReport = async function(
    userSelection
  ) {
    return callsAutomaticByIntervalDaily.callsAutomaticByIntervalDailyReport(
      userSelection
    );
  };

  InvReport.remoteMethod("callsAutomaticByIntervalDailyReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of calls automatic by interval report"]
  });

  //**********************REMOTE METHOD CALLS ABANDONED REPORT**********************/

  InvReport.callsAbandonedReport = async function(userSelection) {
    return callsAbandoned.callsAbandonedReport(userSelection);
  };

  InvReport.remoteMethod("callsAbandonedReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of calls abandoned report"]
  });

  //**********************REMOTE METHOD CALLS WAIT TIME REPORT**********************/

  InvReport.callsWaitTimeReport = async function(userSelection) {
    return callsWaitTime.callsWaitTimeReport(userSelection);
  };

  InvReport.remoteMethod("callsWaitTimeReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of calls wait time report"]
  });

  //*****************************OPERATION REPORT*******************************/
  //************************************************************************/

  //**********************REMOTE METHOD DETAIL OPERATION REPORT**********************/

  InvReport.operationDetailOperationReport = async function(userSelection) {
    return operationDetailOperation.operationDetailOperationReport(
      userSelection
    );
  };

  InvReport.remoteMethod("operationDetailOperationReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of detail operation report"]
  });

  //**********************REMOTE METHOD PRODUCTIVITY REPORT**********************/

  InvReport.operationProductivityReport = async function(userSelection) {
    return operationProductivity.operationProductivityReport(userSelection);
  };

  InvReport.remoteMethod("operationProductivityReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of productivity report"]
  });

  //***************************INBOUND GROUP REPORT - REMOTE METHOD*********************************/

  InvReport.inboundGroup = async function(filtro) {
    return inboundGroup(filtro);
  };

  InvReport.remoteMethod("inboundGroup", {
    accepts: { arg: "filtro", type: "object", http: { source: "body" } },
    returns: { type: "array", root: "true" },
    description: ["Show statitics by group"]
  });

  async function inboundGroup(filtro) {
    const queryInboundGroup = `
    SELECT
    cdr_type_queue as numero_cola,
      inv_queue_name as nombre_cola,
      SUM(cdr_call_received) as llamadas_recibidas,
      SUM(cdr_call_atended) as llamadas_atendidas,
      SUM(cdr_call_abandoned) as llamadas_abandonadas,
      SUM(cdr_call_short) as llamadas_cortas,
      SUM(cdr_call_before_time) as llamadas_antes_de,
      SUM(cdr_hung_agent) as colgado_agente,
      SUM(cdr_call_before_time)/SUM(cdr_call_received) as nivel_servicio,
      SUM(cdr_call_atended)/SUM(cdr_call_received) as nivel_atencion,
      SUM(cdr_call_abandoned)/SUM(cdr_call_received) as nivel_abandono,
      SUM(duration)/SUM(cdr_call_received) as tmo,
      sum(cdr_duration_wait)/SUM(cdr_call_atended) as asa

      FROM MainCdr
      LEFT OUTER JOIN InvQueue
      ON cdr_type_queue = inv_queue_number

      WHERE cdr_date = '2018-11-23'
      
      GROUP BY cdr_type_queue
      `;

    try {
      var resultInboundGroup = await poolDat.query(queryInboundGroup);
      return resultInboundGroup;
    } catch (error) {
      console.log("Server error");
      return error;
    }
  }

  //**********************REMOTE METHOD AUDIT BREAKS**********************/

  InvReport.reportAuditBreak = async function(userSelection) {
    return auditBreak.reportAuditBreak(userSelection);
  };

  InvReport.remoteMethod("reportAuditBreak", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of audit break report"]
  });

  //**********************REMOTE METHOD AUDIT BREAKS DETAIL**********************/

  InvReport.reportAuditBreakDetail = async function(userSelection) {
    return auditBreakDetail.reportAuditBreakDetail(userSelection);
  };

  InvReport.remoteMethod("reportAuditBreakDetail", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of breaks for each selected agent"]
  });

  //**********************MULTIPLE QUERIES **********************/

  InvReport.multipleQueries = async function(userSelection) {
    return multipleQueries.multipleQueries(userSelection);
  };

  InvReport.remoteMethod("multipleQueries", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of breaks for each selected agent"]
  });

  //**********************EXTRACT RECORDING FILE**********************/

  InvReport.callsGetRecordingFile = async function(userSelection) {
    return callsRecordingFile.callsGetRecordingFile(userSelection);
  };

  InvReport.remoteMethod("callsGetRecordingFile", {
    accepts: {
      arg: "RecordSelection",
      type: "RecordSelection",
      http: { source: "body" }
    },
    returns: { type: "string", root: "true" },
    description: ["Returns values of auxiliar report"]
  });

  //**********************DELETE RECORDING FILE**********************/

  InvReport.deleteRecordingFile = async function(userSelection) {
    return callsRecordingFile.deleteRecordingFile(userSelection);
  };

  InvReport.remoteMethod("deleteRecordingFile", {
    accepts: {
      arg: "RecordSelection",
      type: "RecordSelection",
      http: { source: "body" }
    },
    returns: { type: "string", root: "true" },
    description: ["Returns values of auxiliar report"]
  });

  //**********************DELETE RECORDING FILE**********************/

  InvReport.deleteAllRecordingFile = async function(userSelection) {
    return callsRecordingFile.deleteAllRecordingFile(userSelection);
  };

  InvReport.remoteMethod("deleteAllRecordingFile", {
    accepts: {
      arg: "RecordSelection",
      type: "RecordSelection",
      http: { source: "body" }
    },
    returns: { type: "string", root: "true" },
    description: ["Returns values of auxiliar report"]
  });
};
