import { Component, OnInit, Input } from "@angular/core";
import { UserSelectionModel } from "shared/models";
import { ExcelService } from "shared/services";

@Component({
  selector: "app-reports-report-excel",
  templateUrl: "./report-excel.component.html",
  styleUrls: ["./report-excel.component.scss"]
})
export class ReportExcelComponent implements OnInit {
  @Input() model;
  @Input() rows;
  @Input() userSelection;

  constructor(private excelService: ExcelService) {}

  ngOnInit() {}

  // Export data to Excel
  exportToExcel(data, model, name) {

    const filterData = data.map(x => {
      return model
    });

    this.excelService.exportAsExcelFile(filterData, name);
  }
}


/*

PropertyInfo pinfo = typeof(YourType).GetProperty("YourProperty");
object value = pinfo.GetValue(YourInstantiatedObject, null);

{field_name: "audit_id", name: "id", text: "Id"}

let abc = model.map(x => {
      return `&${x.name}&: &x.${x.field_name}&`;
    });

    let xyz = (`${abc}`);
    let exportObject = xyz.replace(/\":/g, ':').replace(/,/g, ', ').replace(/&/g, '')

    let x = data

    let mmm = {exportObject}


    console.error("exportObject", exportObject, mmm);

    */