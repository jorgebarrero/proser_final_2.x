export class AuxColorModel {

 aux_color_id: number;
 aux_color_name: string;
 aux_color_string: string;
 aux_color_use: string;
 aux_color_status: string;

 constructor() {
  this.aux_color_id = 0;
  this.aux_color_name = null;
  this.aux_color_string = '#000000';
  this.aux_color_use = null;
  this.aux_color_status = 'A';
 }



public fieldList() {
  return [
    {field_name: 'aux_color_id', name: 'id', text: 'Id' },
    {field_name: 'aux_color_name', name: 'nombre_color', text: 'Nombre del color' },
    {field_name: 'aux_color_string', name: 'color.hex', text: 'Codigo de color' },
    {field_name: 'aux_color_use', name: 'uso', text: 'Uso' },
    {field_name: 'aux_color_status', name: 'estado', text: 'Estado' },
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
