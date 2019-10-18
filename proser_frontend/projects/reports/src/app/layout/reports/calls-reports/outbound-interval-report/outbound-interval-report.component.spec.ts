import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundIntervalReportComponent } from './outbound-interval-report.component';

describe('OutboundIntervalReportComponent', () => {
  let component: OutboundIntervalReportComponent;
  let fixture: ComponentFixture<OutboundIntervalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundIntervalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundIntervalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
