export class CallsAbandonedModel {

  callerid: string;
  callentry_date: string;
  time_entry_queue: string;
  duration_wait_secs: string;
  duration_wait_time: string;
  time_end: string;
  uniqueid: string;
  queue_name: string;
  queue_number: string;

  constructor() {
    this.callerid = "";
    this.callentry_date = "";
    this.time_entry_queue = "";
    this.duration_wait_secs = "";
    this.duration_wait_time = "";
    this.time_end = "";
    this.uniqueid = "";
    this.queue_name = "";
    this.queue_number = "";
  }

  public fieldList() {
    return [
      { field_name: "callerid", name: "origen", text: "Origen" },
      { field_name: "callentry_date", name: "fecha", text: "Fecha" },
      { field_name: "time_entry_queue", name: "entrada_cola", text: "Entrada cola" },
      { field_name: "duration_wait_secs", name: "segundos_espera", text: "Segundos espera" },
      { field_name: "duration_wait_time", name: "tiempo_espera", text: "Tiempo espera" },
      {
        field_name: "time_end",
        name: "final",
        text: "Final"
      },
      {
        field_name: "uniqueid",
        name: "uniqueid",
        text: "Uniqueid"
      },
      {
        field_name: "queue_name",
        name: "nombre_cola",
        text: "Nombre cola"
      },
      {
        field_name: "queue_number",
        name: "numero_cola",
        text: "Número cola"
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
