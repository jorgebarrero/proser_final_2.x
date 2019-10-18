export class RealCurrentBeaksReportModel {
  rcb_break_audit_id: string;
  rcb_break_agent_id: string;
  rcb_break_id: string;
  rcb_break_datetime_init: string;
  rcb_break_datetime_end: string;
  rcb_break_duration: string;
  rcb_break_duration_sec: string;
  rcb_break_name: string;
  rcb_break_productivity: string;
  rcb_date: string;
  audit_cdr_queues: string;
  inv_agent_name: string;
  agent_supervisor_name: string;

  constructor() {
    this.rcb_break_audit_id = "";
    this.rcb_break_agent_id = "";
    this.rcb_break_id = "";
    this.rcb_break_datetime_init = "";
    this.rcb_break_datetime_end = "";
    this.rcb_break_duration = "";
    this.rcb_break_duration_sec = "";
    this.rcb_break_name = "";
    this.rcb_break_productivity = "";
    this.rcb_date = "";
    this.audit_cdr_queues = "";
    this.inv_agent_name = "";
    this.agent_supervisor_name = "";
  }

  public fieldList() {
    return [
      { field_name: "rcb_break_audit_id", name: "id", text: "Id" },
      {
        field_name: "rcb_break_agent_id",
        name: "agente_id",
        text: "Id agente"
      },
      { field_name: "rcb_break_id", name: "break_id", text: "Id break" },
      { field_name: "rcb_break_datetime_init", name: "inicio", text: "Inicio" },
      { field_name: "rcb_break_datetime_end", name: "fin", text: "Fin" },
      { field_name: "rcb_break_duration", name: "duracion", text: "Duración" },
      {
        field_name: "rcb_break_duration_sec",
        name: "duracion_seg",
        text: "Duración seg"
      },
      {
        field_name: "rcb_break_name",
        name: "break_nombre",
        text: "Nombre break"
      },
      {
        field_name: "rcb_break_productivity",
        name: "productividad",
        text: "Productividad"
      },
      { field_name: "rcb_date", name: "fecha", text: "Fecha" },
      { field_name: "audit_cdr_queues", name: "colas", text: "Colas" },
      { field_name: "inv_agent_name", name: "agente_nombre", text: "Agente" },
      {
        field_name: "agent_supervisor_name",
        name: "supervisor_nombre",
        text: "Supervisor"
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
