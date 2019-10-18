export class AgentsAssignationModel {
  break_name: string;
  record_id: string;
  previous_day: string;
  connected: string;
  agent_id: number;
  times_registered: string;
  agent_name: string;
  agent_legal_id: string;
  agent_internal_id: string;
  agent_extension: string;
  agent_supervisor_name: string;
  agent_schedule_name: string;
  min_date: string;
  max_date: string;
  start_time: string;
  end_time: string;
  duration_time: string;
  duration_time_secs: string;
  total: string;

  constructor() {
    this.break_name = "";
    this.record_id = "";
    this.previous_day = "";
    this.connected = "";
    this.agent_id = 0;
    this.times_registered = "";
    this.agent_name = "";
    this.agent_legal_id = "";
    this.agent_internal_id = "";
    this.agent_extension = "";
    this.agent_supervisor_name = "";
    this.agent_schedule_name = "";
    this.min_date = "";
    this.max_date = "";
    this.start_time = "";
    this.end_time = "";
    this.duration_time = "";
    this.duration_time_secs = "";
    this.total = "";
  }

  public fieldList() {
    return [
      {
        field_name: "break_name",
        name: "nombre_break",
        text: "Asignación"
      },
      { field_name: "record_id", name: "registro_id", text: "Id" },
      { field_name: "previous_day", name: "dia_previo", text: "Previo" },
      { field_name: "connected", name: "conectado", text: "Conectado" },
      { field_name: "agent_id", name: "id_agente", text: "Id agente" },
      {
        field_name: "times_registered",
        name: "veces_registrado",
        text: "Cant."
      },
      {
        field_name: "agent_name",
        name: "nombre_agente",
        text: "Nombre agente"
      },
      { field_name: "agent_legal_id", name: "cedula", text: "Cédula" },
      {
        field_name: "agent_internal_id",
        name: "doc_interno",
        text: "Doc. interno"
      },
      {
        field_name: "agent_extension",
        name: "extension",
        text: "Extensión"
      },
      {
        field_name: "agent_supervisor_name",
        name: "supervisor",
        text: "Supervisor"
      },
      {
        field_name: "agent_schedule_name",
        name: "horario",
        text: "Horario"
      },
      {
        field_name: "min_date",
        name: "fecha_inicial",
        text: "Fecha inicial"
      },
      {
        field_name: "max_date",
        name: "fecha_final",
        text: "Fecha final"
      },
      {
        field_name: "start_time",
        name: "hora_inicial",
        text: "Hora inicial"
      },
      {
        field_name: "end_time",
        name: "hora_final",
        text: "Hora final"
      },
      {
        field_name: "duration_time",
        name: "duracion",
        text: "Duración"
      },
      {
        field_name: "duration_time_secs",
        name: "duracion_seg",
        text: "Segundos conexión"
      },
      {
        field_name: "total",
        name: "total",
        text: "Total"
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
