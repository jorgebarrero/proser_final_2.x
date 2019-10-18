const shell = require("shelljs");

async function echo(command) {
  try {
    var result = await shell.exec(`echo ${command.command}`);
    return result;
  } catch (error) {
    shell.echo("error", error);
  }
}

async function pm2(command) {
  try {
    var result = await shell.exec(`pm2 ${command.command}`);
    return result;
  } catch (error) {
    shell.echo("error", error);
  }
}

async function reboot(command) {
  try {
    let result;
    result = await shell.exec(`reboot ${command.command}`).code;

    if (result !== 0) {
      result = "Error: reboot failed";
    }

    return result;
  } catch (error) {
    shell.echo("error", error);
    return error;
  }
}

export { echo, pm2, reboot };
