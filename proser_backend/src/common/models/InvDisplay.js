"use strict";

import * as displayInboundIndicators from "../queries/InvDisplay/displayInbound/displayInboundIndicators";

import * as displayInboundDailyByInterval from "../queries/InvDisplay/displayInbound/displayInboundDailyByInterval";

import * as displayAgentsIndicators from "../queries/InvDisplay/displayAgents/displayAgentsIndicators";

import * as displayAutomaticIndicators from "../queries/InvDisplay/displayAutomatic/displayAutomaticIndicators";

import * as displayOutboundIndicators from "../queries/InvDisplay/displayOutbound/displayOutboundIndicators";

import * as displayShow from "../queries/InvDisplay/displayInbound/displayShow";

module.exports = function(InvDisplay) {
  //**********************INBOUND INDICATORS**********************/

  InvDisplay.displayInboundIndicators = async function(userSelection) {
    return displayInboundIndicators.displayInboundIndicators(userSelection);
  };

  InvDisplay.remoteMethod("displayInboundIndicators", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["List of abandoned calls"]
  });

  //**********************AGENTS INDICATORS**********************/

  InvDisplay.displayAgentsIndicators = async function(userSelection) {
    return displayAgentsIndicators.displayAgentsIndicators(userSelection);
  };

  InvDisplay.remoteMethod("displayAgentsIndicators", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["List of abandoned calls"]
  });

  //**********************AUTOMATIC INDICATORS**********************/

  InvDisplay.displayAutomaticIndicators = async function(userSelection) {
    return displayAutomaticIndicators.displayAutomaticIndicators(userSelection);
  };

  InvDisplay.remoteMethod("displayAutomaticIndicators", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["List of abandoned calls"]
  });

  //**********************OUTBOUND INDICATORS**********************/

  InvDisplay.displayOutboundIndicators = async function(userSelection) {
    return displayOutboundIndicators.displayOutboundIndicators(userSelection);
  };

  InvDisplay.remoteMethod("displayOutboundIndicators", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["List of abandoned calls"]
  });

  //**********************INBOUND INTERVALS **********************/

  InvDisplay.displayInboundDailyByIntervalReport = async function(
    userSelection
  ) {
    return displayInboundDailyByInterval.displayInboundDailyByIntervalReport(
      userSelection
    );
  };

  InvDisplay.remoteMethod("displayInboundDailyByIntervalReport", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["List of abandoned calls"]
  });

  //**********************INBOUND INTERVALS **********************/

  InvDisplay.displayShow = async function(userSelection) {
    return displayShow.displayShow(userSelection);
  };

  InvDisplay.remoteMethod("displayShow", {
    accepts: {
      arg: "userSelection",
      type: "userSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["List of abandoned calls"]
  });
};
