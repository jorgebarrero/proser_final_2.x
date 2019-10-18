import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundModalAgentsComponent } from './dashboard-inbound-modal-agents.component';

describe('DashboardInboundModalAgentsComponent', () => {
  let component: DashboardInboundModalAgentsComponent;
  let fixture: ComponentFixture<DashboardInboundModalAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundModalAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundModalAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
