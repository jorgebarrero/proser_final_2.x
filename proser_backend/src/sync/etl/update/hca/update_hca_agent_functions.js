import moment from "moment";

function hca_agent_key_cdr(date, extension) {
  let result = null;

  if (date && extension) {
    result = date + `-` + extension;
  }
  return result;
}

function hca_agent_key_audit(date, agent_id) {
  let result = null;

  if (date && agent_id) {
    result = date + `-` + agent_id;
  }
  return result;
}

function hca_agent_min_start(start) {
  let result = null;

  if (start) {
    let temp_hours = start.substring(0, 2);
    let temp_minutes = start.substring(3, 7);

    let hours = parseInt(temp_hours) * 60;
    let minutes = parseInt(temp_minutes) * 1;

    result = hours + minutes;
  }

  return result;
}

function hca_agent_min_end(end) {
  let result = null;

  if (end) {
    let temp_hours = end.substring(0, 2);
    let temp_minutes = end.substring(3, 7);

    let hours = parseInt(temp_hours) * 60;
    let minutes = parseInt(temp_minutes) * 1;

    result = hours + minutes;
  }

  return result;
}

function extractIdFromArray(data) {
  try {
    let a = JSON.parse(data);
    let b = a;
    let c = b;
    return c;
  } catch (error) {
    console.log(
      "err on JsonParse",
      error,
      "error in the above string (in this case, yes)!"
    );
  }
}

module.exports = {
  hca_agent_min_start,
  hca_agent_min_end,
  hca_agent_key_cdr,
  hca_agent_key_audit,
  extractIdFromArray
};

// JSON_EXTRACT(hca_agent_supervisor_json, '$[0]')


// JSON_QUERY(JSON_EXTRACT(hca_agent_supervisor_json, '$[0]'),'$.id')

// JSON_QUERY(JSON_EXTRACT(hca_agent_supervisor_json, '$[0]'),'$.name')
