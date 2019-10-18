import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundAgentsDistributionComponent } from './dashboard-outbound-agents-distribution.component';

describe('DashboardOutboundAgentsDistributionComponent', () => {
  let component: DashboardOutboundAgentsDistributionComponent;
  let fixture: ComponentFixture<DashboardOutboundAgentsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundAgentsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundAgentsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
