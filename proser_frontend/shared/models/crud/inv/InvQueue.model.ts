import { OperationJsonModel } from "../general/Operation.model";
import { SystemJsonModel } from "../general/System.model";

export class InvQueueModel {
  inv_queue_id: any;
  inv_queue_status: any;
  inv_queue_chk: any;
  inv_queue_name: any;
  inv_queue_shortname: any;
  inv_queue_sms_name: any;
  inv_queue_number: any;
  inv_queue_type: any;

  __JSON__: any;
  inv_queue_operation_json: any;
  inv_queue_system_json: any;

  // OPTIONAL
  inv_queue_scale_json?: any;
  inv_queue_client_json?: any;
  inv_queue_service_json?: any;
  inv_queue_type_json?: any;

  constructor() {
    this.inv_queue_id = 0;
    this.inv_queue_status = "A";
    this.inv_queue_chk = 1;
    this.inv_queue_name = null;
    this.inv_queue_shortname = null;
    this.inv_queue_sms_name = null;
    this.inv_queue_number = null;
    this.inv_queue_type = "inbound";

    this.__JSON__ = "[]";
    this.inv_queue_operation_json = new OperationJsonModel();
    this.inv_queue_system_json = new SystemJsonModel();

    // optional
    this.inv_queue_scale_json = null;
    this.inv_queue_client_json = null;
    this.inv_queue_service_json = null;
    this.inv_queue_type_json = null;
  }

  public fieldList?() {
    return [
      { field_name: "inv_queue_id", name: "id", text: "Id" },
      { field_name: "inv_queue_status", name: "estado", text: "Estado" },
      { field_name: "inv_queue_chk", name: "chk", text: "Chk" },
      {
        field_name: "inv_queue_name",
        name: "nombre_cola",
        text: "Nombre cola"
      },
      {
        field_name: "inv_queue_shortname",
        name: "nombre_corto_cola",
        text: "Nombre corto cola"
      },
      {
        field_name: "inv_queue_sms_name",
        name: "nombre_sms",
        text: "Nombre SMS"
      },

      { field_name: "inv_queue_number", name: "numero", text: "Numero" },
      { field_name: "inv_queue_type", name: "tipo", text: "Tipo" },

      {
        field_name: "__JSON__",
        name: "separador_json",
        text: "JSON"
      },
      {
        field_name: "inv_queue_operation_json",
        name: "operacion_json",
        text: "Operación"
      },
      {
        field_name: "inv_queue_system_json",
        name: "sistema_json",
        text: "Sistema"
      },

      // optional
      {
        field_name: "inv_queue_scale_json",
        name: "escala_json",
        text: "Escala"
      },

      {
        field_name: "inv_queue_client_json",
        name: "cliente_json",
        text: "Cliente"
      },

      {
        field_name: "inv_queue_service_json",
        name: "servicio_json",
        text: "Servicio"
      },
      {
        field_name: "inv_queue_type_json",
        name: "tipo_json",
        text: "Tipo"
      }
    ];
  }

  public fieldInfo?(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
