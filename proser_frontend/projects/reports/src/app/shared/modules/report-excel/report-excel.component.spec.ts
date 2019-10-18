import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportExcelComponent } from './report-excel.component';

describe('ReportExcelComponent', () => {
  let component: ReportExcelComponent;
  let fixture: ComponentFixture<ReportExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
