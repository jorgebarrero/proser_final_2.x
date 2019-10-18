import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdrReportComponent } from './cdr-report.component';

describe('CdrReportComponent', () => {
  let component: CdrReportComponent;
  let fixture: ComponentFixture<CdrReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdrReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
