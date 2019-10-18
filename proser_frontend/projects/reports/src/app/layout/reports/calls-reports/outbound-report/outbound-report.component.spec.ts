import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutboundReportComponent } from './outbound-report.component';

describe('OutboundReportComponent', () => {
  let component: OutboundReportComponent;
  let fixture: ComponentFixture<OutboundReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutboundReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutboundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
