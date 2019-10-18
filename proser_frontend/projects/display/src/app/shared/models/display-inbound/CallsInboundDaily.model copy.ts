export class CallsInboundDailyModel {
  day_name: string;
  week_day: string;
  start_date: string;
  start_time: string;
  end_time: string;
  inboundReceived: string;
  inboundAbandoned: string;
  inboundAttended: string;
  inboundShort: string;
  inboundBeforeTime: string;
  inboundAfterTime: string;
  inboundHungAgent: string;
  inboundServiceLevel: string;
  inboundAttentionLevel: string;
  inboundAbandonLevel: string;
  operation_seconds: string;
  operation_time: string;
  wait_seconds: string;
  wait_time: string;
  inboundTmo: string;
  inboundAsa: string;
  idealResponseTime: string;

  constructor() {
    (this.day_name = ""), (this.week_day = ""), (this.start_date = "");
    this.start_time = "";
    this.end_time = "";
    this.inboundReceived = "";
    this.inboundAbandoned = "";
    this.inboundAttended = "";
    this.inboundShort = "";
    this.inboundBeforeTime = "";
    this.inboundAfterTime = "";
    this.inboundHungAgent = "";
    this.inboundServiceLevel = "";
    this.inboundAttentionLevel = "";
    this.inboundAbandonLevel = "";
    this.operation_seconds = "";
    this.operation_time = "";
    this.wait_seconds = "";
    this.wait_time = "";
    this.inboundTmo = "";
    this.inboundAsa = "";
    this.idealResponseTime = "";
  }

  public fieldList() {
    return [
      { field_name: "day_name", name: "nombre_dia", text: "Día" },
      { field_name: "week_day", name: "dia_semana", text: "Dia num" },

      { field_name: "start_date", name: "fecha_inicio", text: "Fecha" },
      { field_name: "start_time", name: "hora_inicio", text: "Hora inicio" },
      { field_name: "end_time", name: "hora_fin", text: "Hora final" },
      {
        field_name: "inboundReceived",
        name: "llamadas_recibidas",
        text: "Recibidas"
      },
      {
        field_name: "inboundAbandoned",
        name: "llamadas_abandonadas",
        text: "Abandonadas"
      },
      {
        field_name: "inboundAttended",
        name: "llamadas_atendidas",
        text: "Atendidas"
      },
      {
        field_name: "inboundShort",
        name: "llamadas_cortas",
        text: "Cortas"
      },
      {
        field_name: "inboundBeforeTime",
        name: "llamadas_atendidas_antes_de",
        text: "Atendidas antes",
        html: `Atendidas <br> antes de tiempo`
      },
      {
        field_name: "inboundAfterTime",
        name: "llamadas_atendidas_despues_de",
        text: "Atendidas después",
        html: `Atendidas <br> después de tiempo`
      },

      {
        field_name: "inboundHungAgent",
        name: "llamadas_colgadas_agente",
        text: "Colgadas agente"
      },
      {
        field_name: "inboundServiceLevel",
        name: "nivel_servicio",
        text: "Nivel servicio"
      },
      {
        field_name: "inboundAttentionLevel",
        name: "nivel_atencion",
        text: "Nivel atención"
      },
      {
        field_name: "inboundAbandonLevel",
        name: "nivel_abandono",
        text: "Nivel abandono"
      },
      {
        field_name: "operation_seconds",
        name: "seg_operacion",
        text: "Seg operacion"
      },
      {
        field_name: "operation_time",
        name: "tiempo_operacion",
        text: "Hrs operacion"
      },
      {
        field_name: "wait_seconds",
        name: "seg_espera",
        text: "Seg espera"
      },
      {
        field_name: "wait_time",
        name: "tiempo_espera",
        text: "Hrs espera"
      },
      {
        field_name: "inboundTmo",
        name: "tmo_entrante",
        text: "TMO"
      },
      {
        field_name: "inboundAsa",
        name: "asa_entrante",
        text: "ASA"
      },
      {
        field_name: "idealResponseTime",
        name: "tiempo_ideal_respuesta",
        text: "Tiempo ideal"
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
