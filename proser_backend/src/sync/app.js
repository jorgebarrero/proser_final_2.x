import { updateMainCdr } from './updates/cdr/update_cdr_main';
import { updateMainAudit } from './updates/audit/update_audit_main';
import { updateMainAuditEmpty } from './updates/audit/update_audit_main_empty';

import { updateAgent } from './updates/inv/update_agent';
import { updateBreak } from './updates/inv/update_break';
import { updateCampaign } from './updates/inv/update_campaign';
import { updateQueue } from './updates/inv/update_queue';


const time = process.env.CDR_TIME_INTERVAL;

async function repeatUpdate( ) {

  setInterval(
    function() {
      console.clear();
      console.log(`/*************/ MAIN UPDATE /*************/ `);
      // updateMainCdr();
      updateMainAudit();
      // updateMainAuditEmpty();

      // updateAgent();
      // updateBreak();
      // updateCampaign();
      // updateQueue();

    }, 5000
  );
}

repeatUpdate();
