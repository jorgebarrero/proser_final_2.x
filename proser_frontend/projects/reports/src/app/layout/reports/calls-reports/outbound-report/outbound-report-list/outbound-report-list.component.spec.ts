import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundReportListComponent } from './outbound-report-list.component';

describe('OutboundReportListComponent', () => {
  let component: OutboundReportListComponent;
  let fixture: ComponentFixture<OutboundReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
