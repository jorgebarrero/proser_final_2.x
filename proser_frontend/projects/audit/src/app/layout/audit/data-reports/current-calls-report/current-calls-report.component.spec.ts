import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCallsReportComponent } from './current-calls-report.component';

describe('CurrentCallsReportComponent', () => {
  let component: CurrentCallsReportComponent;
  let fixture: ComponentFixture<CurrentCallsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCallsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCallsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
