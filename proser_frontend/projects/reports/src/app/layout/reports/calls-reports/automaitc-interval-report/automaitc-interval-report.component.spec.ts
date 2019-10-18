import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaitcIntervalReportComponent } from './automaitc-interval-report.component';

describe('AutomaitcIntervalReportComponent', () => {
  let component: AutomaitcIntervalReportComponent;
  let fixture: ComponentFixture<AutomaitcIntervalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaitcIntervalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaitcIntervalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
