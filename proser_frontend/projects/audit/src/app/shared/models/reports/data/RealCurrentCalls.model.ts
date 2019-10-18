export class RealCurrentCallsReportModel {
  rcc_callentry_id: string;
  rcc_callentry_agent_id: string;
  rcc_callentry_queue_id: string;
  rcc_callentry_contact_id: string;
  rcc_callentry_callerid: string;
  rcc_callentry_datetime_init: string;
  rcc_callentry_datetime_end: string;
  rcc_callentry_duration: string;
  rcc_callentry_duration_sec: string;
  rcc_callentry_status: string;
  rcc_callentry_transfer: string;
  rcc_callentry_datetime_entry_queue: string;
  rcc_callentry_duration_wait_sec: string;
  rcc_callentry_uniqueid: string;
  rcc_callentry_campaign_id: string;
  rcc_callentry_trunk: string;
  rcc_date: string;

  constructor() {
    this.rcc_callentry_id = "";
    this.rcc_callentry_agent_id = "";
    this.rcc_callentry_queue_id = "";
    this.rcc_callentry_contact_id = "";
    this.rcc_callentry_callerid = "";
    this.rcc_callentry_datetime_init = "";
    this.rcc_callentry_datetime_end = "";
    this.rcc_callentry_duration = "";
    this.rcc_callentry_duration_sec = "";
    this.rcc_callentry_status = "";
    this.rcc_callentry_transfer = "";
    this.rcc_callentry_datetime_entry_queue = "";
    this.rcc_callentry_duration_wait_sec = "";
    this.rcc_callentry_uniqueid = "";
    this.rcc_callentry_campaign_id = "";
    this.rcc_callentry_trunk = "";
    this.rcc_date = "";
  }

  public fieldList() {
    return [
      { field_name: "rcc_callentry_id", name: "id", text: "Id" },
      {
        field_name: "rcc_callentry_agent_id",
        name: "agente_id",
        text: "Id agente"
      },
      {
        field_name: "rcc_callentry_queue_id",
        name: "cola_id",
        text: "Cola id"
      },
      {
        field_name: "rcc_callentry_contact_id",
        name: "contacto_id",
        text: "Contacto Id"
      },
      {
        field_name: "rcc_callentry_callerid",
        name: "llamante_id",
        text: "Llamante Id"
      },
      {
        field_name: "rcc_callentry_datetime_init",
        name: "inicio",
        text: "Inicio"
      },
      { field_name: "rcc_callentry_datetime_end", name: "fin", text: "Fin" },
      {
        field_name: "rcc_callentry_duration",
        name: "duracion",
        text: "Duracion"
      },
      {
        field_name: "rcc_callentry_duration_sec",
        name: "duracion_seg",
        text: "Duracion seg"
      },
      { field_name: "rcc_callentry_status", name: "status", text: "Starus" },
      {
        field_name: "rcc_callentry_transfer",
        name: "transferencia",
        text: "Transferencia"
      },
      {
        field_name: "rcc_callentry_datetime_entry_queue",
        name: "ingreso_cola",
        text: "Ingreso cola"
      },
      {
        field_name: "rcc_callentry_duration_wait_sec",
        name: "espera_seg",
        text: "Espera seg"
      },
      {
        field_name: "rcc_callentry_uniqueid",
        name: "unique_id",
        text: "Id unico"
      },
      {
        field_name: "rcc_callentry_campaign_id",
        name: "campaña_id",
        text: "Id campaña"
      },
      { field_name: "rcc_callentry_trunk", name: "troncal", text: "Troncal" },
      { field_name: "rcc_date", name: "fecha", text: "Fecha" }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
