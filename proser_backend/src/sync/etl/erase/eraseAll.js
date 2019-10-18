import * as pool from "../../../connectors/pool";
import { removeRowDataPacket } from "../../helpers/mysql-helper.js";
import moment from "moment";

// Read actual records
async function eraseTestData() {
  let result = null;

  let querySQL = `

  DELETE FROM AccessToken;
  DELETE FROM ACL;

  DELETE FROM AuxColor;
  DELETE FROM AuxHour;
  DELETE FROM AuxInfo;  
  DELETE FROM AuxInterval; 
  DELETE FROM AuxLine;


  DELETE FROM InvAgent; 
  DELETE FROM InvBreak;
  DELETE FROM InvQueue;
  DELETE FROM InvCampaign;

  DELETE FROM HcaAgent;
  DELETE FROM HcaQueue;
  DELETE FROM HcaExtension;
  DELETE FROM HcaOccasion;

  DELETE FROM MainAudit;
  DELETE FROM MainCallEntry;
  DELETE FROM MainCdr;
  DELETE FROM MainQueueLog;

  DELETE FROM MainStoredQueries;

  DELETE FROM ProScheduleChange;
  DELETE FROMProShowDisplay;

  DELETE FROM RealCurrentAgents;
  DELETE FROM RealCurrentBreaks;
  DELETE FROM RealCurrentCalls;

  DELETE FROM Role;
  DELETE FROM RoleMapping;

  DELETE FROM InvCalendar;
  DELETE FROM InvCalendarDay;

  DELETE FROM InvSchedule;
  DELETE FROM InvScheduleDay;

  DELETE FROM InvAgentRole;
  DELETE FROM InvClient;
  DELETE FROM InvQueueConfig;

  DELETE FROM InvScale;
  DELETE FROM InvService; 

  DELETE FROM InvSms;
  DELETE FROM nvSupervisor; 

  DELETE FROM User;
  DELETE FROM Userbase;
  DELETE FROM UserSelection;


  `;

  // return new Promise((resolve, reject) => {
  //   resolve(pool.destiny.query(querySQL));
  //   reject(`Error`);
  // });

  try {
    result = await pool.destiny.query(querySQL);
  } catch (error) {
    result = { error: error };
  }

  return result;
}

async function erase() {
  console.clear();
  console.log("***********  BORRANDO TODO EN TABLAS DE DESTINO ***********");
  await eraseTestData();
  console.log("Todo borrado");
  process.exit(0);
}

erase();
