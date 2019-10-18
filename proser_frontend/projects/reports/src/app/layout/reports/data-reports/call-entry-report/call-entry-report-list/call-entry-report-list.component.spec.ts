import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallEntryReportListComponent } from './call-entry-report-list.component';

describe('CallEntryReportListComponent', () => {
  let component: CallEntryReportListComponent;
  let fixture: ComponentFixture<CallEntryReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntryReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallEntryReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
