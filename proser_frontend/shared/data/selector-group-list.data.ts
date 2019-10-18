const groupList = [
  {
    id: 1,
    name: "AGENTE",
    table: "InvAgent",
    inv_id: "inv_agent_id",
    inv_name: "inv_agent_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_people_json, "$.agent[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_people_json, "$.agent[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.agent[0].id"))'
  },
  {
    id: 2,
    name: "SUPERVISOR",
    table: "InvSupervisor",
    inv_id: "inv_supervisor_id",
    inv_name: "inv_supervisor_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_people_json, "$.supervisor[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_people_json, "$.supervisor[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.supervisor[0].id"))'
  },
  {
    id: 3,
    name: "COLA",
    table: "InvQueue",
    inv_id: "inv_queue_id",
    inv_name: "inv_queue_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_operation_json, "$.queue[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_operation_json, "$.queue[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.queue[0].id"))'
  },
  {
    id: 4,
    name: "CLIENTE",
    table: "InvClient",
    inv_id: "inv_client_id",
    inv_name: "inv_client_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_operation_json, "$.client[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_operation_json, "$.client[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.client[0].id"))'
  },
  {
    id: 5,
    name: "SERVICIO",
    table: "InvService",
    inv_id: "inv_service_id",
    inv_name: "inv_service_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_operation_json, "$.service[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_operation_json, "$.service[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.service[0].id"))'
  },
  {
    id: 6,
    name: "CAMPAÑA",
    table: "InvCampaign",
    inv_id: "inv_campaign_id",
    inv_name: "inv_campaign_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_operation_json, "$.campaign[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_operation_json, "$.campaign[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.campaign[0].id"))'
  },
  {
    id: 6,
    name: "TURNO",
    table: " InvSchedule",
    inv_id: "inv_schedule_id",
    inv_name: "inv_schedule_name",
    MainCallEntry_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(callentry_time_json, "$.schedule[0].id"))',
    MainCdr_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(cdr_time_json, "$.schedule[0].id"))',
    MainAudit_json_id:
      'JSON_UNQUOTE(JSON_EXTRACT(audit_time_json, "$.schedule[0].id"))'
  }
];

export default groupList;
