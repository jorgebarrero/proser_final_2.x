export class OperationJsonModel {

queue?: any;
client?: any;
service?: any;
campaign?: any;

constructor(){
this.queue = [];
this.client = [];
this.service = [];
this.campaign = [];
}

public fieldList() {
  return [
    { field_name: "queue", name: "cola", text: "Cola" },
    { field_name: "client", name: "cliente", text: "Cliente" },
    { field_name: "service", name: "servicio", text: "Servicio" },
    { field_name: "campaign", name: "campaña", text: "Campaña" },
   
  ];
}

public fieldInfo(field_name) {
  const register = this.fieldList();

  return register.filter(x => {
    return x.field_name === field_name;
  })[0];
}
   
 }
