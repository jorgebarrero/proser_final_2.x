import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundAgentsHistoricComponent } from './dashboard-inbound-agents-historic.component';

describe('DashboardInboundAgentsHistoricComponent', () => {
  let component: DashboardInboundAgentsHistoricComponent;
  let fixture: ComponentFixture<DashboardInboundAgentsHistoricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundAgentsHistoricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundAgentsHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
