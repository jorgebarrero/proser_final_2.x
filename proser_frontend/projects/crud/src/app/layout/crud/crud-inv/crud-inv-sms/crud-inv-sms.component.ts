import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { InvSmsModel, ActionConfig } from "shared/models";
import { InvSmsService, ExcelService } from "shared/services/";
import { getUpdateFilter } from 'shared/functions';
import { AlertModel } from 'shared/models';
import { AlertService, EnvService } from 'shared/services/';


@Component({
  selector: 'app-crud-inv-sms',
  templateUrl: './crud-inv-sms.component.html',
  styleUrls: ['./crud-inv-sms.component.scss']
})
export class CrudInvSmsComponent implements OnInit {
 
  @Output() newCreateRecord: EventEmitter<any> = new EventEmitter();
  @Output() mainAnswer: EventEmitter<any> = new EventEmitter();

  // MAIN VARIABLES
  alertMessage: AlertModel;
  env;
  error_detected = false;
  error_message;

  selection: InvSmsModel;
  action: ActionConfig;

  rows;
  rows_original;
  selected: [{ selected: InvSmsModel }];
  query;

  rowsInTableList;
  numberOfRowsInTable;

  show_data;
  show_datatable;
  show_new_button;
  show_selected_button;

  findInList;
  filterFieldList;

  selectedFilterField;
  status_field;

  excel_subtitle;


  // INITIALIZATION
  constructor(
    private invSmsService: InvSmsService,
    private excelService: ExcelService,
    private alertService: AlertService,
    private envService: EnvService,

  ) {
    this.alertMessage = new AlertModel;

    this.show_data = true;
    this.show_datatable = true;
    this.show_new_button = true;
    this.show_selected_button = false;

    this.selection = new InvSmsModel();
    this.action = new ActionConfig();
    this.status_field = 'inv_sms_status';
    this.excel_subtitle= 'sms';

    this.selected = [{ selected: new InvSmsModel() }];
    this.rowsInTableList = [
      { id: 1, value: 1 },
      { id: 10, value: 10 },
      { id: 15, value: 15 }
    ];
    this.numberOfRowsInTable = { id: 10, value: 10 };
    this.filterFieldList = this.selection.fieldList();
    this.selectedFilterField = {field_name: 'inv_sms_name', name: 'nombre', text: 'nombre' };

  }

  ngOnInit() {
    this.onGetActive();
  }

  onlistAnswer(event) {
    if(event){
      this.selection = event;
      this.show_selected_button = true;
    }
    event.action === 'cancel' ? this.onCancel(event): '';
    event.action === 'afterCreatedRecord' ? this.onAfterCreatedRecord(event): '';
    event.action === 'afterEditedRecord' ? this.onAfterEditedRecord(event): '';
    
    event.action === 'editRecord' ? this.onFindById(event): '';
    event.action === 'delete' ? this.onCancel(event): '';
    event.action === 'test' ? this.test(event): '';
  }



  // IMPORT DATA FROM SERVICE
  getAll_Records(query?) {
    this.invSmsService.getAllRecords(query).subscribe(
      (data: InvSmsModel[]) => {
        this.rows_original = data;
        this.rows = data;
        this.alertMessage = new AlertModel;
        this.show_data = true;
      },
      error => {
        this.show_data = false;
        this.onError(error);
      });
  }

    // IMPORT DATA FROM SERVICE
    getSingle_Record(event?) {

      this.rows = [event.temp];
      let id = event.temp.inv_sms_id

      this.invSmsService.getRecordById(id).subscribe(
        (temp) => {
          let data = [temp]
          this.rows_original = data;
          this.rows = data;
          this.action.temp = data;
          
          this.alertMessage = new AlertModel;
          this.show_data = true;
        },
        error => {
          this.show_data = false;
          this.onError(error);
        });
    }
  


  onGetActive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvSmsModel();
    this.query = `{"where":{"${this.status_field}":"A"}}`;
    this.getAll_Records(this.query);
  }

  onGetInactive($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvSmsModel();
    this.query = `{"where":{"${this.status_field}":"I"}}`;
    this.getAll_Records(this.query);
  }

  onGetAll($event?) {
    this.show_datatable = true;
    this.show_selected_button = false;
    this.selection = new InvSmsModel();
    this.query = ''
    this.getAll_Records(this.query);
  }

  onNewRecord($event?) {
    this.show_datatable = false;
    this.show_selected_button = false;
    this.action.action = 'newRecord';
    this.action.temp = new InvSmsModel();
  }

  onAfterCreatedRecord(event?){
    console.error('event');
    this.rows = event.temp;
    this.show_datatable = true;
  }
  onEditRecord($event?) {
    this.show_datatable = false;
    this.action.action = 'editRecord';
  }

  onAfterEditedRecord(event?){
    console.error('event');
    this.rows = event.temp;
    this.show_datatable = true;
  }

  onShowDetail($event?) {
    this.show_datatable = false;
    this.action.action = 'showRecord'

  }

  onItemListSelected(event?) {
    this.show_datatable = true;
    this.numberOfRowsInTable = event;
  }

  onFilterFieldList() {
    let temp = {
      lines: this.numberOfRowsInTable
    }
    this.action = {action: 'numberOfRowsInTable', temp: temp}
    this.onGetAll();
  }

  onCancel($event?){
    if(event) {
      this.show_datatable = !this.show_datatable;
      this.onGetActive();
    }
  }

  onUpdateFilter(event) {
    this.show_datatable = true;
    let temp = getUpdateFilter(event, this.rows, this.rows_original, this.selectedFilterField.field_name);
    this.rows = temp;
  }

  onFindById(event?) {
    this.getSingle_Record(event);
    this.action.action = 'selectedRecord';
    this.show_datatable = true;
  }

  // DETECT EVENTS ON DATATABLE
  onActivate(event) {}

  onSelect(event) {
    this.show_selected_button = true;
    this.selection = event.selected[0];
  }

  // ERROR
  onError(error?) {
    this.alertService.error(error.status);
    this.alertMessage.alertTitle = 'Error del servidor';
    this.alertMessage.alertText = error.statusText;
    this.alertMessage.alertShow = true;
    this.alertMessage.alertClass = 'alert alert-danger alert-dismissible fade show';
}


  onExportToExcel(data, name) {
    this.show_datatable = true;
    const filterData = data.map(x => {
      return {
        id: x.inv_sms_id,
        estatus: x.inv_sms_status,
        chk: x.inv_sms_chk,
        nombre: x.inv_sms_name,
        fecha: x.inv_sms_date,
        hora: x.inv_sms_time,
        mensaje: x.inv_sms_msg,
        
        
      };
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }

  test(event) {
    this.rows = event.temp;
    this.show_datatable = true;
  }

}
