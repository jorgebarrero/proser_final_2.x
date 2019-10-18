export class DetalleLlamadas {



  fecha;
  hora;
  tipo;

  agente;
  supervisor;
  cliente;
  cola;
  campana;
  servicio;

  extension;
  origen;
  destino;
  duracion;

  t_atencion;
  llamadas_atendidas;

  status;


  constructor(
    fecha = '',
    hora = '',
    tipo = '',

    agente = '',
    supervisor = '',
    cliente = '',
    cola = '',
    campana = '',
    servicio = '',

    extension = '',
    origen = '',
    destino = '',
    duracion = '',

    t_atencion = '',
    llamadas_atendidas = '',

    status = '',


  ) {

    this.fecha = fecha;
    this.hora = hora;
    this.tipo = tipo;

    this.agente = agente;
    this.supervisor = supervisor;
    this.cliente = cliente;
    this.cola = cola;
    this.campana = campana;
    this.servicio = servicio;

    this.extension = extension;
    this.origen = origen;
    this.destino = destino;
    this.duracion = duracion;

    this.t_atencion = t_atencion;
    this.llamadas_atendidas = llamadas_atendidas;

    this.status = status;
  }

}
