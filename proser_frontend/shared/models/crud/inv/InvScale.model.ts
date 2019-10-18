export class InvScaleModel {
  inv_scale_id: number;
  inv_scale_status: string;
  inv_scale_chk: string;
  inv_scale_shortname: string;
  inv_scale_name: string;
  inv_scale_red: string;
  inv_scale_yellow: string;
  inv_scale_green: string;
  inv_scale_blue: string;

  constructor() {
    this.inv_scale_id = 0;
    this.inv_scale_status = "A";
    this.inv_scale_chk = null;
    this.inv_scale_name = null;
    this.inv_scale_shortname = null;
    this.inv_scale_red = null;
    this.inv_scale_yellow = null;
    this.inv_scale_green = null;
    this.inv_scale_blue = null;
  }

  public fieldList() {
    return [
      { field_name: "inv_scale_id", name: "id", text: "Id" },
      { field_name: "inv_scale_status", name: "estado", text: "Estado" },
      { field_name: "inv_scale_chk", name: "chk", text: "Chk" },
      {
        field_name: "inv_scale_name",
        name: "nombre_escala",
        text: "Nombre escala"
      },
      {
        field_name: "inv_scale_shortname",
        name: "nombre_corto",
        text: "Nombre corto"
      },
      { field_name: "inv_scale_red", name: "escala_rojo", text: "Rol rojo" },
      {
        field_name: "inv_scale_yellow",
        name: "escala_amarillo",
        text: "Rol amarillo"
      },
      {
        field_name: "inv_scale_green",
        name: "escala_verde",
        text: "Rol verde"
      },
      { field_name: "inv_scale_blue", name: "escala_azul", text: "Rol azul" }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
