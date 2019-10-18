import { loadReal } from "./load_real";

const {
  setIntervalAsync,
  clearIntervalAsync
} = require("set-interval-async/dynamic");

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

const very_fast = process.env.UPDATE_VERY_FAST
  ? parseInt(process.env.UPDATE_FAST, 10)
  : 2000;
const fast = process.env.UPDATE_FAST
  ? parseInt(process.env.UPDATE_FAST, 10)
  : 5000;
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
let times_realagents = 0;

async function loadDay() {
  console.clear();
  console.log(
    "\x1b[36m%s\x1b[0m",
    "**************** DAYLY UPDATE ******************"
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

  await executeReal(input_date, input_request);

  setInterval(() => {
    console.log("\x1b[33m%s\x1b[0m", "TIMES executeReal: ", times_realagents);
    executeReal(input_date, input_request);
    times_realagents = times_realagents + 1;
  }, very_fast);
}

async function executeReal(input_date, input_request) {
  let inv_realagents = await loadReal(input_date, input_request);
  console.log("////////////////// LOAD REAL END ////////////////////".green);
  console.log("");
}

loadDay();
