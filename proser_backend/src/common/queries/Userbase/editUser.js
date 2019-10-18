import * as pool from "../../../connectors/pool";

export async function editUser(user) {
  let result = {
    email: null,
    username: null
  };

  let resume_error = {
    email: null,
    username: null
  };

  let email = user.email;
  let username = user.username;

  let queryUsername = `
    SELECT
    username
      FROM
         Userbase
      WHERE
      username = '${username}'
          `;

  try {
    result.username = await pool.destiny.query(queryUsername);
  } catch (error) {
    resume_error.username = true;
    return {
      error: "Userbase - checkIfExists " + error
    };
  }

  let queryEmail = `
    SELECT
    email
      FROM
         Userbase
      WHERE
      email = '${email}'
          `;

  try {
    result.email = await pool.destiny.query(queryEmail);
  } catch (error) {
    resume_error.email = true;
    return {
      error: "Userbase - checkIfExists " + error
    };
  }

  result.username === null ? false : true;
  result.email === null ? false : true;

  return result;
}
