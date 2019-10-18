export class AuxIntervalModel {

 aux_interval_id: number;
 aux_interval_name: string;
 aux_interval_minutes: number;
 aux_interval_value: number;
 aux_interval_status: string;


 constructor() {
    this.aux_interval_id = 0;
    this.aux_interval_name = null;
    this.aux_interval_minutes = 0;
    this.aux_interval_value = 0;
    this.aux_interval_status = 'A';
   }
  
  
  
  public fieldList() {
    return [
      {field_name: 'aux_interval_id', name: 'id', text: 'Id' },
      {field_name: 'aux_interval_name', name: 'nombre_intervalo', text: 'Nombre intervalo' },
      {field_name: 'aux_interval_minutes', name: 'minutos', text: 'Minutos' },
      {field_name: 'aux_interval_value', name: 'valor_intervalo', text: 'Valor intervalo' },
      {field_name: 'aux_interval_status', name: 'estado', text: 'Estado' },
    ]
  }
  
  public fieldInfo(field_name) {
  
    const register = this.fieldList();
  
    return register
    .filter( x => {
      return x.field_name === field_name;
    })[0];
  
  }
  
}
