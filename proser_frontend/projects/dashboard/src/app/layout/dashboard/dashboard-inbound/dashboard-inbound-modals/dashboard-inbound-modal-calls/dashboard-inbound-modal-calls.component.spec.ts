import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundModalCallsComponent } from './dashboard-inbound-modal-calls.component';

describe('DashboardInboundModalCallsComponent', () => {
  let component: DashboardInboundModalCallsComponent;
  let fixture: ComponentFixture<DashboardInboundModalCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundModalCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundModalCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
