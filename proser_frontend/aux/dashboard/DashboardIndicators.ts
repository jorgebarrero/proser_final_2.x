export class DashboardIndicators {

    inboundCall = [];
    outboundCall = [];
    automaticCall = [];
    colorCodes = [];
    agentPlanned = [];
    agentLogged = [];
    agentConnected = [];
    agentAssigned = [];
    agentBreak = [];
    agentAsignation = [];
    agentTotal = [];
    callOnQueue = [];
    callStatus = [];
    higlightsScales;
    historic;

    constructor() {

      this.inboundCall = [
        {
          llamadas_recibidas: null,
          llamadas_abandonadas: null,
          llamadas_atendidas: null,
          llamadas_cortas: null,
          llamadas_antes_de: null,
          nivel_servicio: null,
          nivel_atencion: null,
          nivel_abandono: null,
          tmo: null,
          asa: null
        }
      ];
      this.agentPlanned = [
        {
          planificado: null
        }
      ];
      this.agentLogged = [
        {
          logueado: null
        }
      ];
      this.agentConnected = [
        {
          conectado: null
        }
      ];
      this.agentAssigned = null;
      this.agentBreak = null;
      this.agentTotal = null;
      this.callOnQueue = [{calls_on_queue: ''}];
      this.callStatus = null;
    }


}

/*

 'inboundCall': [
        {
          'llamadas_recibidas': null,
          'llamadas_abandonadas': null,
          'llamadas_atendidas': null,
          'llamadas_cortas': null,
          'llamadas_antes_de': null,
          'nivel_servicio': null,
          'nivel_atencion': null,
          'nivel_abandono': null,
          'tmo': null,
          'asa': null
        }
      ],
      'agentPlanned': [
        {
          'planificado': 0
        }
      ],
      'agentLogged': [
        {
          'logueado': 0
        }
      ],
      'agentConnected': [
        {
          'conectado': 0
        }
      ],
      'agentAssigned': null,
      'agentBreak': null,
      'agentTotal': null,
      'callOnQueue': [{calls_on_queue: ''}],
      'callStatus': null
    };

    */
