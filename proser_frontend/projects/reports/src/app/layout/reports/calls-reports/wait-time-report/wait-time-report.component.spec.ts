import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitTimeReportComponent } from './wait-time-report.component';

describe('WaitTimeReportComponent', () => {
  let component: WaitTimeReportComponent;
  let fixture: ComponentFixture<WaitTimeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitTimeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitTimeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
