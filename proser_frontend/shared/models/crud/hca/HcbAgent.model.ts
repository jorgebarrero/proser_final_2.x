export class HcbAgentModel {

  hcb_agent_id: number
  hcb_agent_serial: string
  hcb_agent_date: string
  hcb_agent_agent_id: number
  hcb_agent_name: string
  hcb_agent_extension: string
  hcb_agent_supervisor_id: number
  hcb_agent_supervisor_name: string
  hcb_agent_schedule_id: number
  hcb_agent_schedule_name: string
  hcb_agent_calendarday_name: string
  hcb_agent_schedule_plan: string
  hcb_agent_schedule_start: string
  hcb_agent_schedule_end: string
  hcb_agent_schedule_break: string
  hcb_agent_schedule_duration: string
  hcb_agent_status: string
  hcb_agent_laborday: number

  hcb_agent_supervisor_json: any
  hcb_agent_schedule_json: any
  hcb_agent_client_json: any
  hcb_agent_queue_json: any
  hcb_agent_service_json: any
  hcb_agent_campaign_json: any
  hcb_agent_role_json: any
  hcb_agent_scheduleday_json: any

  constructor() {
    this.hcb_agent_id = 0;
    this.hcb_agent_serial = null;
    this.hcb_agent_date = null;
    this.hcb_agent_agent_id = 0;
    this.hcb_agent_name = null;
    this.hcb_agent_extension = null;
    this.hcb_agent_supervisor_id = 0;
    this.hcb_agent_supervisor_name = null;
    this.hcb_agent_schedule_id = 0;
    this.hcb_agent_schedule_name = null;
    this.hcb_agent_calendarday_name = null;
    this.hcb_agent_schedule_plan = null;
    this.hcb_agent_schedule_start = null;
    this.hcb_agent_schedule_end = null;
    this.hcb_agent_schedule_break = null;
    this.hcb_agent_schedule_duration = null;
    this.hcb_agent_status = 'A';
    this.hcb_agent_laborday = null;

    this.hcb_agent_supervisor_json = [{ id: 0, name: null }];
    this.hcb_agent_schedule_json = [{ id: 0, name: null }];

    this.hcb_agent_client_json = [{ id: 0, name: null }];
    this.hcb_agent_queue_json = [{ id: 0, name: null }];
    this.hcb_agent_service_json = [{ id: 0, name: null }];
    this.hcb_agent_campaign_json = [{ id: 0, name: null }];

    this.hcb_agent_role_json = [{ id: 0, name: null }];
    this.hcb_agent_scheduleday_json = [{ id: 0, name: null }];
  }

  public fieldList() {
    return [
      { field_name: 'hcb_agent_id', name: 'id', text: 'Id' },
      { field_name: 'hcb_agent_serial', name: 'serial', text: 'Serial' },
      { field_name: 'hcb_agent_date', name: 'fecha', text: 'Fecha' },
      { field_name: 'hcb_agent_agent_id', name: 'id_agente', text: 'Id agente' },
      { field_name: 'hcb_agent_name', name: 'nombre_agente', text: 'Nombre agente' },
      { field_name: 'hcb_agent_extension', name: 'extension', text: 'Extension' },
      { field_name: 'hcb_agent_supervisor_id', name: 'id_supervisor', text: 'Id supervisor' },
      { field_name: 'hcb_agent_supervisor_name', name: 'nombre_supervisor', text: 'Nombre supervisor' },
      { field_name: 'hcb_agent_schedule_id', name: 'id_turno', text: 'Id turno' },
      { field_name: 'hcb_agent_schedule_name', name: 'nombre_turno', text: 'Nombre turno' },
      { field_name: 'hcb_agent_calendarday_name', name: 'nombre_calendario', text: 'Nombre calendario' },
      { field_name: 'hcb_agent_schedule_plan', name: 'turno_plan', text: 'Turno plan' },
      { field_name: 'hcb_agent_schedule_start', name: 'inicio_turno', text: 'Inicio turno' },
      { field_name: 'hcb_agent_schedule_end', name: 'fin_turno', text: 'Fin turno' },
      { field_name: 'hcb_agent_schedule_break', name: 'descanso_turno', text: 'Descanso turno' },
      { field_name: 'hcb_agent_schedule_duration', name: 'duracion_turno', text: 'Duracion turno' },
      { field_name: 'hcb_agent_status', name: 'estado', text: 'Estado' },
      { field_name: 'hcb_agent_laborday', name: 'dia_laboral', text: 'Dia laboral' },
      { field_name: 'hcb_agent_supervisor_json', name: 'supervisor_json', text: 'Supervisor json' },
      { field_name: 'hcb_agent_schedule_json', name: 'turno_json', text: 'Turno json' },
      { field_name: 'hcb_agent_client_json', name: 'cliente_json', text: 'Cliente json' },
      { field_name: 'hcb_agent_queue_json', name: 'cola_json', text: 'Cola json' },
      { field_name: 'hcb_agent_service_json', name: 'servicio_json', text: 'Servicio json' },
      { field_name: 'hcb_agent_campaign_json', name: 'campaña_json', text: 'Campaña json' },
      { field_name: 'hcb_agent_role_json', name: 'rol_json', text: 'Rol json' },
      { field_name: 'hcb_agent_scheduleday_json', name: 'turno_dia_json', text: 'Turno dia json' },
     
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
