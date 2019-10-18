import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarReportListComponent } from './auxiliar-report-list.component';

describe('AuxiliarReportListComponent', () => {
  let component: AuxiliarReportListComponent;
  let fixture: ComponentFixture<AuxiliarReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
