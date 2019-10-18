import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundIntervalReportGraphComponent } from './outbound-interval-report-graph.component';

describe('OutboundIntervalReportGraphComponent', () => {
  let component: OutboundIntervalReportGraphComponent;
  let fixture: ComponentFixture<OutboundIntervalReportGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundIntervalReportGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundIntervalReportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
