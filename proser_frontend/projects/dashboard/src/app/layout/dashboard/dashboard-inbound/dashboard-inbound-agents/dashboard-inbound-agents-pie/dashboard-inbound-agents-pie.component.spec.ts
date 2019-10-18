import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInboundAgentsPieComponent } from './dashboard-inbound-agents-pie.component';

describe('DashboardInboundAgentsPieComponent', () => {
  let component: DashboardInboundAgentsPieComponent;
  let fixture: ComponentFixture<DashboardInboundAgentsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInboundAgentsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInboundAgentsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
