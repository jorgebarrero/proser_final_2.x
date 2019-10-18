import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarReportComponent } from './auxiliar-report.component';

describe('AuxiliarReportComponent', () => {
  let component: AuxiliarReportComponent;
  let fixture: ComponentFixture<AuxiliarReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuxiliarReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuxiliarReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
