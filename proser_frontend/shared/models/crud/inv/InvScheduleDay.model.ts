export class InvScheduleDayModel {
  inv_scheduleday_id: number
  inv_schedule_id: number
  inv_scheduleday_weekday: string
  inv_scheduleday_name: string
  inv_scheduleday_start_time: string
  inv_scheduleday_end_time: string
  inv_scheduleday_legal_break: string
  inv_scheduleday_laborday: string
  inv_scheduleday_duration: string

  constructor() {
    this.inv_scheduleday_id = 0;
    this.inv_schedule_id = 0;
    this.inv_scheduleday_weekday = null;
    this.inv_scheduleday_name = null;
    this.inv_scheduleday_start_time = null;
    this.inv_scheduleday_end_time = null;
    this.inv_scheduleday_legal_break = null;
    this.inv_scheduleday_laborday = null;
    this.inv_scheduleday_duration = null;
  }

  public fieldList() {
    return [
      { field_name: 'inv_scheduleday_id', name: 'id', text: 'Id' },
      { field_name: 'inv_schedule_id', name: 'id_horario', text: 'Id Horario' },
      {
        field_name: 'inv_scheduleday_weekday',
        name: 'numero_dia',
        text: 'Num Dia',
      },
      { field_name: 'inv_scheduleday_name', name: 'nombre_dia', text: 'Dia' },
      {
        field_name: 'inv_scheduleday_start_time',
        name: 'hora_inicio',
        text: 'Inicio',
      },
      {
        field_name: 'inv_scheduleday_end_time',
        name: 'hora_fin',
        text: 'Final',
      },
      {
        field_name: 'inv_scheduleday_legal_break',
        name: 'descanso_legal',
        text: 'Descanso',
      },
      {
        field_name: 'inv_scheduleday_laborday',
        name: 'laboral',
        text: 'Laboral',
      },
      {
        field_name: 'inv_scheduleday_duration',
        name: 'duracion',
        text: 'Duración',
      },
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
