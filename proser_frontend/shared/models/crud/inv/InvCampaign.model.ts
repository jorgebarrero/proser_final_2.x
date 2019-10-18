export class InvCampaignModel {

 inv_campaign_id: number;       
 inv_campaign_status: string;
 inv_campaign_chk: number;
 inv_campaign_name: string;
 inv_campaign_shortname: string;
 inv_campaign_description: string;
 inv_campaign_queue_id: number;
 inv_campaign_queue_name: string;
 inv_campaign_queue_number: string;
 inv_campaign_aftercall_time: string;
 inv_campaign_start_date: string;
 inv_campaign_end_date: string;
 inv_campaign_start_time: string;
 inv_campaign_end_time: string;

 constructor() {
    this.inv_campaign_id = 0;
    this.inv_campaign_chk = null;
    this.inv_campaign_status = 'A';
    this.inv_campaign_name = null;
    this.inv_campaign_shortname = null;
    this.inv_campaign_description = null;
    this.inv_campaign_queue_id = 0;
    this.inv_campaign_queue_name = null;
    this.inv_campaign_queue_number = null;
    this.inv_campaign_aftercall_time = null;
    this.inv_campaign_start_date = null;
    this.inv_campaign_end_date = null;
    this.inv_campaign_start_time = null;
    this.inv_campaign_end_time = null;
   }
  
  
  public fieldList() {
    return [
      {field_name: 'inv_campaign_id', name: 'id', text: 'Id' },
      {field_name: 'inv_campaign_chk', name: 'chk', text: 'Chk' },
      {field_name: 'inv_campaign_status', name: 'estado', text: 'Estado' },
      {field_name: 'inv_campaign_name', name: 'nombre_campaña', text: 'Nombre campaña' },
      {field_name: 'inv_campaign_shortname', name: 'nombre_corto', text: 'Nombre corto' },
      {field_name: 'inv_campaign_description', name: 'descripcion', text: 'Descripcion' },
      {field_name: 'inv_campaign_queue_id', name: 'id_cola', text: 'Id cola' },
      {field_name: 'inv_campaign_queue_name', name: 'nombre_cola', text: 'Nombre cola' },
      {field_name: 'inv_campaign_queue_number', name: 'numero_cola', text: 'Numero cola' },
      {field_name: 'inv_campaign_aftercall_time', name: 'tiempo_despues_llamada', text: 'Tiempo despues llamada' },
      {field_name: 'inv_campaign_start_date', name: 'fecha_inicio', text: 'Fecha inicio' },
      {field_name: 'inv_campaign_end_date', name: 'fecha_final', text: 'Fecha final' },
      {field_name: 'inv_campaign_start_time', name: 'hora_inicio', text: 'Hora inicio' },
      {field_name: 'inv_campaign_end_time', name: 'hora_final', text: 'Hora final' },
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
