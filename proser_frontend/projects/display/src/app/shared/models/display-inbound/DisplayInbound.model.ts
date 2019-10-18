export class DisplayInboundModel {
  displayInboundCallsIndicators;
  displayInboundCurrentCallsIndicators;
  agentsPlannedTotal;
  agentsConnectedTotal;
  agentsConnectedByGroup;
  agentsAuxiliarResume;
  agentsAssignationResume;

  constructor() {
    this.displayInboundCallsIndicators = '';
    this.displayInboundCurrentCallsIndicators = '';
    this.agentsPlannedTotal = '';
    this.agentsConnectedTotal = '';
    this.agentsConnectedByGroup = '';
    this.agentsAuxiliarResume = '';
    this.agentsAssignationResume = '';
  }

  public fieldList() {
    return [
      { field_name: "displayInboundCallsIndicators", name: "indicadores_llamadas", text: "Indicadores" },
      { field_name: "displayInboundCurrentCallsIndicators", name: "indicadores_llamadas_actuales", text: "Llamadas actuales" },
      { field_name: "agentsPlannedTotal", name: "agentes_planeados", text: "Agentes planeados" },
      { field_name: "agentsConnectedTotal", name: "agentes_conectados", text: "Agentes conectados" },
      { field_name: "agentsConnectedByGroup", name: "agentes_conectados_por_grupo", text: "Agentes por grupo" },
      { field_name: "agentsAuxiliarResume", name: "resumen_auxiliar", text: "Resumen de auxiliares" },
      { field_name: "agentsAssignationResume", name: "resumen_asignacion", text: "Resumen de asignaciones" },
    ];
  }

  public fieldInfo(field_name) {
    const register = this.fieldList();

    return register.filter(x => {
      return x.field_name === field_name;
    })[0];
  }
}
