import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundModalAgentsHistoricComponent } from './dashboard-inbound-modal-agents-historic.component';

describe('DashboardInboundModalAgentsHistoricComponent', () => {
  let component: DashboardInboundModalAgentsHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundModalAgentsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundModalAgentsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundModalAgentsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
