import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundIntervalReportComponent } from './inbound-interval-report.component';

describe('InboundIntervalReportComponent', () => {
  let component: InboundIntervalReportComponent;
  let fixture: ComponentFixture<InboundIntervalReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundIntervalReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundIntervalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
