export class RoleMappingModel {
  id: number;
  principalType: string;
  principalId: string;
  roleId: number;

  constructor() {
    this.principalType = "USER";
    this.principalId = "";
    this.roleId = null;
  }

  public fieldList() {
    return [
      { field_name: "principalType", name: "tipo", text: "tipo" },
      { field_name: "principalType", name: "id_usuario", text: "Id Usuario" },
      { field_name: "roleId", name: "id_role", text: "Id Rol" }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }


}
