export class InvSmsModel {

 inv_sms_id: number;
 inv_sms_status: string;
 inv_sms_chk: string;
 inv_sms_name: string;
 inv_sms_date: string;
 inv_sms_time: string;
 inv_sms_msg: string;

 constructor() {
    this.inv_sms_id = 0;
    this.inv_sms_status = 'A';
    this.inv_sms_chk = null;
    this.inv_sms_name = null;
    this.inv_sms_date = null;
    this.inv_sms_time = null;
    this.inv_sms_msg = null;
   }
  
  
  public fieldList() {
    return [
      {field_name: 'inv_sms_id', name: 'id', text: 'Id' },
      {field_name: 'inv_sms_status', name: 'estado', text: 'Estado' },
      {field_name: 'inv_sms_chk', name: 'chk', text: 'Chk' },
      {field_name: 'inv_sms_name', name: 'nombre', text: 'Nombre' },
      {field_name: 'inv_sms_date', name: 'fecha', text: 'Fecha' },
      {field_name: 'inv_sms_time', name: 'hora', text: 'Hora' },
      {field_name: 'inv_sms_msg', name: 'mensaje', text: 'Mensaje' },
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
