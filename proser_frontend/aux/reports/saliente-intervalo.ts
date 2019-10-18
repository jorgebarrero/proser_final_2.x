export class SalienteIntervalo {



  fecha;
  mes;
  dia_sem;
  dia;
  intervalo;

  campanas;
  realizadas;
  contestadas;

  cant_bdd;
  cant_faltantes;
  cant_vueltas;

  registros;

  constructor(

    fecha = '',
    mes = '',
    dia_sem = '',
    dia = '',
    intervalo = '',

    campanas = '',
    realizadas = '',
    contestadas = '',

    cant_bdd = '',
    cant_faltantes = '',
    cant_vueltas = '',

    registros = '',


  ) {

  this.fecha =  fecha;
  this.mes =  mes;
  this.dia_sem = dia_sem ;
  this.dia = dia ;
  this.intervalo = intervalo  ;

  this.campanas = intervalo ;
  this.realizadas = realizadas ;
  this.contestadas = contestadas ;

  this.cant_bdd = cant_bdd ;
  this.cant_faltantes = cant_faltantes ;
  this.cant_vueltas = cant_vueltas ;

  this.registros =  registros;
  }

}
