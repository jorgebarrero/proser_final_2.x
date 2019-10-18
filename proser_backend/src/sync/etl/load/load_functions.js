import moment from "moment";
import { start } from "repl";

const time = parseInt(process.env.CDR_TIME_INTERVAL, 10);

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

const batch_big = process.env.CDR_BATCH_LIMIT;
const batch_slow = process.env.CDR_BATCH_LIMIT_SLOW;

let counter = -1;

let start_date = moment(new Date()).format("YYYY-MM-DD");
let date = moment(start_date)
  .add(1, "days")
  .format("YYYY-MM-DD");
let today = moment(new Date()).format("YYYY-MM-DD");

if (!input_date) {
  start_date = moment(new Date()).format("YYYY-MM-DD");
} else {
  start_date = input_date;
}

async function info() {
  console.log("SPEED", very_slow, slow, medium, fast);
  console.log("BATCH", batch_big, batch_slow);
  console.log("REQUEST", request);
  console.log("INPUT DATE", input_date);
  console.log("START DATE", start_date);
}
