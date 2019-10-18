import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOutboundAgentsPieComponent } from './dashboard-outbound-agents-pie.component';

describe('DashboardOutboundAgentsPieComponent', () => {
  let component: DashboardOutboundAgentsPieComponent;
  let fixture: ComponentFixture<DashboardOutboundAgentsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardOutboundAgentsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOutboundAgentsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
