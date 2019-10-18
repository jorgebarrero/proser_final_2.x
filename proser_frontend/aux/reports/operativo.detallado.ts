export class OperativoDetallado {


  fecha: string;
  mes: string;
  dia_semana: string;
  dia_mes: string;
  servicio: string;
  filtro: string;

  count: string;


  constructor(

  fecha= '',
  mes = '',
  dia_semana = '',
  dia_mes = '',
  servicio = '',
  filtro = '',

  count = '',


  ) {

    this.fecha = fecha;
    this.mes = mes;
    this.dia_semana = dia_semana;
    this.dia_mes = dia_mes ;
    this.servicio = servicio ;
    this.filtro =  filtro;
    this.count = count;
  }

}
