import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaitcReportListComponent } from './automaitc-report-list.component';

describe('AutomaitcReportListComponent', () => {
  let component: AutomaitcReportListComponent;
  let fixture: ComponentFixture<AutomaitcReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomaitcReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaitcReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
