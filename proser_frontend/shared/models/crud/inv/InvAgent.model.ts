import { PeopleJsonModel } from "../general/People.model";
import { OperationJsonModel } from "../general/Operation.model";
import { TimeJsonModel } from "../general/Time.model";

export class InvAgentModel {
  inv_agent_id: number;
  inv_agent_status: any;
  inv_agent_chk: any;
  inv_agent_name: any;
  inv_agent_shortname: any;
  inv_agent_extension: any;
  inv_agent_legal_id: any;
  inv_agent_internal_id: any;
  inv_agent_type: any;

  __JSON__: any;
  inv_agent_people_json: any;
  inv_agent_operation_json: any;
  inv_agent_time_json: any;

  // OPTIONAL
  inv_agent_role_json: any;
  inv_agent_supervisor_json: any;
  inv_agent_schedule_json: any;
  inv_agent_calendar_json: any;

  inv_agent_client_json: any;
  inv_agent_queue_json: any;
  inv_agent_service_json: any;
  inv_agent_campaign_json: any;

  constructor() {
    this.inv_agent_id = 0;
    this.inv_agent_status = "A";
    this.inv_agent_chk = null;
    this.inv_agent_name = null;
    this.inv_agent_shortname = null;
    this.inv_agent_extension = null;
    this.inv_agent_legal_id = null;
    this.inv_agent_internal_id = null;
    this.inv_agent_type = null;

    this.__JSON__ = "[]";
    this.inv_agent_people_json = new PeopleJsonModel();
    this.inv_agent_operation_json = new OperationJsonModel();
    this.inv_agent_time_json = new TimeJsonModel();

    // Optional
    this.inv_agent_supervisor_json = null;
    this.inv_agent_schedule_json = null;
    this.inv_agent_calendar_json = null;

    this.inv_agent_client_json = null;
    this.inv_agent_queue_json = null;
    this.inv_agent_service_json = null;
    this.inv_agent_campaign_json = null;

    this.inv_agent_role_json = null;
  }

  public fieldList() {
    return [
      { field_name: "inv_agent_id", name: "id", text: "Id" },
      { field_name: "inv_agent_status", name: "estado", text: "Estado" },
      { field_name: "inv_agent_chk", name: "chk", text: "Chk" },
      {
        field_name: "inv_agent_name",
        name: "nombre_agente",
        text: "Nombre agente"
      },
      {
        field_name: "inv_agent_shortname",
        name: "nombre_corto_agente",
        text: "Nombre corto agente"
      },
      {
        field_name: "inv_agent_extension",
        name: "extension",
        text: "Extension"
      },
      { field_name: "inv_agent_legal_id", name: "cedula", text: "Cedula" },
      {
        field_name: "inv_agent_internal_id",
        name: "identificacion_laboral",
        text: "Id laboral"
      },
      { field_name: "inv_agent_type", name: "tipo", text: "Tipo" },

      {
        field_name: "__JSON__",
        name: "separador_json",
        text: "JSON"
      },
      {
        field_name: "inv_agent_operation_json",
        name: "operacion_json",
        text: "Operación"
      },
      {
        field_name: "inv_agent_people_json",
        name: "gente_json",
        text: "Gente"
      },
      {
        field_name: "inv_agent_time_json",
        name: "tiempo_json",
        text: "Tiempo"
      },

      // Optional

      {
        field_name: "inv_agent_supervisor_json",
        name: "supervisor",
        text: "Supervisor"
      },
      {
        field_name: "inv_agent_schedule_json",
        name: "turno",
        text: "Turno"
      },
      {
        field_name: "inv_agent_calendar_json",
        name: "calendario",
        text: "Calendario"
      },
      {
        field_name: "inv_agent_client_json",
        name: "cliente",
        text: "Cliente"
      },
      {
        field_name: "inv_agent_queue_json",
        name: "cola",
        text: "Cola"
      },
      {
        field_name: "inv_agent_service_json",
        name: "servicio",
        text: "Servicio"
      },
      {
        field_name: "inv_agent_campaign_json",
        name: "campaña",
        text: "Campaña"
      },
      {
        field_name: "inv_agent_role_json",
        name: "rol",
        text: "Rol"
      }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
