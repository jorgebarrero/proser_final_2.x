import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundIntervalReportListComponent } from './outbound-interval-report-list.component';

describe('OutboundIntervalReportListComponent', () => {
  let component: OutboundIntervalReportListComponent;
  let fixture: ComponentFixture<OutboundIntervalReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundIntervalReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundIntervalReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
