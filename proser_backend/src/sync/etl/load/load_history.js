import { loadInventory } from "./load_inventory";
import { loadMain } from "./load_main";
import { loadHca } from "./load_hca";

// import * as moment from "moment";
const moment = require("moment");
const colors = require("colors");

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red"
});

const fast = process.env.UPDATE_FAST
  ? parseInt(process.env.UPDATE_FAST, 10)
  : 10000;
const medium = process.env.UPDATE_MEDIUM
  ? parseInt(process.env.UPDATE_MEDIUM, 10)
  : 20000;
const slow = process.env.UPDATE_SLOW
  ? parseInt(process.env.UPDATE_SLOW, 10)
  : 30000;
const very_slow = process.env.UPDATE_VERY_SLOW
  ? parseInt(process.env.UPDATE_VERY_SLOW, 10)
  : 3600000;

let today = moment().format("YYYY-MM-DD");

let input_date = process.argv[2];
let input_request = process.argv[3];

input_date === undefined ? (input_date = today) : input_date;
input_request === undefined ? (input_request = "all") : "";

let times_inventory = 0;
let times_main = 0;
let times_hca = 0;

async function loadHistory() {
  console.clear();
  console.log(
    "\x1b[36m%s\x1b[0m",
    "**************** HISTORIC UPDATE ******************"
  );

  console.log("\x1b[36m%s\x1b[0m", "today", today, typeof today);
  console.log("\x1b[36m%s\x1b[0m", "input_date", input_date, typeof input_date);
  console.log(
    "\x1b[36m%s\x1b[0m",
    "input_request",
    input_request,
    typeof input_request
  );

  console.log("Speed:".cyan);
  console.log(
    "very_slow",
    very_slow / 1000,
    "slow",
    slow / 1000,
    "medium",
    medium / 1000,
    "fast",
    fast / 1000
  );

  console.log("*************************************");
  console.log("");

  await executeInventory(input_date, input_request);
  await executeHca(input_date, input_request);
  await executeMain(input_date, input_request);

  setInterval(async function() {
    console.log(
      "\x1b[33m%s\x1b[0m",
      "TIMES executeInventory: ",
      times_inventory
    );
    input_date = previousDate(input_date);
    console.log(
      "\x1b[36m%s\x1b[0m",
      "**************** HISTORIC UPDATE ******************"
    );
    console.log(
      "\x1b[36m%s\x1b[0m",
      "input_date",
      input_date,
      typeof input_date
    );

    await executeInventory(input_date, input_request);
    await executeHca(input_date, input_request);
    await executeMain(input_date, input_request);

    times_inventory = times_inventory + 1;
  }, slow);
}

async function executeInventory(input_date, input_request) {
  let inv_inventory = await loadInventory(input_date, input_request);
  console.log(
    "////////////////// LOAD INVENTORY END ////////////////////".green
  );
  console.log("");
}

async function executeMain(input_date, input_request) {
  let inv_main = await loadMain(input_date, input_request);
  console.log("////////////////// LOAD MAIN END ////////////////////".green);
  console.log("");
}

async function executeHca(input_date, input_request) {
  let inv_hca = await loadHca(input_date, input_request);
  console.log("////////////////// LOAD HCA END ////////////////////".green);
  console.log("");
}

function previousDate(initial_date) {
  let formated_date = moment().format("YYYY-MM-DD");
  let startdate = moment(initial_date);
  let previous_date = startdate.subtract(1, "days");
  formated_date = startdate.format("YYYY-MM-DD");
  return formated_date;
}

loadHistory();
