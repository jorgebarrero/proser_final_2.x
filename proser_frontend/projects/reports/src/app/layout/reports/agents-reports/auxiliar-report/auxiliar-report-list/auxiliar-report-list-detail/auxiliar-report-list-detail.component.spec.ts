import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarReportListDetailComponent } from './auxiliar-report-list-detail.component';

describe('AuxiliarReportListDetailComponent', () => {
  let component: AuxiliarReportListDetailComponent;
  let fixture: ComponentFixture<AuxiliarReportListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarReportListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarReportListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
