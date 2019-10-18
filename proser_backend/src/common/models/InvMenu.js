import * as pool from "../../connectors/pool";
import moment from "moment";

import * as multipleSqlMenu from "../queries/InvMenu/multipleSqlMenu";
import * as userSelectionMenu from "../queries/InvMenu/userSelection/userSelectionMenu";

module.exports = function(InvMenu) {
  InvMenu.multipleSqlMenu = async function(userSelection) {
    return multipleSqlMenu.multipleSqlMenu(userSelection);
  };

  InvMenu.remoteMethod("multipleSqlMenu", {
    accepts: { arg: "userSelection", type: "Filter", http: { source: "body" } },
    returns: { type: "array", root: "true" },
    description: ["Invoke menu options from hca"]
  });

  InvMenu.testModel = async function(userSelection) {
    return userSelectionMenu.testModel(userSelection);
  };

  InvMenu.remoteMethod("testModel", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Test menu"]
  });

  InvMenu.userSelectionMenu = async function(userSelection) {
    return userSelectionMenu.userSelectionMenu(userSelection);
  };

  InvMenu.remoteMethod("userSelectionMenu", {
    accepts: {
      arg: "userSelection",
      type: "UserSelection",
      http: { source: "body" }
    },
    returns: { type: "array", root: "true" },
    description: ["Invoke menu options used by frontend"]
  });
};
