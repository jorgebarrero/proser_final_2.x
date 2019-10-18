import { PeopleJsonModel } from "../general/People.model";
import { OperationJsonModel } from "../general/Operation.model";
import { TimeJsonModel } from "../general/Time.model";

export class InvSupervisorModel {
  inv_supervisor_id: number;
  inv_supervisor_status: string;
  inv_supervisor_chk: number;
  inv_supervisor_name: string;
  inv_supervisor_shortname: string;
  inv_supervisor_legal_id: string;
  inv_supervisor_internal_id: string;

  __JSON__: any;
  inv_supervisor_people_json: any; //PeopleJsonModel;
  inv_supervisor_operation_json: any; //OperationJsonModel;
  inv_supervisor_time_json: any; //TimeJsonModel;

  // Optional
  inv_supervisor_type_json?: any;
  inv_supervisor_schedule_json?: any;

  inv_supervisor_client_json?: any;
  inv_supervisor_queue_json?: any;
  inv_supervisor_service_json?: any;
  inv_supervisor_campaign_json?: any;

  constructor() {
    this.inv_supervisor_id = 0;
    this.inv_supervisor_status = "A";
    this.inv_supervisor_chk = 1;
    this.inv_supervisor_name = null;
    this.inv_supervisor_shortname = null;
    this.inv_supervisor_legal_id = null;
    this.inv_supervisor_internal_id = null;

    this.__JSON__ = 1;
    this.inv_supervisor_people_json = new PeopleJsonModel();
    this.inv_supervisor_operation_json = new OperationJsonModel();
    this.inv_supervisor_time_json = new TimeJsonModel();

    this.inv_supervisor_type_json = null;
    this.inv_supervisor_schedule_json = null;
    this.inv_supervisor_client_json = null;
    this.inv_supervisor_queue_json = null;
    this.inv_supervisor_service_json = null;
    this.inv_supervisor_campaign_json = null;
  }

  public fieldList?() {
    return [
      { field_name: "inv_supervisor_id", name: "id", text: "Id" },
      { field_name: "inv_supervisor_status", name: "estado", text: "Estado" },
      { field_name: "inv_supervisor_chk", name: "chk", text: "Chk" },
      {
        field_name: "inv_supervisor_name",
        name: "nombre_supervisor",
        text: "Nombre supervisor"
      },
      {
        field_name: "inv_supervisor_shortname",
        name: "nombre_corto_supervisor",
        text: "Nombre corto supervisor"
      },

      { field_name: "inv_supervisor_legal_id", name: "cedula", text: "Cedula" },

      {
        field_name: "inv_supervisor_internal_id",
        name: "identificacion_laboral",
        text: "Identificacion laboral"
      },

      {
        field_name: "__JSON__",
        name: "separador_json",
        text: "JSON"
      },
      {
        field_name: "inv_supervisor_operation_json",
        name: "operacion_json",
        text: "Operación"
      },
      {
        field_name: "inv_supervisor_people_json",
        name: "gente_json",
        text: "Gente"
      },
      {
        field_name: "inv_supervisor_time_json",
        name: "tiempo_json",
        text: "Tiempo"
      },

      {
        field_name: "inv_supervisor_type_json",
        name: "tipo",
        text: "Tipo"
      },
      {
        field_name: "inv_supervisor_schedule_json",
        name: "horario",
        text: "Horario"
      },

      {
        field_name: "inv_supervisor_client_json",
        name: "cliente",
        text: "Cliente"
      },
      {
        field_name: "inv_supervisor_queue_json",
        name: "cola",
        text: "Cola"
      },
      {
        field_name: "inv_supervisor_service_json",
        name: "servicio",
        text: "Servicio"
      },
      {
        field_name: "inv_supervisor_campaign_json",
        name: "supervisor",
        text: "Campaña"
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
