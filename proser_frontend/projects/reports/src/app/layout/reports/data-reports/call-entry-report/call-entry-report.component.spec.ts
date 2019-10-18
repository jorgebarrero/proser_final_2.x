import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallEntryReportComponent } from './call-entry-report.component';

describe('CallEntryReportComponent', () => {
  let component: CallEntryReportComponent;
  let fixture: ComponentFixture<CallEntryReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallEntryReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallEntryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
