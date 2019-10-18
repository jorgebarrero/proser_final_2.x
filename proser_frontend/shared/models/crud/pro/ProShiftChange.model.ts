export class ProScheduleChangeModel {
  pro_schedulechange_id: number;
  pro_schedulechange_agent_serial_id: any;
  pro_schedulechange_agent_id: any;
  pro_schedulechange_agent_name: any;
  pro_schedulechange_start_date: any;
  pro_schedulechange_end_date: any;
  pro_schedulechange_start_time: any;
  pro_schedulechange_end_time: any;
  pro_schedulechange_type: any;
  pro_schedulechange_supervisor_id: any;
  pro_schedulechange_description: any;
  __JSON__: any;
  pro_schedulechange_people_json: any;

  constructor() {
    this.pro_schedulechange_id = 0;
    this.pro_schedulechange_agent_serial_id = null;
    this.pro_schedulechange_agent_id = null;
    this.pro_schedulechange_agent_name = null;
    this.pro_schedulechange_start_date = null;
    this.pro_schedulechange_end_date = null;
    this.pro_schedulechange_start_time = null;
    this.pro_schedulechange_end_time = null;
    this.pro_schedulechange_type = null;
    this.pro_schedulechange_supervisor_id = null;
    this.pro_schedulechange_description = null;
    this.__JSON__ = null;
    this.pro_schedulechange_people_json = null;
  }

  public fieldList() {
    return [
      { field_name: "pro_schedulechange_id", name: "id", text: "Id" },
      {
        field_name: "pro_schedulechange_agent_serial_id",
        name: "serial del agente ",
        text: "Serial del agente"
      },
      {
        field_name: "pro_schedulechange_agent_id",
        name: "id adente",
        text: "Id del agente"
      },
      {
        field_name: "pro_schedulechange_agent_name",
        name: "nombre del agenteo",
        text: "Nombre del agente"
      },
      {
        field_name: "pro_schedulechange_start_date",
        name: "fecha incial",
        text: "Fecha de inicio"
      },
      {
        field_name: "pro_schedulechange_end_date",
        name: "fecha final",
        text: "Fecha final"
      },
      {
        field_name: "pro_schedulechange_start_time",
        name: "tiempo incial",
        text: "Hora de inicio"
      },
      {
        field_name: "pro_schedulechange_end_time",
        name: "tiempo final",
        text: "Hora de inicio"
      },
      {
        field_name: "pro_schedulechange_type",
        name: "tipo",
        text: "Tipo de guardia"
      },
      {
        field_name: "pro_schedulechange_supervisor_id",
        name: "id supervisor",
        text: "Id supervisor"
      },
      {
        field_name: "pro_schedulechange_description",
        name: "pro_schedulechange_description",
        text: "Descripcion"
      },
      { field_name: "__JSON__", name: "json", text: "Json" },
      {
        field_name: "pro_schedulechange_people_json",
        name: "personas json",
        text: "Personas json"
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
