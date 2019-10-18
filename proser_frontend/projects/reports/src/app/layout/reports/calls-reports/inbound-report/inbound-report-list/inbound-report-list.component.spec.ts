import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundReportListComponent } from './inbound-report-list.component';

describe('InboundReportListComponent', () => {
  let component: InboundReportListComponent;
  let fixture: ComponentFixture<InboundReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
