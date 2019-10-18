// Copyright Maprotel. 2015,2019. All Rights Reserved.
// Node module: loopback-proser
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

import * as scheduledayCrud from "../queries/InvScheduleDay/scheduledayCrud";

module.exports = function(InvScheduleDay) {
  InvScheduleDay.invScheduleDayCrudInsert = async function(item) {
    return scheduledayCrud.invScheduleDayCrudInsert(item);
  };

  InvScheduleDay.remoteMethod("invScheduleDayCrudInsert", {
    accepts: {
      arg: "item",
      type: "object",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Create 7 schedules into days for a week"]
  });
};

// scheduledayCrud.invScheduleDayCrudInsert
