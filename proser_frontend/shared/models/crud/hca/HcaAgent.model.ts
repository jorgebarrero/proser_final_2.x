export class HcaAgentModel {
  hca_agent_id: number
  hca_agent_serial: string
  hca_agent_date: string
  hca_agent_agent_id: number
  hca_agent_name: string
  hca_agent_extension: string
  hca_agent_supervisor_id: number
  hca_agent_supervisor_name: string
  hca_agent_schedule_id: number
  hca_agent_schedule_name: string
  hca_agent_calendarday_name: string
  hca_agent_schedule_plan: string
  hca_agent_schedule_start: string
  hca_agent_schedule_end: string
  hca_agent_schedule_break: string
  hca_agent_schedule_duration: string
  hca_agent_status: string
  hca_agent_laborday: number

  hca_agent_supervisor_json: any
  hca_agent_schedule_json: any
  hca_agent_client_json: any
  hca_agent_queue_json: any
  hca_agent_service_json: any
  hca_agent_campaign_json: any
  hca_agent_role_json: any
  hca_agent_scheduleday_json: any

  constructor() {
    this.hca_agent_id = 0;
    this.hca_agent_serial = null;
    this.hca_agent_date = null;
    this.hca_agent_agent_id = 0;
    this.hca_agent_name = null;
    this.hca_agent_extension = null;
    this.hca_agent_supervisor_id = 0;
    this.hca_agent_supervisor_name = null;
    this.hca_agent_schedule_id = 0;
    this.hca_agent_schedule_name = null;
    this.hca_agent_calendarday_name = null;
    this.hca_agent_schedule_plan = null;
    this.hca_agent_schedule_start = null;
    this.hca_agent_schedule_end = null;
    this.hca_agent_schedule_break = null;
    this.hca_agent_schedule_duration = null;
    this.hca_agent_status = 'A';
    this.hca_agent_laborday = null;

    this.hca_agent_supervisor_json = [{ id: 0, name: null }];
    this.hca_agent_schedule_json = [{ id: 0, name: null }];

    this.hca_agent_client_json = [{ id: 0, name: null }];
    this.hca_agent_queue_json = [{ id: 0, name: null }];
    this.hca_agent_service_json = [{ id: 0, name: null }];
    this.hca_agent_campaign_json = [{ id: 0, name: null }];

    this.hca_agent_role_json = [{ id: 0, name: null }];
    this.hca_agent_scheduleday_json = [{ id: 0, name: null }];
  }

  public fieldList() {
    return [
      { field_name: 'hca_agent_id', name: 'id', text: 'Id' },
      { field_name: 'hca_agent_serial', name: 'serial', text: 'Serial' },
      { field_name: 'hca_agent_date', name: 'fecha', text: 'Fecha' },
      { field_name: 'hca_agent_agent_id', name: 'id_agente', text: 'Id agente' },
      { field_name: 'hca_agent_name', name: 'nombre_agente', text: 'Nombre agente' },
      { field_name: 'hca_agent_extension', name: 'extension', text: 'Extension' },
      { field_name: 'hca_agent_supervisor_id', name: 'id_supervisor', text: 'Id supervisor' },
      { field_name: 'hca_agent_supervisor_name', name: 'nombre_supervisor', text: 'Nombre supervisor' },
      { field_name: 'hca_agent_schedule_id', name: 'id_turno', text: 'Id turno' },
      { field_name: 'hca_agent_schedule_name', name: 'nombre_turno', text: 'Nombre turno' },
      { field_name: 'hca_agent_calendarday_name', name: 'nombre_calendario', text: 'Nombre calendario' },
      { field_name: 'hca_agent_schedule_plan', name: 'turno_plan', text: 'Turno plan' },
      { field_name: 'hca_agent_schedule_start', name: 'inicio_turno', text: 'Inicio turno' },
      { field_name: 'hca_agent_schedule_end', name: 'fin_turno', text: 'Fin turno' },
      { field_name: 'hca_agent_schedule_break', name: 'descanso_turno', text: 'Descanso turno' },
      { field_name: 'hca_agent_schedule_duration', name: 'duracion_turno', text: 'Duracion turno' },
      { field_name: 'hca_agent_status', name: 'estado', text: 'Estado' },
      { field_name: 'hca_agent_laborday', name: 'dia_laboral', text: 'Dia laboral' },
      { field_name: 'hca_agent_supervisor_json', name: 'supervisor_json', text: 'Supervisor json' },
      { field_name: 'hca_agent_schedule_json', name: 'turno_json', text: 'Turno json' },
      { field_name: 'hca_agent_client_json', name: 'cliente_json', text: 'Cliente json' },
      { field_name: 'hca_agent_queue_json', name: 'cola_json', text: 'Cola json' },
      { field_name: 'hca_agent_service_json', name: 'servicio_json', text: 'Servicio json' },
      { field_name: 'hca_agent_campaign_json', name: 'campaña_json', text: 'Campaña json' },
      { field_name: 'hca_agent_role_json', name: 'rol_json', text: 'Rol json' },
      { field_name: 'hca_agent_scheduleday_json', name: 'turno_dia_json', text: 'Turno dia json' },
     
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
