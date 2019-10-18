import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundModalAgentsComponent } from './dashboard-outbound-modal-agents.component';

describe('DashboardOutboundModalAgentsComponent', () => {
  let component: DashboardOutboundModalAgentsComponent;
  let fixture: ComponentFixture<DashboardOutboundModalAgentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundModalAgentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundModalAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
