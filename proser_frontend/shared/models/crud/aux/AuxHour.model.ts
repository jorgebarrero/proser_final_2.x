export class AuxHourModel {

 aux_hour_id: number;
 aux_hour_name: string;
 aux_hour_value: string;
 aux_hour_status: string;



 constructor() {
  this.aux_hour_id = 0;
  this.aux_hour_name = null;
  this.aux_hour_value = null;
  this.aux_hour_status = 'A';
 }



public fieldList() {
  return [
    {field_name: 'aux_hour_id', name: 'id', text: 'Id' },
    {field_name: 'aux_hour_name', name: 'nombre_color', text: 'Hora' },
    {field_name: 'aux_hour_value', name: 'valor', text: 'Valor' },
    {field_name: 'aux_hour_status', name: 'estado', text: 'Estado' },
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
