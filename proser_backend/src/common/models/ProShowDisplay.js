"use strict";

import * as userSelectionChange from "../queries/ShowDisplay/userSelectionChange";

module.exports = function(ProShowDisplay) {
  ProShowDisplay.auditFunction = async function(type) {
    return userSelectionChange.auditFunction(type);
  };

  ProShowDisplay.remoteMethod("auditFunction", {
    accepts: {
      arg: "object",
      type: "text",
      http: { source: "body" }
    },
    returns: { type: "string", root: "true" },
    description: ["Returns values of auxiliar report"]
  });
};
