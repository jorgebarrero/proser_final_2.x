import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundAgentsDistributionComponent } from './dashboard-inbound-agents-distribution.component';

describe('DashboardInboundAgentsDistributionComponent', () => {
  let component: DashboardInboundAgentsDistributionComponent;
  let fixture: ComponentFixture<DashboardInboundAgentsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundAgentsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundAgentsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
