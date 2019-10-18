import * as pool from "../../../../../connectors/pool";
import { removeRowDataPacket } from "../../../../helpers/mysql-helper";
import moment from "moment";

function inv_break_shortname(original_name, short_name) {
  let result = null;

  if (short_name) {
    result = short_name;
  } else {
    result = original_name;
  }
  return result;
}

function inv_break_codename(original_name) {
  let result = null;

  if (original_name) {
    result = original_name.toLowerCase().replace(/ /g, "_");
  }
  return result;
}

module.exports = {
  inv_break_shortname,
  inv_break_codename
};
