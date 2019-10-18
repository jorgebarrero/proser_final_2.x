export class Productividad {

  date_text;
  origin;
  month_name;
  day_name;
  day_number;

  agentes_audit;
  agentes_cdr;

  tiempo_conversacion;
  tiempo_disponible;

  auxiliar_01;
  auxiliar_02;
  auxiliar_03;
  auxiliar_04;
  auxiliar_05;
  auxiliar_06;
  auxiliar_07;
  auxiliar_08;
  auxiliar_09;
  auxiliar_10;



  constructor(

    date_text = '',
    origin = '',
    month_name = '',
    day_name = '',
    day_number = '',

    agentes_audit = '',
    agentes_cdr = '',

    tiempo_conversacion = '',
    tiempo_disponible = '',

    auxiliar_01 = '',
    auxiliar_02 = '',
    auxiliar_03 = '',
    auxiliar_04 = '',
    auxiliar_05 = '',
    auxiliar_06 = '',
    auxiliar_07 = '',
    auxiliar_08 = '',
    auxiliar_09 = '',
    auxiliar_10 = '',


  ) {

    this.date_text = date_text;
    this.origin = origin;
    this.month_name = month_name;
    this.day_name = day_name;
    this.day_number = '';

    this.agentes_audit = '';
    this.agentes_cdr = '';

    this.tiempo_conversacion = tiempo_conversacion;
    this.tiempo_disponible = tiempo_disponible;

    this.auxiliar_01 = auxiliar_01;
    this.auxiliar_02 = auxiliar_02;
    this.auxiliar_03 = auxiliar_03;
    this.auxiliar_04 = auxiliar_04;
    this.auxiliar_05 = auxiliar_05;
    this.auxiliar_06 = auxiliar_06;
    this.auxiliar_07 = auxiliar_07;
    this.auxiliar_08 = auxiliar_08;
    this.auxiliar_09 = auxiliar_09;
    this.auxiliar_10 = auxiliar_10;
  }

}
