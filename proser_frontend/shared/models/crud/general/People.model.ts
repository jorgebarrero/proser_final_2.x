export class PeopleJsonModel {
  agent?: any;
  supervisor?: any;
  role?: any;
  type?: any;

  constructor() {
    this.agent = [];
    this.supervisor = [];
    this.role = [];
    this.type = [];
  }

  public fieldList() {
    return [
      { field_name: "agent", name: "agente", text: "Agente" },
      { field_name: "supervisor", name: "supervisor", text: "Supervisor" },
      { field_name: "role", name: "rol", text: "Rol" },
      { field_name: "type", name: "tipo", text: "Tipo" }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
