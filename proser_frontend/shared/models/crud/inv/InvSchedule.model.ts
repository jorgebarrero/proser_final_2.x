export class InvScheduleModel {

 inv_schedule_id: number;
 inv_schedule_status: string;
 inv_schedule_chk: string;
 inv_schedule_type: string;
 inv_schedule_name: string;
 inv_schedule_shortname: string;
 inv_schedule_description: string;


 constructor() {
    this.inv_schedule_id = 0;
    this.inv_schedule_status = 'A';
    this.inv_schedule_chk = null;
    this.inv_schedule_type = null;
    this.inv_schedule_name = null;
    this.inv_schedule_shortname = null;
    this.inv_schedule_description = null;
    
   }
  
  
  public fieldList() {
    return [
      {field_name: 'inv_schedule_id', name: 'id', text: 'Id' },
      {field_name: 'inv_schedule_status', name: 'estado', text: 'Estado' },
      {field_name: 'inv_schedule_chk', name: 'chk', text: 'Chk' },
      {field_name: 'inv_schedule_type', name: 'tipo_turno', text: 'Tipo turno' },
      {field_name: 'inv_schedule_name', name: 'nombre_turno', text: 'Nombre turno' },
      {field_name: 'inv_schedule_shortname', name: 'nombre_corto', text: 'Nomre corto' },
      {field_name: 'inv_schedule_description', name: 'descripcion', text: 'Descripcion' },
      
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
