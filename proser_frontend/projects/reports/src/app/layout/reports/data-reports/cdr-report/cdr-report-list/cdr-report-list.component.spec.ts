import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrReportListComponent } from './cdr-report-list.component';

describe('CdrReportListComponent', () => {
  let component: CdrReportListComponent;
  let fixture: ComponentFixture<CdrReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
