export class CallsOutboundDailyModel {
  day_name: string;
  week_day: string;
  start_date: string;
  start_time: string;
  end_time: string;
  outboundMade: string;
  outboundFail: string;
  outboundAnswered: string;
  outboundEffective: string;
  outboundHungout: string;
  outboundContactLevel: string;
  outboundEffectiveLevel: string;
  operation_seconds: string;
  operation_time: string;
  outboundTMO: string;


  constructor() {
    (this.day_name = ""), (this.week_day = ""), (this.start_date = "");
    this.start_time =  "";
    this.end_time =  "";
    this.outboundMade =  "";
    this.outboundFail =  "";
    this.outboundAnswered =  "";
    this.outboundEffective =  "";
    this.outboundHungout =  "";
    this.outboundContactLevel =  "";
    this.outboundEffectiveLevel =  "";
    this.operation_seconds =  "";
    this.operation_time =  "";
    this.outboundTMO =  "";
  }

  public fieldList() {
    return [
      { field_name: "day_name", name: "nombre_dia", text: "Día" },
      { field_name: "week_day", name: "dia_semana", text: "Dia num" },
      { field_name: "start_date", name: "start_date", text: "Fecha" },
      { field_name: "start_time", name: "start_time", text: "Hora inicio" },
      { field_name: "end_time", name: "end_time", text: "Hora final" },
      { 
        field_name: "outboundMade", 
        name: "outboundMade", 
        text: "LLamadas realizadas" },
      {
        field_name: "outboundFail",
        name: "outboundFail",
        text: "LLamadas fallidas"
      },
      {
        field_name: "outboundAnswered",
        name: "outboundAnswered",
        text: "LLamadas contestadas"
      },
      {
        field_name: "outboundEffective",
        name: "outboundEffective",
        text: "LLamadas efectivas"
      },
      {
        field_name: "outboundHungout",
        name: "outboundHungout",
        text: "LLamadas colgadas"
      },
      {
        field_name: "outboundContactLevel",
        name: "outboundContactLevel",
        text: "Nivel contactabilidad"
      },
      {
        field_name: "outboundEffectiveLevel",
        name: "outboundEffectiveLevel",
        text: "Nivel efectividad"
      },
      {
        field_name: "operation_seconds",
        name: "operation_seconds",
        text: "Segundos operacion"
      },
      {
        field_name: "operation_time",
        name: "operation_time",
        text: "tiempo operacion"
      },
      {
        field_name: "outboundTMO",
        name: "outboundTMO",
        text: "tmo saliente"
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
