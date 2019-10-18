// Copyright Maprotel. 2015,2019. All Rights Reserved.
// Node module: loopback-proser
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0
"use strict";

import * as smsInformation from "../queries/InvSms/smsInformation";


module.exports = function(InvSms) {

  //**********************REMOTE METHOD SEND SMS**********************/

  InvSms.smsInformation = async function(userSelection) {
    return smsInformation.smsInformation(userSelection);
  };

  InvSms.remoteMethod("smsInformation", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Returns values of auxiliar report"]
  });
};
