export class CallsAutomaticDailyModel {
  day_name: string;
  week_day: string;
  start_date: string;
  start_time: string;
  end_time: string;
  automaticReceived: string;
  automaticAbandoned: string;
  automaticAttended: string;
  automaticShort: string;
  automaticBeforeTime: string;
  automaticHungAgent: string;
  automaticServiceLevel: string;
  automaticAtentionLevel: string;
  automaticAbandonLevel: string;
  operation_seconds: string;
  operation_time: string;
  wait_seconds: string;
  wait_time: string;
  automaticTmo: string;
  automaticAsa: string;
  idealResponseTime: string;

  constructor() {
    (this.day_name = ""), (this.week_day = ""), (this.start_date = "");
    this.start_time = "";
    this.end_time = "";
    this.automaticReceived = "";
    this.automaticAbandoned = "";
    this.automaticAttended = "";
    this.automaticShort = "";
    this.automaticBeforeTime = "";
    this.automaticHungAgent = "";
    this.automaticServiceLevel = "";
    this.automaticAtentionLevel = "";
    this.automaticAbandonLevel = "";
    this.operation_seconds = "";
    this.operation_time = "";
    this.wait_seconds = "";
    this.wait_time = "";
    this.automaticTmo = "";
    this.automaticAsa = "";
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
        field_name: "automaticReceived",
        name: "llamadas_recibidas",
        text: "Recibidas"
      },
      {
        field_name: "automaticAbandoned",
        name: "llamadas_abandonadas",
        text: "Abandonadas"
      },
      {
        field_name: "automaticAttended",
        name: "llamadas_atendidas",
        text: "Atendidas"
      },
      {
        field_name: "automaticShort",
        name: "llamadas_cortas",
        text: "Cortas"
      },
      {
        field_name: "automaticBeforeTime",
        name: "llamadas_contestadas_antes_de",
        text: "Antes de ..."
      },
      {
        field_name: "automaticHungAgent",
        name: "llamadas_colgadas_agente",
        text: "Colgadas agente"
      },
      {
        field_name: "automaticServiceLevel",
        name: "nivel_servicio",
        text: "Nivel servicio"
      },
      {
        field_name: "automaticAtentionLevel",
        name: "novel_atencion",
        text: "Nivel atención"
      },
      {
        field_name: "automaticAbandonLevel",
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
        field_name: "automaticTmo",
        name: "tmo_entrante",
        text: "TMO"
      },
      {
        field_name: "automaticAsa",
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
