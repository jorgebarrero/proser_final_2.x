export class InvClientModel {

 inv_client_id: number;
 inv_client_status: string;
 inv_client_chk: string;
 inv_client_name: string;
 inv_client_shortname: string;
 inv_client_type: string;

 constructor() {
    this.inv_client_id = 0;
    this.inv_client_chk = null;
    this.inv_client_status = 'A';
    this.inv_client_name = null;
    this.inv_client_shortname = null;
    this.inv_client_type = null;
   }
  
  
  public fieldList() {
    return [
      {field_name: 'inv_client_id', name: 'id', text: 'Id' },
      {field_name: 'inv_client_chk', name: 'chk', text: 'Chk' },
      {field_name: 'inv_client_status', name: 'estado', text: 'Estado' },
      {field_name: 'inv_client_name', name: 'nombre_cliente', text: 'Nombre cliente' },
      {field_name: 'inv_client_shortname', name: 'nombre_corto', text: 'Nombre corto' },
      {field_name: 'inv_client_type', name: 'tipo_cliente', text: 'Tipo cliente' },
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
