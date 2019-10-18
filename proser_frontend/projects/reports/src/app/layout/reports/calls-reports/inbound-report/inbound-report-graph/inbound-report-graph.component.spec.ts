import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundReportGraphComponent } from './inbound-report-graph.component';

describe('InboundReportGraphComponent', () => {
  let component: InboundReportGraphComponent;
  let fixture: ComponentFixture<InboundReportGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundReportGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundReportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
