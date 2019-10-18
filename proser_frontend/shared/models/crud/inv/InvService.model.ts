export class InvServiceModel {

 inv_service_id: number;
 inv_service_status: string;
 inv_service_chk: string;
 inv_service_name: string;
 inv_service_shortname: string;
 inv_service_type: string;
 inv_service_use: string;

 constructor() {
    this.inv_service_id = 0;
    this.inv_service_status = 'A';
    this.inv_service_chk = null;
    this.inv_service_name = null;
    this.inv_service_shortname = null;
    this.inv_service_type = null;
    this.inv_service_use = null;
   }
  
  
  public fieldList() {
    return [
      {field_name: 'inv_service_id', name: 'id', text: 'Id' },
      {field_name: 'inv_service_status', name: 'estado', text: 'Estado' },
      {field_name: 'inv_service_chk', name: 'chk', text: 'Chk' },
      {field_name: 'inv_service_name', name: 'nombre_servicio', text: 'Nombre servicio' },
      {field_name: 'inv_service_shortname', name: 'nombre_corto', text: 'Nombre corto' },
      {field_name: 'inv_service_type', name: 'tipo', text: 'Tipo' },
      {field_name: 'inv_service_use', name: 'uso', text: 'Uso' },
      
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
