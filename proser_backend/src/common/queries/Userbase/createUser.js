import * as pool from "../../../connectors/pool";

export async function createUser(user) {
  let queryUsername = `
    SELECT
            id
          , firstname
          , lastname
          , profile
          , realm
          , username
          , password
          , email
          , emailVerified
          , verificationToken
          , memberId
          , user_legal_id
          , user_internal_id
          , user_photo_path
          , profile_json
      FROM
         Userbase
          `;

  try {
    result.username = await pool.destiny.query(queryUsername);
  } catch (error) {
    resume_error.username = true;
    return {
      error: "Userbase - checkIfExists " + error
    };
  }

  let queryRoleMapping = `
    SELECT
      id
    , principalType
    , principalId
    , roleId
     
    FROM
      RoleMapping
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
