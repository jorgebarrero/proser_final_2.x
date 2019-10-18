import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundModalAgentsHistoricComponent } from './dashboard-outbound-modal-agents-historic.component';

describe('DashboardOutboundModalAgentsHistoricComponent', () => {
  let component: DashboardOutboundModalAgentsHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundModalAgentsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundModalAgentsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundModalAgentsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
