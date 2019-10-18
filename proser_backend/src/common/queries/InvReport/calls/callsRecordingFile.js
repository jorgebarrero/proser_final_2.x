var shell = require("shelljs");
require(`dotenv`).config();
var path = require("path");

export async function callsGetRecordingFile(RecordSelection) {
  const mp3Name = `${RecordSelection.call_type}-${RecordSelection.agent_name}-${RecordSelection.start_date}-${RecordSelection.start_time}.mp3`;

  const passwordFile = `.hostInfo`;

  const originFilePath = `root@${process.env.ORIGIN_DB_HOST}:`;
  const originFileName = RecordSelection.record;

  const destinyFilePath = process.env.DESTINY_FILE_PATH;

  const destinyFileName = path.basename(RecordSelection.record);

  let getFile = `sshpass -f "${passwordFile}" scp -r ${originFilePath}${originFileName} ${destinyFilePath}${destinyFileName}`;

  let convertFile = `sox ${destinyFilePath}${destinyFileName} ${destinyFilePath}${destinyFileName}.mp3`;

  let result;

  try {
    let resultGetfile = await execShellCommand(getFile);
    let temp = await execShellCommand(convertFile);

    // setTimeout(await execShellCommand(convertFile), 30000);

    result = "Finished";
  } catch (error) {
    console.error("error", error);
  }

  return result;
}

export async function deleteRecordingFile(RecordSelection) {
  let result;

  const temp = global.__basedir;

  const mp3Name = `${RecordSelection.call_type}-${RecordSelection.agent_name}-${RecordSelection.start_date}-${RecordSelection.start_time}.mp3`;

  const destinyFilePath = process.env.DESTINY_FILE_PATH;
  const destinyFileName = path.basename(RecordSelection.record);

  let deleteMp3File = `rm ${destinyFilePath}${destinyFileName}.mp3`;
  let deleteGsmFile = `rm ${destinyFilePath}${destinyFileName}`;

  try {
    let resultDeleteMp3File = await execShellCommand(deleteMp3File);
    let resultDeleteGsmFile = await execShellCommand(deleteGsmFile);

    result = "Finished";
  } catch (error) {
    console.error("error", error);
  }

  return result;
}

export async function deleteAllRecordingFile(RecordSelection) {
  let result;

  const destinyFilePath = process.env.DESTINY_FILE_PATH;
  let deleteAll = `rm ${destinyFilePath}*`;

  try {
    let deleteAllFile = await execShellCommand(deleteAll);

    result = "Finished";
  } catch (error) {
    console.error("error", error);
  }

  return result;
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}
