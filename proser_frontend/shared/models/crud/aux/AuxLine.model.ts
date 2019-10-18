export class AuxLineModel {

 aux_line_id: number;
 aux_line_name: string;
 aux_line_value: number;
 aux_line_status: string;


 constructor() {
    this.aux_line_id = 0;
    this.aux_line_name = null;
    this.aux_line_value = 0;
    this.aux_line_status = 'A';
   }
  
  
  
  public fieldList() {
    return [
      {field_name: 'aux_line_id', name: 'id', text: 'Id' },
      {field_name: 'aux_line_name', name: 'nombre_linea', text: 'Nombre linea' },
      {field_name: 'aux_line_value', name: 'valor_linea', text: 'Valor linea' },
      {field_name: 'aux_line_status', name: 'estado', text: 'Estado' },
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
