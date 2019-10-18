export class CallsAutomaticDailyByIntervalModel {
  day_name: string;
  week_day: string;
  interval_start: string;
  interval_end: string;
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
  idealTime: string;

  constructor() {
    this.day_name = '',
    this.week_day = '',
    this.interval_start = "";
    this.interval_end = "";
    this.start_date = "";
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
    this.idealTime = "";
  }

  public fieldList() {
    return [
      { field_name: "day_name", name: "nombre_dia", text: "Día" },
      { field_name: "week_day", name: "dia_semana", text: "Dia num" },
      { field_name: "interval_start", name: "interval_start", text: "Intervalo inicial" },
      { field_name: "interval_end", name: "interval_end", text: "Intervalo final" },
      { field_name: "start_date", name: "start_date", text: "Fecha desde" },
      { field_name: "start_time", name: "start_time", text: "Hora inicio" },
      {
        field_name: "automaticReceived",
        name: "automaticReceived",
        text: "LLamadas recibidas"
      },
      {
        field_name: "automaticAbandoned",
        name: "automaticAbandoned",
        text: "LLamadas abandonadas"
      },
      {
        field_name: "automaticAttended",
        name: "automaticAttended",
        text: "LLamadas atendidas"
      },
      {
        field_name: "automaticShort",
        name: "automaticShort",
        text: "LLamadas cortas"
      },
      {
        field_name: "automaticBeforeTime",
        name: "automaticBeforeTime",
        text: "llamadas antes de 20"
      },
      {
        field_name: "automaticHungAgent",
        name: "automaticHungAgent",
        text: "LLamadas colgadas"
      },
      {
        field_name: "automaticServiceLevel",
        name: "automaticServiceLevel",
        text: "Nivel servicio"
      },
      {
        field_name: "automaticAtentionLevel",
        name: "automaticAtentionLevel",
        text: "Nivel atención"
      },
      {
        field_name: "automaticAbandonLevel",
        name: "automaticAbandonLevel",
        text: "Nivel abandono"
      },
      {
        field_name: "operation_seconds",
        name: "operation_seconds",
        text: "Segundos operacion"
      },
      {
        field_name: "operation_time",
        name: "operation_time",
        text: "Tiempo operacion"
      },
      {
        field_name: "wait_seconds",
        name: "wait_seconds",
        text: "Segundos espera"
      },
      {
        field_name: "wait_time",
        name: "wait_time",
        text: "Tiempo espera"
      },
      {
        field_name: "automaticTmo",
        name: "automaticTmo",
        text: "TMO"
      },
      {
        field_name: "automaticAsa",
        name: "automaticAsa",
        text: "ASA"
      },
      {
        field_name: "idealTime",
        name: "idealTime",
        text: "tiempo ideal"
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