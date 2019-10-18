import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

//import { CrudModule } from 'src/app/layout/crud/crud.module';
import { AlertModule } from "shared/modules/alert/alert.module";

import { CrudInvShiftChangeRoutingModule } from './crud-inv-shift-change-routing.module';
import { CrudInvShiftChangeComponent } from './crud-inv-shift-change.component';
import { CrudInvShiftChangeListComponent } from './crud-inv-shift-change-list/crud-inv-shift-change-list.component';
import { CrudInvShiftChangeDetailComponent } from './crud-inv-shift-change-detail/crud-inv-shift-change-detail.component';


@NgModule({
  declarations: [CrudInvShiftChangeComponent, CrudInvShiftChangeListComponent, CrudInvShiftChangeDetailComponent],
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    
    CrudInvShiftChangeRoutingModule
  ]
})
export class CrudInvShiftChangeModule { }
