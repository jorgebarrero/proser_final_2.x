export class ServicioIntervalo {

  date_text: string;
  month_name: string;
  day_name: string;
  day_number: string;

  recibidas: string;
  atendidas: string;
  atendidas_20: string;
  abandonadas: string;

  porc_abandono: string;
  nivel_atencion: string;
  asa: string;

  minutos_atendidos: string;

  tiempo_operacion: string;
  tmo: string;
  nivel_de_servicio: string;

  cantidad_agentes: string;

  constructor(


    date_text = '',
    month_name = '',
    day_name = '',
    day_number = '',

    recibidas = '',
    atendidas = '',
    atendidas_20 = '',
    abandonadas = '',

    porc_abandono = '',
    nivel_atencion = '',
    asa = '',

    minutos_atendidos = '',

    tiempo_operacion = '',
    tmo = '',
    nivel_de_servicio = '',

    cantidad_agentes = '',

  ) {

    this.date_text = date_text;
    this.month_name = month_name;
    this.day_name = day_name;
    this.day_number = day_number;

    this.recibidas = recibidas;
    this.atendidas = atendidas;
    this.atendidas_20 = atendidas_20;
    this.abandonadas = abandonadas;

    this.porc_abandono = porc_abandono;
    this.nivel_atencion = nivel_atencion;
    this.asa = asa;

    this.minutos_atendidos = minutos_atendidos;

    this.tiempo_operacion = tiempo_operacion;
    this.tmo = tmo;
    this.nivel_de_servicio = nivel_de_servicio;

    this.cantidad_agentes = cantidad_agentes;
  }

}
