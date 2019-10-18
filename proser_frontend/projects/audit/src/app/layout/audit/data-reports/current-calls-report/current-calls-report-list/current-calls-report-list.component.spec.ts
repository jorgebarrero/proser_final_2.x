import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCallsReportListComponent } from './current-calls-report-list.component';

describe('CurrentCallsReportListComponent', () => {
  let component: CurrentCallsReportListComponent;
  let fixture: ComponentFixture<CurrentCallsReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCallsReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCallsReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
