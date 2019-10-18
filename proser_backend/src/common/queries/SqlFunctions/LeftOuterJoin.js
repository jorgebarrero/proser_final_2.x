const CallEntry_InvAgent_ById = 

    `
    LEFT OUTER JOIN  InvAgent
    ON callentry_agent_id = inv_agent_id
     `;


const CallEntry_InvQueue_ById = 

     `
      LEFT OUTER JOIN InvQueue
      ON callentry_queue_id = inv_queue_id
      `;

const CallEntry_Full_ById = 

      `
      LEFT OUTER JOIN  InvAgent
      ON callentry_agent_id = inv_agent_id 
      LEFT OUTER JOIN InvQueue
      ON callentry_queue_id = inv_queue_id
      LEFT OUTER JOIN HcaAgent
      ON callentry_date = hca_agent_date
      AND callentry_agent_id = hca_agent_id
      LEFT OUTER JOIN HcaQueue
      ON callentry_date = hca_queue_date
      AND callentry_queue_id = hca_queue_id
       `;


const Cdr_InvAgent_ById = 

    `
    LEFT OUTER JOIN  InvAgent
    ON cdr_agent_id = inv_agent_id
     `;


const Cdr_InvQueue_ById = 

    `
    LEFT OUTER JOIN InvQueue
    ON cdr_queue_id = inv_queue_id
     `;

const Cdr_Full_ById = 

     `
     LEFT OUTER JOIN InvQueue
     ON cdr_queue_id = inv_queue_id
     LEFT OUTER JOIN InvQueue
     ON cdr_queue_id = inv_queue_id
     LEFT OUTER JOIN HcaAgent
     ON cdr_date = hca_agent_date
     AND cdr_agent_id = hca_agent_id
     LEFT OUTER JOIN HcaQueue
     ON cdr_date = hca_queue_date
     AND cdr_queue_id = hca_queue_id
      `;


const HcaAgent_InvAgent_ById = 

    `
    LEFT OUTER JOIN InvAgent
    ON hca_agent_id = inv_agent_id
     `;


const RealCurrentAgents_InvAgent_ById = 

     `
     LEFT OUTER JOIN InvAgent
     ON rca_logged_agent_id = inv_agent_id
      `;


const Audit_InvAgent_ById = 

      `
      LEFT OUTER JOIN InvAgent
      ON audit_agent_id = inv_agent_id
       `;

const Audit_InvQueue_ById = 

       `
       LEFT OUTER JOIN InvAgent
       ON audit_agent_id = inv_queue_id
        `;

export {
  CallEntry_InvAgent_ById,
  CallEntry_InvQueue_ById,
  CallEntry_Full_ById,
  Cdr_InvAgent_ById,
  Cdr_InvQueue_ById,
  Cdr_Full_ById,
  HcaAgent_InvAgent_ById,
  RealCurrentAgents_InvAgent_ById,
  Audit_InvAgent_ById
};