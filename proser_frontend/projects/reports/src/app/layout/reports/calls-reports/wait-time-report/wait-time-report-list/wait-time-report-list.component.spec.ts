import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitTimeReportListComponent } from './wait-time-report-list.component';

describe('WaitTimeReportListComponent', () => {
  let component: WaitTimeReportListComponent;
  let fixture: ComponentFixture<WaitTimeReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitTimeReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitTimeReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
