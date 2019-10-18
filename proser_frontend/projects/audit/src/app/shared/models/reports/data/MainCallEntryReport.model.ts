export class MainCallEntryReportModel {
  callentry_id = 0;

  callentry_agent_id = 0;
  callentry_queue_id = 0;

  inv_agent_name: string;
  inv_queue_number: string;
  agent_supervisor_name: string;
  callentry_contact_id = 0;
  callentry_callerid: string;
  callentry_datetime_init: string;
  callentry_datetime_end: string;
  callentry_duration_sec: string;
  callentry_status: string;
  callentry_transfer: string;
  callentry_datetime_entry_queue: string;
  callentry_duration_sec_wait: string;
  callentry_uniqueid: string;
  callentry_campaign_id = 0;
  callentry_trunk: string;
  callentry_date: string;
  callentry_queue_time_expired: string;
  callentry_type: string;
  callentry_auto_campaign: string;
  callentry_queue_number: string;
  __QUEUELOG__: string;
  callentry_who_hung: string;
  callentry_hung_agent: string;
  callentry_hung_caller: string;

  constructor() {
    this.callentry_id = 0;
    this.callentry_agent_id = 0;
    this.callentry_queue_id = 0;

    this.inv_queue_number = "";
    this.inv_agent_name = "";
    this.agent_supervisor_name = "";
    this.callentry_contact_id = 0;
    this.callentry_callerid = "";
    this.callentry_datetime_init = "";
    this.callentry_datetime_end = "";
    this.callentry_duration_sec = "";
    this.callentry_status = "";
    this.callentry_transfer = "";
    this.callentry_datetime_entry_queue = "";
    this.callentry_duration_sec_wait = "";
    this.callentry_uniqueid = "";
    this.callentry_campaign_id = 0;
    this.callentry_trunk = "";
    this.callentry_date = "";
    this.callentry_queue_time_expired = "";
    this.callentry_type = "";
    this.callentry_auto_campaign = "";
    this.callentry_queue_number = "";
    this.__QUEUELOG__ = "";
    this.callentry_who_hung = "";
    this.callentry_hung_agent = "";
    this.callentry_hung_caller = "";
  }

  public fieldList() {
    return [
      { field_name: "callentry_id", name: "id", text: "Id" },

      {
        field_name: "callentry_agent_id",
        name: "agente_id",
        text: "Id agente"
      },
      { field_name: "callentry_queue_id", name: "cola_id", text: "Id cola" },

      {
        field_name: "inv_queue_number",
        name: "cola_numero",
        text: "Cola num"
      },
      { field_name: "inv_agent_name", name: "agente_nombre", text: "Agente" },
      {
        field_name: "agent_supervisor_name",
        name: "supervisor_nombre",
        text: "Supervisor"
      },

      {
        field_name: "callentry_contact_id",
        name: "llamante_id",
        text: "Id Llamante"
      },
      {
        field_name: "callentry_callerid",
        name: "llamante_id",
        text: "LLamante"
      },
      {
        field_name: "callentry_datetime_init",
        name: "inicio",
        text: "Inicio"
      },
      {
        field_name: "callentry_datetime_end",
        name: "final",
        text: "Final"
      },
      {
        field_name: "callentry_duration_sec",
        name: "duracion_sec",
        text: "Duración seg."
      },
      {
        field_name: "callentry_status",
        name: "status",
        text: "Status"
      },
      {
        field_name: "callentry_transfer",
        name: "transferido",
        text: "Transferido"
      },
      { field_name: "audit_date", name: "fecha", text: "Fecha" },

      {
        field_name: "callentry_datetime_entry_queue",
        name: "entrada_cola",
        text: "Entrada en cola"
      },

      {
        field_name: "callentry_duration_sec_wait",
        name: "espera_sec",
        text: "Espera seg"
      },

      {
        field_name: "callentry_uniqueid",
        name: "identificador_llamada",
        text: "Uniqueid"
      },

      {
        field_name: "callentry_campaign_id",
        name: "campaña",
        text: "Campaña"
      },

      {
        field_name: "callentry_trunk",
        name: "trunk",
        text: "Trunk"
      },

      {
        field_name: "callentry_date",
        name: "fecha",
        text: "Fecha"
      },

      {
        field_name: "callentry_queue_time_expired",
        name: "tiempo_expirado",
        text: "Tiempo expirado"
      },

      {
        field_name: "callentry_type",
        name: "tipo",
        text: "Tipo"
      },

      {
        field_name: "callentry_auto_campaign",
        name: "auto_campaña",
        text: "Auto campaña"
      },

      {
        field_name: "callentry_queue_number",
        name: "numero_cola",
        text: "Número cola"
      },

      {
        field_name: "__QUEUELOG__",
        name: "queuelog",
        text: "queuelog"
      },

      {
        field_name: "callentry_who_hung",
        name: "colgada",
        text: "Colgada"
      },

      {
        field_name: "callentry_hung_agent",
        name: "colgada_agente",
        text: "Colgada agente"
      },

      {
        field_name: "callentry_hung_caller",
        name: "colgada_llamante",
        text: "Colgada llamante"
      }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
