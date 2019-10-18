export class CallsDetailModel {
  agent_id: number;
  agent_extension: string;
  agent_transfer: string;
  agent_name: string;
  agent_supervisor_name: string;
  start_date: string;
  start_time: string;
  cdr_id: string;
  cdr_uniqueid: string;
  call_type: string;
  call_source: string;
  call_destiny: string;
  duration: string;
  call_status: string;
  call_clasif: string;
  record: string;
  queue_time: string;
  connection_time: string;
  end_time: string;
  time_hung_agent: string;
  time_hung_caller: string;
  time_abandoned: string;

  constructor() {
    this.agent_id = 0;
    this.agent_extension = "";
    this.agent_transfer = "";
    this.agent_name = "";
    this.agent_supervisor_name = "";
    this.start_date = "";
    this.start_time = "";
    this.cdr_id = "";
    this.cdr_uniqueid = "";
    this.call_type = "";
    this.call_source = "";
    this.call_destiny = "";
    this.duration = "";
    this.call_status = "";
    this.call_clasif = "";
    this.record = "";
    this.queue_time = "";
    this.connection_time = "";
    this.end_time = "";
    this.time_hung_agent = "";
    this.time_hung_caller = "";
    this.time_abandoned = "";
  }

  public fieldList() {
    return [
      {
        field_name: "agent_id",
        name: "agente_id",
        text: "Id",
        html: "<p>Id</p>"
      },
      {
        field_name: "agent_extension",
        name: "agente_extension",
        text: "Ext",
        html: "<p>Ext</p>"
      },
      {
        field_name: "agent_transfer",
        name: "agente_transferencia",
        text: "Trans",
        html: "<p>Trans</p>"
      },
      {
        field_name: "agent_name",
        name: "nombre_agente",
        text: "Agente",
        html: "<p>Agente</p>"
      },
      {
        field_name: "agent_supervisor_name",
        name: "nombre_supervisor",
        text: "Supervisor",
        html: "<p>Supervisor</p>"
      },
      {
        field_name: "start_date",
        name: "fecha_inicio",
        text: "Fecha inicio",
        html: "<p>Fecha <br> inicio</p>"
      },
      {
        field_name: "start_time",
        name: "tiempo_inicio",
        text: "Tiempo inicio",
        html: "<p>Hora <br> inicio</p>"
      },
      {
        field_name: "cdr_id",
        name: "id",
        text: "Id",
        html: "<p>Cdr id</p>"
      },
      {
        field_name: "cdr_uniqueid",
        name: "id",
        text: "Id",
        html: "<p>Uniqueid</p>"
      },
      {
        field_name: "call_type",
        name: "tipo",
        text: "Tipo",
        html: "<p>Tipo<br>Llamada</p>"
      },
      {
        field_name: "call_source",
        name: "origen",
        text: "Origen",
        html: "<p>Origen</p>"
      },
      {
        field_name: "call_destiny",
        name: "destino",
        text: "Destino",
        html: "<p>Destino</p>"
      },
      {
        field_name: "duration",
        name: "duracion",
        text: "Duración",
        html: "<p>Duración</p>"
      },
      {
        field_name: "call_status",
        name: "estatus",
        text: "Estatus",
        html: "<p>Estatus</p>"
      },
      {
        field_name: "call_clasif",
        name: "clasificacion",
        text: "Clasificación",
        html: "<p>Clasificación</p>"
      },
      {
        field_name: "record",
        name: "grabacion",
        text: "Grabación",
        html: "<p>Grabación</p>"
      },
      {
        field_name: "queue_time",
        name: "tiempo_cola",
        text: "Hora cola",
        html: "<p>Hora<br>cola</p>"
      },
      {
        field_name: "connection_time",
        name: "tiempo_conexion",
        text: "Hora conexión",
        html: "<p>Hora de<br>conexión</p>"
      },
      {
        field_name: "end_time",
        name: "tiempo_final",
        text: "Hora final",
        html: "<p>Hora <br> fin</p>"
      },
      {
        field_name: "time_hung_agent",
        name: "tiempo_colgado_agente",
        text: "Hora colgado agente",
        html: "<p>Colgado<br>agente</p>"
      },
      {
        field_name: "time_hung_caller",
        name: "tiempo_colgado_llamante",
        text: "Hora colgado llamante",
        html: "<p>Colgado<br> cliente</p>"
      },
      {
        field_name: "time_abandoned",
        name: "tiempo_abandonada",
        text: "Hora abandonada",
        html: "<p> Hora <br> abandono </p>"
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
