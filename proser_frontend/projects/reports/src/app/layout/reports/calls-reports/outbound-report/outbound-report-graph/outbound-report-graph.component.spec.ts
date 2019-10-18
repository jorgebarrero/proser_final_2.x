import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundReportGraphComponent } from './outbound-report-graph.component';

describe('OutboundReportGraphComponent', () => {
  let component: OutboundReportGraphComponent;
  let fixture: ComponentFixture<OutboundReportGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundReportGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundReportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
