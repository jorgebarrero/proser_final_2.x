import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundIntervalReportGraphComponent } from './inbound-interval-report-graph.component';

describe('InboundIntervalReportGraphComponent', () => {
  let component: InboundIntervalReportGraphComponent;
  let fixture: ComponentFixture<InboundIntervalReportGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundIntervalReportGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundIntervalReportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
