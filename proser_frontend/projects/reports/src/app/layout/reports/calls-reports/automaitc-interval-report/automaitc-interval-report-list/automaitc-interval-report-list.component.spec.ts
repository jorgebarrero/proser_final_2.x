import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaitcIntervalReportListComponent } from './automaitc-interval-report-list.component';

describe('AutomaitcIntervalReportListComponent', () => {
  let component: AutomaitcIntervalReportListComponent;
  let fixture: ComponentFixture<AutomaitcIntervalReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaitcIntervalReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaitcIntervalReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
