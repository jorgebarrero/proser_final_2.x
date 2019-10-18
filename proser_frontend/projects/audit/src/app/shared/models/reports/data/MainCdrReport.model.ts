export class MainCdrReportModel {
  cdr_id: number;
  cdr_calldate: string;
  cdr_clid: string;
  cdr_src: string;
  cdr_dst: string;
  cdr_dcontext: string;
  cdr_channel: string;
  cdr_dstchannel: string;
  cdr_lastapp: string;
  cdr_lastdata: string;
  cdr_duration_sec: string;
  cdr_billsec_sec: string;
  cdr_disposition: string;
  cdr_amaflags: string;
  cdr_accountcode: string;
  cdr_uniqueid: string;
  cdr_userfield: string;
  cdr_recordingfile: string;
  cdr_cnum: string;
  cdr_cnam: string;
  cdr_outbound_cnum: string;
  cdr_outbound_cnam: string;
  cdr_dst_cnam: string;
  cdr_did: string;
  __CALLCENTER__: string;
  cdr_callcenter_name: string;
  cdr_call_type: string;
  cdr_call_class: string;
  cdr_agent_extension: string;
  cdr_queue_number: string;
  cdr_agent_id: number;
  cdr_queue_id: number;
  __DATE__: string;
  cdr_date: string;
  __HCA__: string;
  cdr_hca_agent_serial_id: number;
  cdr_hca_queue_serial_id: number;
  __MADE__: string;
  cdr_call_made: string;
  cdr_call_fail: string;
  cdr_call_answered: string;
  cdr_call_efective: string;
  cdr_call_hungout: string;

  constructor() {
    this.cdr_id = 0;
    this.cdr_calldate = "";
    this.cdr_clid = "";
    this.cdr_src = "";
    this.cdr_dst = "";
    this.cdr_dcontext = "";
    this.cdr_channel = "";
    this.cdr_dstchannel = "";
    this.cdr_lastapp = "";
    this.cdr_lastdata = "";
    this.cdr_duration_sec = "";
    this.cdr_billsec_sec = "";
    this.cdr_disposition = "";
    this.cdr_amaflags = "";
    this.cdr_accountcode = "";
    this.cdr_uniqueid = "";
    this.cdr_userfield = "";
    this.cdr_recordingfile = "";
    this.cdr_cnum = "";
    this.cdr_cnam = "";
    this.cdr_outbound_cnum = "";
    this.cdr_outbound_cnam = "";
    this.cdr_dst_cnam = "";
    this.cdr_did = "";
    this.__CALLCENTER__ = "";
    this.cdr_callcenter_name = "";
    this.cdr_call_type = "";
    this.cdr_call_class = "";
    this.cdr_agent_extension = "";
    this.cdr_queue_number = "";
    this.cdr_agent_id = 0;
    this.cdr_queue_id = 0;
    this.__DATE__ = "";
    this.cdr_date = "";
    this.__HCA__ = "";
    this.cdr_hca_agent_serial_id = 0;
    this.cdr_hca_queue_serial_id = 0;
    this.__MADE__ = "";
    this.cdr_call_made = "";
    this.cdr_call_fail = "";
    this.cdr_call_answered = "";
    this.cdr_call_efective = "";
    this.cdr_call_hungout = "";
  }

  public fieldList() {
    return [
      { field_name: "cdr_id", name: "id", text: "Id" },
      { field_name: "cdr_calldate", name: "fecha", text: "Fecha" },
      { field_name: "cdr_clid", name: "clid", text: "clid" },
      { field_name: "cdr_src", name: "src", text: "src" },
      {
        field_name: "cdr_dst",
        name: "dst",
        text: "dst"
      },
      {
        field_name: "cdr_dcontext",
        name: "dcontext",
        text: "dcontext"
      },
      {
        field_name: "cdr_channel",
        name: "channel",
        text: "channel"
      },
      {
        field_name: "cdr_dstchannel",
        name: "dstchannel",
        text: "dstchannel"
      },
      { field_name: "cdr_lastapp", name: "lastapp", text: "lastapp" },

      {
        field_name: "cdr_lastdata",
        name: "lastdata",
        text: "lastdata"
      },

      {
        field_name: "cdr_duration_sec",
        name: "duracion_seg",
        text: "Duración seg."
      },

      {
        field_name: "cdr_billsec_sec",
        name: "segundos_facturables",
        text: "Segundos Facturables"
      },

      {
        field_name: "cdr_disposition",
        name: "disposicion",
        text: "disposición"
      },

      {
        field_name: "cdr_amaflags",
        name: "amaflags",
        text: "amaflags"
      },

      {
        field_name: "cdr_accountcode",
        name: "accountcode",
        text: "accountcode"
      },

      {
        field_name: "cdr_uniqueid",
        name: "uniqueid",
        text: "uniqueid"
      },

      {
        field_name: "cdr_userfield",
        name: "userfield",
        text: "userfield"
      },

      {
        field_name: "cdr_recordingfile",
        name: "grabacion",
        text: "Grabación"
      },

      {
        field_name: "cdr_cnum",
        name: "cnum",
        text: "cnum"
      },

      {
        field_name: "cdr_cnam",
        name: "cnam",
        text: "cnam"
      },

      {
        field_name: "cdr_outbound_cnum",
        name: "outbound_cnum",
        text: "outbound_cnum"
      },

      {
        field_name: "cdr_outbound_cnam",
        name: "outbound_cnam",
        text: "outbound_cnam"
      },

      {
        field_name: "cdr_dst_cnam",
        name: "dst_cnam",
        text: "dst_cnam"
      },

      {
        field_name: "cdr_did",
        name: "did",
        text: "did"
      },

      {
        field_name: "__CALLCENTER__",
        name: "callcenter",
        text: "Callcenter"
      },

      {
        field_name: "cdr_callcenter_name",
        name: "nombre_callcenter",
        text: "Nombre Callcenter"
      },

      {
        field_name: "cdr_call_type",
        name: "tipo",
        text: "Tipo"
      },

      {
        field_name: "cdr_call_class",
        name: "clase",
        text: "Clase"
      },

      {
        field_name: "cdr_agent_extension",
        name: "extension",
        text: "Extensión"
      },

      {
        field_name: "cdr_queue_number",
        name: "numero_cola",
        text: "Número cola"
      },

      {
        field_name: "cdr_agent_id",
        name: "id_agente",
        text: "Id agente"
      },

      {
        field_name: "cdr_queue_id",
        name: "id_cola",
        text: "Id cola"
      },

      {
        field_name: "__DATE__",
        name: "date",
        text: "date"
      },

      {
        field_name: "cdr_date",
        name: "fecha",
        text: "Fecha"
      },

      {
        field_name: "__HCA__",
        name: "hca",
        text: "hca"
      },

      {
        field_name: "cdr_hca_agent_serial_id",
        name: "fecha_agente",
        text: "Break"
      },

      {
        field_name: "cdr_hca_queue_serial_id",
        name: "fecha_cola",
        text: "Break"
      },

      {
        field_name: "__MADE__",
        name: "made",
        text: "made"
      },

      {
        field_name: "cdr_call_made",
        name: "llamadas_realizadas",
        text: "LLamadas realizadas"
      },

      {
        field_name: "cdr_call_fail",
        name: "llamadas_fallidas",
        text: "LLamadas fallidas"
      },

      {
        field_name: "cdr_call_answered",
        name: "llamadas_contestadas",
        text: "LLamadas contestadas"
      },

      {
        field_name: "cdr_call_efective",
        name: "llamadas_efectivas",
        text: "LLamadas efectivas"
      },

      {
        field_name: "cdr_call_hungout",
        name: "colgadas_agente",
        text: "Colgadas por agente"
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
