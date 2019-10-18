import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from "moment";

function inv_agent_shortname(short_name, original_name) {
  let result = null;

  if (short_name) {
    result = short_name;
  } else {
    result = original_name;
  }
  return result;
}

module.exports = {
  inv_agent_shortname
};
