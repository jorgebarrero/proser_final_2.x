import {
  selectionToText,
  optionsToText,
  dateToDatePicker
} from "shared/functions";
import * as moment from "moment";
import groupList from "shared/data/selector-group-list.data";

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

export class UserSelectionModel {
  title: any;
  entity_selection: any;
  options: any;
  legend: any;
  mode: any;
  type: any;

  start_date: any;
  end_date: any;

  start_time: any;
  end_time: any;

  login: any;

  auxiliar: any;
  assignation: any;

  client: any;
  queue: any;
  service: any;
  campaign: any;

  supervisor: any;
  agent: any;

  role: any;
  schedule: any;

  last_minutes: any;
  interval: any;

  groupBy: any;
  orderBy: any;
  limitBy: any;

  status: any;

  start_time_hour: any;
  end_time_hour: any;

  views: any;

  constructor(options?) {
    if (options === "standard" || options === null) {
      // TEXT
      this.title = "Título";
      this.entity_selection = "Selector";
      this.options = "Opciones";
      this.legend = "Leyenda";
      this.start_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
      this.end_date = dateToDatePicker(moment().format("YYYY-MM-DD"));

      // OBJECTCS
      this.mode = { id: 0, name: "Actual", value: true };
      this.type = { id: 0, name: "Ejecutado" };
      this.start_time = { id: 0, value: "00:00:00" };
      this.end_time = { id: 0, value: "23:59:59" };
      this.login = { id: 0, name: "username", profile: "profile" };
      this.last_minutes = null; // {}; //{ id: 0, name: "no time", value: 0 };
      this.interval = null; //{}; //{ id: 0, name: "no time", value: 0 };
      this.groupBy = {
        id: 3,
        name: "COLA",
        Inv_id: "inv_queue_id",
        Inv_name: "inv_queue_name",
        MainCallEntry_json_id:
          'JSON_UNQUOTE(JSON_EXTRACT(callentry_operation_json, "$.queue[0].id"))',
        MainCdr_json_id:
          'JSON_UNQUOTE(JSON_EXTRACT(cdr_operation_json, "$.queue[0].id"))',
        MainAudit_json_id:
          'JSON_UNQUOTE(JSON_EXTRACT(audit_operation_json, "$.queue[0].id"))'
      };
      this.orderBy = {}; //{}; //{ id: 0, name: "orderBy" };
      this.limitBy = {}; //{}; //{ id: 0, name: "limitBy" };
      this.status = { id: 0, name: "Activo", value: "A" };

      //ARRAY
      this.client = []; // [{ id: 0, name: "client" }];
      this.queue = []; // [{ id: 0, name: "queue" }];
      this.service = []; //  [{ id: 0, name: "service" }];
      this.campaign = []; // [{ id: 0, name: "campaign" }];

      this.supervisor = []; // [{ id: 0, name: "supervisor" }];
      this.agent = []; // [{ id: 0, name: "agent" }];
      this.role = []; // [{ id: 0, name: "role" }];
      this.schedule = []; // [{ id: 0, name: "schedule" }];
      this.auxiliar = []; // [{ id: 0, name: "auxiliar" }];
      this.assignation = []; // [{ id: 0, name: "assignation" }];

      this.start_time_hour = {
        hour: 0,
        minute: 0,
        second: 0,
        value: "00:00:00"
      };
      this.end_time_hour = {
        hour: 23,
        minute: 59,
        second: 59,
        value: "23:59:59"
      };

      this.views = [
        { id: 1, name: "dashbord", time: 30, option: "actual" },
        { id: 1, name: "graph", time: 30 },
        { id: 1, name: "group", time: 30, option: "COLAS" },
        { id: 1, name: "dashbord", time: 30, option: "historic" }
      ];
    }

    if (options === "menuOptions") {
      this.title = "Title";
      this.entity_selection = "Entity Selection";
      this.options = "Options";
      this.legend = "Legend";
      this.mode = [
        { id: 0, name: "Actual", value: true },
        { id: 0, name: "Histórico", value: false }
      ];
      this.type = [{ id: 0, name: "Ejecutado" }];

      this.start_date = dateToDatePicker(moment().format("YYYY-MM-DD"));
      this.end_date = dateToDatePicker(moment().format("YYYY-MM-DD"));

      this.start_time = [{ id: 0, name: "AM", value: "00:00:00" }];

      this.end_time = [{ id: 0, name: "AM", value: "00:00:00" }];

      this.login = [{ id: 0, name: "username", profile: "profile" }];

      this.auxiliar = [{ id: 0, name: "auxiliar" }];
      this.assignation = [{ id: 0, name: "assignation" }];

      this.client = [{ id: 0, name: "client" }];
      this.queue = [{ id: 0, name: "queue" }];
      this.service = [{ id: 0, name: "service" }];
      this.campaign = [{ id: 0, name: "campaign" }];

      this.supervisor = [{ id: 0, name: "supervisor" }];
      this.agent = [{ id: 0, name: "agent" }];

      this.role = [{ id: 0, name: "role" }];
      this.schedule = [{ id: 0, name: "schedule" }];

      this.last_minutes = [{ id: 0, name: "last_minutes" }];
      this.interval = [{ id: 0, name: "interval" }];

      this.groupBy = [{ id: 0, name: "groupBy" }];
      this.orderBy = [{ id: 0, name: "orderBy" }];
      this.limitBy = [{ id: 0, name: "limitBy" }];

      this.status = [
        { id: 0, name: "Activo", value: "A" },
        { id: 1, name: "Inactivo", value: "I" },
        { id: 2, name: "Todos", value: "All" }
      ];

      this.start_time_hour = "";
      this.end_time_hour = "";
    }

    if (options === "visible") {
      this.title = false;
      this.entity_selection = false;
      this.options = false;
      this.legend = false;
      this.mode = true;
      this.type = true;

      this.start_date = true;
      this.end_date = true;

      this.start_time = true;

      this.end_time = true;

      this.login = true;

      this.auxiliar = false;
      this.assignation = false;

      this.client = true;
      this.queue = true;
      this.service = true;
      this.campaign = true;

      this.supervisor = true;
      this.agent = true;

      this.role = true;
      this.schedule = true;

      this.last_minutes = true;
      this.interval = true;

      this.groupBy = true;
      this.orderBy = false;
      this.limitBy = false;

      this.status = true;
      this.start_time_hour = false;
      this.end_time_hour = false;
    }
  }

