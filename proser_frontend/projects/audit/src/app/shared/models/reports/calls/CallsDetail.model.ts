export class CallsDetailModel {

agent_id: number;
agent_name: string;
agent_supervisor_name: string;
start_date: string;
start_time: string;
call_type: string;
call_source: string;
call_destiny: string;
duration: string;
call_status: string;
call_clasif: string;
record: string;
queue_time: string;
conection_time: string;
end_time: string;
time_hung_agent: string;
time_hung_caller: string;
time_abandoned: string;

  constructor() {

  this.agent_id = 0;
  this.agent_name =  "";
  this.agent_supervisor_name =  "";
  this.start_date =  "";
  this.start_time =  "";
  this.call_type =  "";
  this.call_source =  "";
  this.call_destiny =  "";
  this.duration =  "";
  this.call_status =  "";
  this.call_clasif =  "";
  this.record =  "";
  this.queue_time =  "";
  this.conection_time =  "";
  this.end_time =  "";
  this.time_hung_agent =  "";
  this.time_hung_caller =  "";
  this.time_abandoned =  "";
  }

  public fieldList() {
    return [
      { field_name: "agent_id", name: "agente_id", text: "Id agente" },
      { field_name: "agent_name", name: "nombre_agente", text: "Nombre agente" },
      { field_name: "agent_supervisor_name", name: "nombre_supervisor", text: "Nombre supervisor" },
      { field_name: "start_date", name: "fecha_inicio", text: "Fecha inicio" },
      {
        field_name: "start_time",
        name: "tiempo_inicio",
        text: "Tiempo inicio"
      },
      {
        field_name: "call_type",
        name: "tipo",
        text: "Tipo"
      },
      {
        field_name: "call_source",
        name: "origen",
        text: "Origen"
      },
      {
        field_name: "call_destiny",
        name: "destino",
        text: "Destino"
      },
      {
        field_name: "duration",
        name: "duracion",
        text: "Duración"
      },
      {
        field_name: "call_status",
        name: "estatus",
        text: "Estatus"
      },
      {
        field_name: "call_clasif",
        name: "clasificacion",
        text: "Clasificación"
      },
      {
        field_name: "record",
        name: "grabacion",
        text: "Grabación"
      },
      {
        field_name: "queue_time",
        name: "tiempo_cola",
        text: "Hora cola"
      },
      {
        field_name: "conection_time",
        name: "tiempo_conexion",
        text: "Hora conexión"
      },
      {
        field_name: "end_time",
        name: "tiempo_final",
        text: "Hora final"
      },
      {
        field_name: "time_hung_agent",
        name: "tiempo_colgado_agente",
        text: "Hora colgado agente"
      },
      {
        field_name: "time_hung_caller",
        name: "tiempo_colgado_llamante",
        text: "Hora colgado llamante"
      },
      {
        field_name: "time_abandoned",
        name: "tiempo_abandonada",
        text: "Hora abandonada"
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
