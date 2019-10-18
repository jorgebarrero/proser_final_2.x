export class DetalladoSaliente {



  fecha: string;
  mes: string;
  dia_semana: string;
  dia_mes: string;
  servicio: string;
  filtro: string;

  supervisor: string;
  agente: string;
  documento_agentes: string;

  t_login: string;
  t_disponible: string;
  t_ocupado: string;
  t_break: string;

  entrantes: string;
  t_entrantes: string;
  salientes: string;
  t_salientes: string;

  colgadas: string;
  not_ready: string;
  t_not_ready: string;

  on_hold: string;
  t_on_hold: string;

  internas: string;
  t_internas: string;

  t_promedio_atencion: string;


  constructor(

  fecha= '',
  mes = '',
  dia_semana = '',
  dia_mes = '',
  servicio = '',
  filtro = '',

  supervisor = '',
  agente = '',
  documento_agentes = '',

  t_login = '',
  t_disponible = '',
  t_ocupado = '',
  t_break = '',

  entrantes = '',
  t_entrantes = '',
  salientes = '',
  t_salientes = '',

  colgadas = '',
  not_ready = '',
  t_not_ready = '',

  on_hold = '',
  t_on_hold = '',

  internas = '',
  t_internas = '',

  t_promedio_atencion = '',


  ) {

    this.fecha = fecha;
    this.mes = mes;
    this.dia_semana = dia_semana;
    this.dia_mes = dia_mes ;
    this.servicio = servicio ;
    this.filtro =  filtro;

    this.supervisor = supervisor;
    this.agente = agente;
    this.documento_agentes = documento_agentes;

    this.t_login = t_login;
    this.t_disponible = t_disponible;
    this.t_ocupado = t_ocupado;
    this.t_break = t_break;

    this.entrantes = entrantes;
    this.t_entrantes = t_entrantes;
    this.salientes = salientes;
    this.t_salientes = t_salientes;

    this.colgadas = colgadas;
    this.not_ready = not_ready;
    this.t_not_ready = t_not_ready;

    this.on_hold = on_hold;
    this.t_on_hold = t_on_hold;

    this.internas = internas;
    this.t_internas = t_internas;

    this.t_promedio_atencion = t_promedio_atencion;
  }

}
