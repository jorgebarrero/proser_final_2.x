export class CallsWaitTimeModel {
  day_name: string;
  week_day: string;
  interval_init: string;
  interval_finish: string;
  interval_start: string;
  interval_end: string;
  start_date: string;
  beforeIdealTime: string;
  inboundAttended: string;
  afterFive: string;
  afterTen: string;
  afterFifteen: string;
  afterTwenty: string;
  afterTwentyfive: string;
  afterThirty: string;
  afterSixty: string;
  afterTwoMinutes: string;
  afterThreeMinutes: string;
  afterFourMinutes: string;
  afterMoreFourMinutes: string;

  constructor() {
    this.day_name = "";
    this.week_day = "";
    this.interval_start = "";
    this.interval_end = "";
    this.start_date = "";
    this.beforeIdealTime = "";
    this.inboundAttended = "";
    this.afterFive = "";
    this.afterTen = "";
    this.afterFifteen = "";
    this.afterTwenty = "";
    this.afterTwentyfive = "";
    this.afterThirty = "";
    this.afterSixty = "";
    this.afterTwoMinutes = "";
    this.afterThreeMinutes = "";
    this.afterFourMinutes = "";
    this.afterMoreFourMinutes = "";
  }

  public fieldList() {
    return [
      { field_name: "day_name", name: "nombre_dia", text: "Día" },
      { field_name: "week_day", name: "dia_semana", text: "Dia num" },
      {
        field_name: "interval_init",
        name: "intervalo_inicial_num",
        text: "Inicio"
      },
      {
        field_name: "interval_finish",
        name: "intervalo_final_num",
        text: "Fin"
      },
      {
        field_name: "interval_start",
        name: "interval_start",
        text: "Intervalo inicial"
      },
      {
        field_name: "interval_end",
        name: "interval_end",
        text: "Intervalo final"
      },
      { field_name: "start_date", name: "fecha_inicio", text: "Fecha" },
      {
        field_name: "beforeIdealTime",
        name: "antes_tiempo_ideal",
        text: "Antes tiempo ideal"
      },
      { field_name: "inboundAttended", name: "atendidas", text: "Atendidas" },
      {
        field_name: "afterFive",
        name: "cero_cinco",
        text: "0-5"
      },
      {
        field_name: "afterTen",
        name: "cinco_diez",
        text: "6-10"
      },
      {
        field_name: "afterFifteen",
        name: "diez_qince",
        text: "11-15"
      },
      {
        field_name: "afterTwenty",
        name: "quince_veinte",
        text: "16-20"
      },
      {
        field_name: "afterTwentyfive",
        name: "veinte_veinticinco",
        text: "21-25"
      },
      {
        field_name: "afterThirty",
        name: "veinticinco_treinta",
        text: "26-30"
      },
      {
        field_name: "afterSixty",
        name: "treinta_sesenta",
        text: "31-60"
      },
      {
        field_name: "afterTwoMinutes",
        name: "sesenta_cientoveinte",
        text: "61-120"
      },
      {
        field_name: "afterThreeMinutes",
        name: "cientoveinte_cientochenta",
        text: "121-180"
      },
      {
        field_name: "afterFourMinutes",
        name: "cientochenta_doscientocuarenta",
        text: "181-240"
      },
      {
        field_name: "afterMoreFourMinutes",
        name: "doscientocuarenta_mas",
        text: "241 ->"
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
