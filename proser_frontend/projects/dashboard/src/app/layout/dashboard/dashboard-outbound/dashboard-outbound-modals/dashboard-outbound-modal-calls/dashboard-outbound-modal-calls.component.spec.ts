import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundModalCallsComponent } from './dashboard-outbound-modal-calls.component';

describe('DashboardOutboundModalCallsComponent', () => {
  let component: DashboardOutboundModalCallsComponent;
  let fixture: ComponentFixture<DashboardOutboundModalCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundModalCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundModalCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
