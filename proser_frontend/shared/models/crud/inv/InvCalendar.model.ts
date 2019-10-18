export class InvCalendarModel {
  inv_calendar_id: number
  inv_calendar_name: string
  inv_calendar_type: string
  inv_calendar_status: string
  inv_calendar_chk: string

  constructor() {
    this.inv_calendar_id = 0;
    this.inv_calendar_status = 'A';
    this.inv_calendar_chk = null;
    this.inv_calendar_type = null;
    this.inv_calendar_name = null;
  }

  public fieldList() {
    return [
      { field_name: 'inv_calendar_id', name: 'id', text: 'Id' },
      { field_name: 'inv_calendar_status', name: 'estado', text: 'Estado' },
      { field_name: 'inv_calendar_chk', name: 'chk', text: 'Chk' },
      {
        field_name: 'inv_calendar_type',
        name: 'tipo_calendario',
        text: 'Tipo',
      },
      {
        field_name: 'inv_calendar_name',
        name: 'nombre_calendario',
        text: 'Nombre',
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
