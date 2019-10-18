export class TimeJsonModel {
  calendar?: any;
  schedule?: any;
  scheduledays?: any;
  schedulehours?: any;

  constructor() {
    this.calendar = [];
    this.schedule = [];
    this.scheduledays = [];
    this.schedulehours = [];
  }

  public fieldList() {
    return [
      { field_name: "calendar", name: "calendario", text: "Calendario" },
      { field_name: "schedule", name: "turno", text: "Turno" },
      { field_name: "scheduledays", name: "dias_turno", text: "Días" },
      { field_name: "schedulehours", name: "horas_turno", text: "Horas" }
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