  public fieldList() {
    return [
      { field_name: "title", name: "titulo", text: "Título" },
      { field_name: "entity_selection", name: "entidad", text: "Entidad" },
      { field_name: "options", name: "opciones", text: "Opciones" },
      { field_name: "legend", name: "leyenda", text: "Leyenda" },
      {
        field_name: "mode",
        name: "modo",
        text: "Modo"
      },
      {
        field_name: "start_date",
        name: "fecha_inicial",
        text: "Fecha inicial"
      },
      {
        field_name: "end_date",
        name: "fecha_final",
        text: "Fecha final"
      },
      {
        field_name: "start_time",
        name: "hora_inicial",
        text: "Hora inicial"
      },
      { field_name: "end_time", name: "hora_final", text: "Hora final" },

      { field_name: "login", name: "login", text: "Login" },

      {
        field_name: "auxiliar",
        name: "auxiliar",
        text: "Auxiliar"
      },
      {
        field_name: "assignation",
        name: "asignacion",
        text: "Asignación"
      },
      {
        field_name: "client",
        name: "cliente",
        text: "Cliente"
      },
      {
        field_name: "queue",
        name: "cola",
        text: "Cola"
      },
      {
        field_name: "service",
        name: "servicio",
        text: "Servicio"
      },
      {
        field_name: "campaign",
        name: "campaña",
        text: "Campaña"
      },
      {
        field_name: "supervisor",
        name: "supervisor",
        text: "Supervisor"
      },
      {
        field_name: "agent",
        name: "agente",
        text: "Agente"
      },
      {
        field_name: "role",
        name: "escala",
        text: "Rol"
      },
      {
        field_name: "schedule",
        name: "turno",
        text: "Turno"
      },
      {
        field_name: "last_minutes",
        name: "ultimos_minutos",
        text: "Ultimos minutos"
      },
      {
        field_name: "interval",
        name: "intervalo",
        text: "Intervalo"
      },
      {
        field_name: "groupBy",
        name: "agrupar_por",
        text: "Agrupar por"
      },
      {
        field_name: "orderBy",
        name: "ordenar_por",
        text: "Ordenar por"
      },
      {
        field_name: "limitBy",
        name: "limite_registros",
        text: "Limite de registros"
      },
      {
        field_name: "status",
        name: "estatus",
        text: "Estatus"
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
