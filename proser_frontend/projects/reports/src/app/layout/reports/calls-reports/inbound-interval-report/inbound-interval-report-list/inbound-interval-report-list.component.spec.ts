import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundIntervalReportListComponent } from './inbound-interval-report-list.component';

describe('InboundIntervalReportListComponent', () => {
  let component: InboundIntervalReportListComponent;
  let fixture: ComponentFixture<InboundIntervalReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundIntervalReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundIntervalReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
