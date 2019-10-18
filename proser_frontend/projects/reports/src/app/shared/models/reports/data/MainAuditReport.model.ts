export class MainAuditReportModel {
  audit_id: number;
  audit_agent_id: number;
  audit_break_id: number;
  audit_datetime_init: string;
  audit_datetime_end: string;
  audit_duration: string;
  audit_ext_parked: string;
  __TIME__: string;
  audit_duration_sec: string;
  audit_status: string;
  audit_date: string;
  audit_cdr_queues: string;

  supervisor?: string;
  schedule?: string;
  role?: string;

  client?: string;
  queue?: string;
  service?: string;
  campaign?: string;

  inv_agent_name?: string;
  inv_break_name?: string;

  constructor() {
    this.audit_id = 0;
    this.audit_agent_id = 0;
    this.audit_break_id = 0;
    this.audit_datetime_init = "2019-01-01";
    this.audit_datetime_end = "2019-01-01";
    this.audit_duration = "xxxx";
    this.audit_ext_parked = "xxxx";
    this.__TIME__ = "xxxx";
    this.audit_duration_sec = "xxxx";
    this.audit_status = "xxxx";
    this.audit_date = "2019-01-01";
    this.audit_cdr_queues = "xxxx";
  }

  public fieldList() {
    return [
      { field_name: "audit_id", name: "id", text: "Id" },
      { field_name: "audit_agent_id", name: "agente_id", text: "Id agente" },
      { field_name: "audit_break_id", name: "break", text: "Id break" },
      { field_name: "audit_datetime_init", name: "inicio", text: "Inicio" },
      {
        field_name: "audit_datetime_end",
        name: "final",
        text: "Final"
      },
      {
        field_name: "audit_duration",
        name: "duracion",
        text: "Duración"
      },
      {
        field_name: "audit_duration_sec",
        name: "duracion_sec",
        text: "Duración seg."
      },
      {
        field_name: "audit_status",
        name: "status",
        text: "Estatus"
      },
      { field_name: "audit_date", name: "fecha", text: "Fecha" },

      {
        field_name: "audit_cdr_queues",
        name: "info_colas_cdr",
        text: "Info colas Cdr"
      },

      {
        field_name: "supervisor",
        name: "supervisor",
        text: "Supervisor"
      },

      {
        field_name: "schedule",
        name: "turno",
        text: "Turno"
      },

      {
        field_name: "role",
        name: "rol",
        text: "Rol"
      },

      {
        field_name: "client",
        name: "cliente",
        text: "Cliente"
      },

      {
        field_name: "queue",
        name: "cola",
        text: "Cola"
      },

      {
        field_name: "service",
        name: "servicio",
        text: "Servicio"
      },

      {
        field_name: "campaign",
        name: "campaña",
        text: "Campaña"
      },

      {
        field_name: "inv_agent_name",
        name: "nombre_agente",
        text: "Agente"
      },

      {
        field_name: "inv_break_name",
        name: "nombre_break",
        text: "Break"
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
