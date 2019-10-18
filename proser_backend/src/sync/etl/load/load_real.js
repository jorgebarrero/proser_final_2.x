import { extractRealAgents } from "../extract/real/extract_realagents";
import { transformRealAgents } from "../transform/real/real-agents/transform_realagents";
import { updateRealagents } from "../update/real/update_realagents";

import { extractRealBreaks } from "../extract/real/extract_realbreaks";
import { transformRealBreaks } from "../transform/real/real-breaks/transform_realbreaks";
import { updateRealbreaks } from "../update/real/update_realbreaks";

import { extractRealCalls } from "../extract/real/extract_realcalls";
import { transformRealCalls } from "../transform/real/real-calls/transform_realcalls";
import { updateRealcalls } from "../update/real/update_realcalls";

async function loadReal(input_date, input_request) {
  // console.clear();

  if (input_request === "RealCalls" || input_request === "all") {
    let inv_realcalls = await extractRealCalls(input_date);
    console.log("inv_realcalls", inv_realcalls);
    let tra_realcalls = await transformRealCalls(input_date);
    console.log("tra_realcalls", tra_realcalls);
    let up_realcalls = await updateRealcalls(input_date);
    console.log("up_realcalls", up_realcalls);
    console.log("------------------------------------------------");
    console.log("");
  }

  if (input_request === "RealBreaks" || input_request === "all") {
    let inv_realbreaks = await extractRealBreaks(input_date);
    console.log("inv_realbreaks", inv_realbreaks);
    let tra_realbreaks = await transformRealBreaks(input_date);
    console.log("tra_realbreaks", tra_realbreaks);
    let up_realbreaks = await updateRealbreaks(input_date);
    console.log("up_realbreaks", up_realbreaks);
    console.log("------------------------------------------------");
    console.log("");
  }

  try {
    if (input_request === "RealAgents" || input_request === "all") {
      let inv_realagents = await extractRealAgents(input_date);
      console.log("inv_realagents", inv_realagents);
      let tra_realagents = await transformRealAgents(input_date);
      console.log("tra_realagents", tra_realagents);
      let up_realagents = await updateRealagents(input_date);
      console.log("up_realagents", up_realagents);

      console.log("------------------------------------------------");
      console.log("");
    }

    console.log("************** End load REAL **************");
  } catch (e) {
    console.log("error", e);
    // process.exit(1);
  }
}

module.exports = {
  loadReal
};
