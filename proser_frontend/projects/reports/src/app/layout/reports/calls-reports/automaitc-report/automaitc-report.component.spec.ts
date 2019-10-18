import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaitcReportComponent } from './automaitc-report.component';

describe('AutomaitcReportComponent', () => {
  let component: AutomaitcReportComponent;
  let fixture: ComponentFixture<AutomaitcReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaitcReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaitcReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
