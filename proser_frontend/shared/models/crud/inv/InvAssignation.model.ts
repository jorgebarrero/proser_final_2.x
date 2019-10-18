export class InvAssignationModel {
  inv_break_id: number
  inv_break_status: string
  inv_break_chk: number
  inv_break_name: string
  inv_break_shortname: string
  inv_break_description: string
  inv_break_type: string
  inv_break_productivity: number
  inv_break_class: string

  constructor() {
    this.inv_break_id = 0;
    this.inv_break_status = 'A';
    this.inv_break_chk = 1;
    this.inv_break_name = 'new break';
    this.inv_break_shortname = 'new break';
    this.inv_break_description = 'new break';
    this.inv_break_type = 'B';
    this.inv_break_productivity = 1;
    this.inv_break_class = 'Auxiliar';
  }

  public fieldList() {
    return [
      { field_name: 'inv_break_id', name: 'id', text: 'Id' },
      { field_name: 'inv_break_status', name: 'estado', text: 'Estado' },
      { field_name: 'inv_break_chk', name: 'chk', text: 'Chk' },
      {
        field_name: 'inv_break_name',
        name: 'nombre_asignacion',
        text: 'Nombre asignacion',
      },
      {
        field_name: 'inv_break_shortname',
        name: 'nombre_corto',
        text: 'Nombre corto',
      },
      {
        field_name: 'inv_break_description',
        name: 'descripcion',
        text: 'Descripción',
      },
      {
        field_name: 'inv_break_type',
        name: 'tipo_asignacion',
        text: 'Tipo asignacion',
      },
      {
        field_name: 'inv_break_productivity',
        name: 'productividad',
        text: 'Productividad',
      },
      {
        field_name: 'inv_break_class',
        name: 'clase_asignacion',
        text: 'Clase asignacion',
      },
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
