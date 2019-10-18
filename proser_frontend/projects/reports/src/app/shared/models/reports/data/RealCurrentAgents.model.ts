export class RealCurrentAgentsReportModel {
  rca_audit_login_id: string;
  rca_audit_logout_id: string;
  rca_date: string;

  __AGENT__?: string;
  rca_agent_id: string;
  rca_agent_name: string;
  rca_agent_datetime_login: string;
  rca_agent_datetime_logout: string;
  rca_agent_duration: string;
  rca_agent_duration_sec: string;
  rca_agent_status: string;

  __GROUP__?: string;
  rca_group_id: string;
  rca_group_name: string;
  rca_subgroup_id: string;
  rca_subgroup_name: string;

  __FOREIGN__?: string;
  audit_cdr_queues: string;
  inv_agent_name: string;
  agent_supervisor_name: string;

  // rca_audit_login_id;
  // rca_audit_logout_id;
  // rca_date;
  // rca_agent_id;
  // rca_agent_name;
  // rca_agent_datetime_login;
  // rca_agent_datetime_logout;
  // rca_agent_duration;
  // rca_agent_duration_sec;
  // rca_agent_status;
  // rca_group_id;
  // rca_group_name;
  // rca_subgroup_id;
  // rca_subgroup_name;
  // audit_cdr_queues;
  // inv_agent_name;
  // agent_supervisor_name;

  constructor() {
    this.rca_audit_login_id = "";
    this.rca_audit_logout_id = "";
    this.rca_date = "";
    this.rca_agent_id = "";
    this.rca_agent_name = "";
    this.rca_agent_datetime_login = "";
    this.rca_agent_datetime_logout = "";
    this.rca_agent_duration = "";
    this.rca_agent_duration_sec = "";
    this.rca_agent_status = "";
    this.rca_group_id = "";
    this.rca_group_name = "";
    this.rca_subgroup_id = "";
    this.rca_subgroup_name = "";
    this.audit_cdr_queues = "";
    this.inv_agent_name = "";
    this.agent_supervisor_name = "";
  }

  public fieldList() {
    return [
      { field_name: "rca_audit_login_id", name: "login_id", text: "Login Id" },
      {
        field_name: "rca_audit_logout_id",
        name: "logout_id",
        text: "Logout Id"
      },
      { field_name: "rca_date", name: "fecha", text: "Fecha" },
      { field_name: "rca_agent_id", name: "agente_id", text: "Agente Id" },
      { field_name: "rca_agent_name", name: "agente_nombre", text: "Agente" },
      {
        field_name: "rca_agent_datetime_login",
        name: "login_inicio",
        text: "Login inicio"
      },
      {
        field_name: "rca_agent_datetime_logout",
        name: "logout_fin",
        text: "logout fin"
      },
      { field_name: "rca_agent_duration", name: "duracion", text: "Duración" },
      {
        field_name: "rca_agent_duration_sec",
        name: "dureciona_seg",
        text: "Duración seg"
      },
      { field_name: "rca_agent_status", name: "status", text: "Status" },
      { field_name: "rca_group_id", name: "grupo_id", text: "Grupo Id" },
      { field_name: "rca_group_name", name: "grupo_nombre", text: "Grupo" },
      {
        field_name: "rca_subgroup_id",
        name: "subgrupo_id",
        text: "Subgrupo Id"
      },
      {
        field_name: "rca_subgroup_name",
        name: "subgrupo_nombre",
        text: "Subgrupo"
      },
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
