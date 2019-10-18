"use strict";
import * as systemCommands from "../queries/System/systemCommands";

const shell = require("shelljs");

module.exports = function(System) {
  /****** ECHO *********************** */
  System.echo = async function(command) {
    return systemCommands.echo(command);
  };

  System.remoteMethod("echo", {
    accepts: { arg: "command", type: "Command", http: { source: "body" } },
    returns: { arg: "response", type: "text" }
  });
  /****** PM2 *********************** */
  System.pm2 = async function(command) {
    return systemCommands.pm2(command);
  };

  System.remoteMethod("pm2", {
    accepts: { arg: "command", type: "Command", http: { source: "body" } },
    returns: { arg: "response", type: "text" }
  });

  /****** REBOOT *********************** */
  System.reboot = async function(command) {
    return systemCommands.reboot(command);
  };

  System.remoteMethod("reboot", {
    accepts: { arg: "command", type: "Command", http: { source: "body" } },
    returns: { arg: "response", type: "text" }
  });
};
