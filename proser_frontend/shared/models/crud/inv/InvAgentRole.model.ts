export class InvAgentRoleModel {

 inv_agentrole_id: number;
 inv_agentrole_name: string;
 inv_agentrole_status: string;

 constructor() {
  this.inv_agentrole_id = 0;
  this.inv_agentrole_name = null;
  this.inv_agentrole_status = 'A';
 }


public fieldList() {
  return [
    {field_name: 'inv_agentrole_id', name: 'id', text: 'Id' },
    {field_name: 'inv_agentrole_name', name: 'descripcion', text: 'Descripción' },
    {field_name: 'inv_agentrole_status', name: 'estado', text: 'Estado' },
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
