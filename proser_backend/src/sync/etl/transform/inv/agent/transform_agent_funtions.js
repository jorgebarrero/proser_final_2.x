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

function inv_agent_people_json(
  json_field,
  inv_agent_id,
  inv_agent_name,
  inv_agent_extension
) {
  let result = null;
  let inv_agent_operation = JSON.parse(json_field);

  if (typeof json_field !== "object" || json_field === null) {
    json_field = {
      agent: [],
      supervisor: [],
      role: []
    };
  }

  if (json_field) {
    !inv_agent_operation
      ? (inv_agent_operation = {
        agent: [],
        supervisor: [],
        role: []
      })
      : inv_agent_operation;

    inv_agent_operation.agent = [
      {
        id: inv_agent_id,
        name: inv_agent_name,
        extension: inv_agent_extension
      }
    ];
    result = JSON.stringify(inv_agent_operation);
  }

  return result;
}

module.exports = {
  inv_agent_shortname,
  inv_agent_people_json
};
