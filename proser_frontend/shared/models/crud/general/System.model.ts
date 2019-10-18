export class SystemJsonModel {
  scale?: any;

  constructor() {
    this.scale = [];
  }

  public fieldList() {
    return [{ field_name: "scale", name: "escala", text: "Escala" }];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
