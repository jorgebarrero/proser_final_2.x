export class SystemModel {
  system_id: any
  system_name: any

  constructor() {
    this.system_id = 0;
    this.system_name = 'command';
  }

  public fieldList() {
    return [
      { field_name: 'system_id', name: 'id', text: 'Id' },
      { field_name: 'system_name', name: 'nombre', text: 'Nombre' },
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
