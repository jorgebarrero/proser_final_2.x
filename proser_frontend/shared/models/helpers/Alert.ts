export class AlertModel {
  alertTitle?: string;
  alertText?: string;
  alertShow?: boolean;
  alertClass?: string;

  constructor() {
   this.alertTitle = '';
   this.alertText = '';
   this.alertShow = false;
   this.alertClass = '';
  }
}
