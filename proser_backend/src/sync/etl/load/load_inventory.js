import { extractInvAgent } from "../extract/inv/extract_agent";
import { extractInvBreak } from "../extract/inv/extract_break";
import { extractInvCampaign } from "../extract/inv/extract_campaign";
import { extractInvQueue } from "../extract/inv/extract_queue";
import { extractInvQueueConfig } from "../extract/inv/extract_queueconfig";

import { transformInvAgent } from "../transform/inv/agent/transform_agent";
import { transformInvBreak } from "../transform/inv/break/transform_break";
import { transformInvQueue } from "../transform/inv/queue/transform_queue";
import { transformInvCampaign } from "../transform/inv/campaign/transform_campaign";

async function loadInventory(input_date, input_request) {
  // console.clear();
  try {
    if (input_request === "InvAgent" || input_request === "all") {
      let inv_agent = await extractInvAgent(input_date);
      console.log("inv_agent", inv_agent);
      let tra_agent = await transformInvAgent(input_date);
      console.log("inv_agent", tra_agent);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "InvBreak" || input_request === "all") {
      let inv_break = await extractInvBreak(input_date);
      console.log("inv_break", inv_break);
      let tra_break = await transformInvBreak(input_date);
      console.log("tra_break", tra_break);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "InvCampaign" || input_request === "all") {
      let inv_campaign = await extractInvCampaign(input_date);
      console.log("inv_campaign", inv_campaign);
      let tra_campaign = await transformInvCampaign(input_date);
      console.log("tra_campaign", tra_campaign);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "InvQueueConfig" || input_request === "all") {
      let inv_queueconfig = await extractInvQueueConfig(input_date);
      console.log("inv_queueconfig", inv_queueconfig);
      // let tra_queueconfig = await transformInvQueueConfig();
      // console.log("tra_queueconfig", tra_queueconfig);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "InvQueue" || input_request === "all") {
      let inv_queue = await extractInvQueue(input_date);
      console.log("inv_queue", inv_queue);
      let tra_queue = await transformInvQueue(input_date);
      console.log("tra_queue", tra_queue);
      console.log("------------------------------------------------");
      console.log("");
    }

    console.log("************** End load INVENTORY **************");
  } catch (e) {
    console.log("error", e);
  }
}

module.exports = {
  loadInventory
};
