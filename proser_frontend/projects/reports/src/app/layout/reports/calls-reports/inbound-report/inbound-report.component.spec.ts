import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboundReportComponent } from './inbound-report.component';

describe('InboundReportComponent', () => {
  let component: InboundReportComponent;
  let fixture: ComponentFixture<InboundReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboundReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
