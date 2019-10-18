import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitTimeReportGraphComponent } from './wait-time-report-graph.component';

describe('WaitTimeReportGraphComponent', () => {
  let component: WaitTimeReportGraphComponent;
  let fixture: ComponentFixture<WaitTimeReportGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitTimeReportGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitTimeReportGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
