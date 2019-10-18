import { extractMainQueueLog } from "../extract/main/extract_queuelog";
import { extractMainAudit } from "../extract/main/extract_audit";
import { extractMainCallEntry } from "../extract/main/extract_callentry";
import { extractMainCdr } from "../extract/main/extract_cdr";

import { updateMainAudit } from "../update/main/update_audit";
import { updateMainCalEntry } from "../update/main/update_callentry";

import { transformMainAudit } from "../transform/main/audit/transform_audit";
import { transformMainCallEntry } from "../transform/main/callentry/transform_callentry";

import { transformMainCdr } from "../transform/main/cdr/transform_cdr";

import { transformMainCdrHca } from "../transform/main/cdr/transform_cdr_hca";

async function loadMain(input_date, input_request) {
  // console.clear();
  try {
    if (input_request === "MainQueuelog" || input_request === "all") {
      let inv_queuelog = await extractMainQueueLog(input_date);
      console.log("inv_queuelog", inv_queuelog);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "MainAudit" || input_request === "all") {
      let inv_audit = await extractMainAudit(input_date);
      console.log("upd_audit", upd_audit);
      let tra_audit = await transformMainAudit(input_date);
      console.log("inv_audit", inv_audit);
      let upd_audit = await updateMainAudit(input_date);
      console.log("tra_audit", tra_audit);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "MainCallEntry" || input_request === "all") {
      let inv_call_entry = await extractMainCallEntry(input_date);
      console.log("inv_call_entry", inv_call_entry);
      let up_call_entry = await updateMainCalEntry(input_date);
      console.log("up_call_entry", up_call_entry);
      let tra_call_entry = await transformMainCallEntry(input_date);
      console.log("tra_call_entry", tra_call_entry);
      console.log("------------------------------------------------");
      console.log("");
    }

    if (input_request === "MainCdr" || input_request === "all") {
      let inv_cdr = await extractMainCdr(input_date);
      console.log("inv_cdr", inv_cdr);
      let tra1_cdr = await transformMainCdr(input_date);
      console.log("tra_cdr", tra1_cdr);
      let tra2_cdr = await transformMainCdrHca(input_date);
      console.log("tra_cdr", tra2_cdr);

      console.log("------------------------------------------------");
      console.log("");
    }

    console.log("************** End load MAIN **************");
  } catch (e) {
    console.log("error", e);
  }
}

module.exports = {
  loadMain
};
