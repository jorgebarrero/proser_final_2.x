import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundAgentsHistoricComponent } from './dashboard-outbound-agents-historic.component';

describe('DashboardOutboundAgentsHistoricComponent', () => {
  let component: DashboardOutboundAgentsHistoricComponent;
  let fixture: ComponentFixture<DashboardOutboundAgentsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundAgentsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundAgentsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
